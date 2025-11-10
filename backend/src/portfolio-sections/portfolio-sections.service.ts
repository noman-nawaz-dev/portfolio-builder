import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddPortfolioSectionInput, UpdatePortfolioSectionInput } from './portfolio-section.dto';

@Injectable()
export class PortfolioSectionsService {
  constructor(private prisma: PrismaService) {}

  async findByPortfolioId(portfolioId: string) {
    return this.prisma.portfolioSection.findMany({
      where: { portfolioId },
      include: { sectionType: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.portfolioSection.findUnique({
      where: { id },
      include: { sectionType: true },
    });
  }

  async add(userId: string, input: AddPortfolioSectionInput) {
    // Verify portfolio ownership
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: input.portfolioId },
      include: { sections: true },
    });

    if (!portfolio || portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this portfolio');
    }

    // Calculate order if not provided
    const order = input.order ?? portfolio.sections.length;

    return this.prisma.portfolioSection.create({
      data: {
        portfolioId: input.portfolioId,
        sectionTypeId: input.sectionTypeId,
        content: input.content as Prisma.InputJsonValue,
        layout: input.layout,
        styles: input.styles as Prisma.InputJsonValue,
        animations: input.animations as Prisma.InputJsonValue,
        order,
      },
      include: { sectionType: true },
    });
  }

  async update(userId: string, input: UpdatePortfolioSectionInput) {
    const section = await this.prisma.portfolioSection.findUnique({
      where: { id: input.id },
      include: { portfolio: true, sectionType: true },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    if (section.portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this section');
    }

    const updateData: Prisma.PortfolioSectionUpdateInput = {};
    if (input.content !== undefined) updateData.content = input.content as Prisma.InputJsonValue;
    if (input.layout !== undefined) updateData.layout = input.layout;
    if (input.styles !== undefined) updateData.styles = input.styles as Prisma.InputJsonValue;
    if (input.animations !== undefined) updateData.animations = input.animations as Prisma.InputJsonValue;
    if (input.isVisible !== undefined) updateData.isVisible = input.isVisible;

    return this.prisma.portfolioSection.update({
      where: { id: input.id },
      data: updateData,
      include: { sectionType: true },
    });
  }

  async delete(userId: string, id: string) {
    const section = await this.prisma.portfolioSection.findUnique({
      where: { id },
      include: { portfolio: true },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    if (section.portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this section');
    }

    await this.prisma.portfolioSection.delete({
      where: { id },
    });

    // Reorder remaining sections
    await this.reorderAfterDelete(section.portfolioId, section.order);

    return true;
  }

  async reorder(userId: string, portfolioId: string, sectionIds: string[]) {
    // Verify portfolio ownership
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });

    if (!portfolio || portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to modify this portfolio');
    }

    // Update order for each section
    const updates = sectionIds.map((id, index) =>
      this.prisma.portfolioSection.update({
        where: { id },
        data: { order: index },
      })
    );

    await this.prisma.$transaction(updates);

    return this.findByPortfolioId(portfolioId);
  }

  async duplicate(userId: string, id: string) {
    const section = await this.prisma.portfolioSection.findUnique({
      where: { id },
      include: { portfolio: true },
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    if (section.portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to duplicate this section');
    }

    // Get the count of sections to set the new order
    const sectionsCount = await this.prisma.portfolioSection.count({
      where: { portfolioId: section.portfolioId },
    });

    return this.prisma.portfolioSection.create({
      data: {
        portfolioId: section.portfolioId,
        sectionTypeId: section.sectionTypeId,
        content: section.content as Prisma.InputJsonValue,
        layout: section.layout,
        styles: section.styles as Prisma.InputJsonValue,
        animations: section.animations as Prisma.InputJsonValue,
        order: sectionsCount,
        isVisible: section.isVisible,
      },
      include: { sectionType: true },
    });
  }

  private async reorderAfterDelete(portfolioId: string, deletedOrder: number) {
    const sections = await this.prisma.portfolioSection.findMany({
      where: {
        portfolioId,
        order: { gt: deletedOrder },
      },
    });

    const updates = sections.map(section =>
      this.prisma.portfolioSection.update({
        where: { id: section.id },
        data: { order: section.order - 1 },
      })
    );

    await this.prisma.$transaction(updates);
  }
}

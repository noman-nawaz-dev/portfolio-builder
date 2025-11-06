import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfoliosService {
  private readonly MAX_PORTFOLIOS_PER_USER = 3;

  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prisma.portfolio.findMany({
      where: { userId },
      include: { 
        user: true, 
        template: true,
        theme: true,
        sections: {
          include: {
            sectionType: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(portfolioId: string) {
    return this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: { 
        user: true, 
        template: true,
        theme: true,
        sections: {
          include: {
            sectionType: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    const portfolios = await this.findAllByUserId(userId);
    return portfolios[0] || null; // Return the most recent portfolio for backward compatibility
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get the first published portfolio
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { 
        userId: user.id,
        isPublished: true,
      },
      include: { 
        template: true, 
        user: true,
        theme: true,
        sections: {
          include: {
            sectionType: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!portfolio) {
      throw new NotFoundException('No published portfolio found');
    }

    return portfolio;
  }

  async findPublicById(portfolioId: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { 
        id: portfolioId,
      },
      include: { 
        template: true, 
        user: true,
        theme: true,
        sections: {
          include: {
            sectionType: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    // Only return published portfolios for public access
    if (!portfolio.isPublished) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }

  async create(userId: string, templateId: string, name?: string) {
    // Check portfolio limit
    const existingPortfolios = await this.findAllByUserId(userId);
    
    if (existingPortfolios.length >= this.MAX_PORTFOLIOS_PER_USER) {
      throw new BadRequestException(
        `You have reached the maximum limit of ${this.MAX_PORTFOLIOS_PER_USER} portfolios. Please delete an existing portfolio to create a new one.`
      );
    }

    // Generate default name if not provided
    const portfolioName = name || `Portfolio ${existingPortfolios.length + 1}`;

    return this.prisma.portfolio.create({
      data: {
        userId,
        templateId,
        name: portfolioName,
      },
      include: { 
        user: true, 
        template: true,
        theme: true,
        sections: {
          include: {
            sectionType: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async togglePublish(portfolioId: string, userId: string) {
    const portfolio = await this.findById(portfolioId);
    
    if (!portfolio || portfolio.userId !== userId) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.update({
      where: { id: portfolioId },
      data: { isPublished: !portfolio.isPublished },
      include: { user: true, template: true, theme: true },
    });
  }

  async changeTemplate(portfolioId: string, userId: string, templateId: string) {
    const portfolio = await this.findById(portfolioId);
    
    if (!portfolio || portfolio.userId !== userId) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.update({
      where: { id: portfolioId },
      data: { templateId },
      include: { user: true, template: true, theme: true },
    });
  }

  async updateName(portfolioId: string, userId: string, name: string) {
    const portfolio = await this.findById(portfolioId);
    
    if (!portfolio || portfolio.userId !== userId) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.update({
      where: { id: portfolioId },
      data: { name },
      include: { user: true, template: true, theme: true },
    });
  }

  async delete(portfolioId: string, userId: string) {
    const portfolio = await this.findById(portfolioId);
    
    if (!portfolio || portfolio.userId !== userId) {
      throw new NotFoundException('Portfolio not found');
    }

    await this.prisma.portfolio.delete({
      where: { id: portfolioId },
    });

    return true;
  }

  async update(portfolioId: string, userId: string, data: { name?: string; themeId?: string; customDomain?: string; resumeUrl?: string }) {
    const portfolio = await this.findById(portfolioId);
    
    if (!portfolio || portfolio.userId !== userId) {
      throw new NotFoundException('Portfolio not found');
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.themeId !== undefined) updateData.themeId = data.themeId;
    if (data.customDomain !== undefined) updateData.customDomain = data.customDomain;
    if (data.resumeUrl !== undefined) updateData.resumeUrl = data.resumeUrl;

    return this.prisma.portfolio.update({
      where: { id: portfolioId },
      data: updateData,
      include: { 
        user: true, 
        template: true,
        theme: true,
      },
    });
  }

  async setPublish(portfolioId: string, userId: string, publish: boolean) {
    const portfolio = await this.findById(portfolioId);
    
    if (!portfolio || portfolio.userId !== userId) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.update({
      where: { id: portfolioId },
      data: { isPublished: publish },
      include: { user: true, template: true, theme: true },
    });
  }
}

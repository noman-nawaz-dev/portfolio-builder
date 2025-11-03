import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectionTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    return this.prisma.sectionType.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
      },
      orderBy: [
        { category: 'asc' },
        { displayName: 'asc' },
      ],
    });
  }

  async findById(id: string) {
    return this.prisma.sectionType.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return this.prisma.sectionType.findUnique({
      where: { name },
    });
  }

  async findByCategory(category: string) {
    return this.prisma.sectionType.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: { displayName: 'asc' },
    });
  }

  async getCategories() {
    const sectionTypes = await this.prisma.sectionType.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return sectionTypes.map(st => st.category);
  }
}

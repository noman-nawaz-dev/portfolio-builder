import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ThemesService {
  constructor(private prisma: PrismaService) {}

  async findAll(includePrivate = false, userId?: string) {
    return this.prisma.theme.findMany({
      where: {
        OR: [
          { isPublic: true },
          ...(includePrivate && userId ? [{ userId }] : []),
        ],
      },
      orderBy: [
        { isDefault: 'desc' },
        { usageCount: 'desc' },
        { name: 'asc' },
      ],
    });
  }

  async findById(id: string) {
    return this.prisma.theme.findUnique({
      where: { id },
    });
  }

  async findDefaultTheme() {
    return this.prisma.theme.findFirst({
      where: { isDefault: true },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.theme.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async incrementUsage(id: string) {
    return this.prisma.theme.update({
      where: { id },
      data: {
        usageCount: {
          increment: 1,
        },
      },
    });
  }
}

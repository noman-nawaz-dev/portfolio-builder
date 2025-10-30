import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { 
        portfolios: { 
          include: { template: true },
          orderBy: { createdAt: 'desc' }
        } 
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: { 
        portfolios: { 
          include: { template: true },
          orderBy: { createdAt: 'desc' }
        } 
      },
    });
  }

  async create(data: { email: string; password: string; username: string; name: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async updateProfile(userId: string, data: { name?: string; username?: string }) {
    // Check if username is being changed and if it's already taken
    if (data.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: data.username },
      });
      
      if (existingUser && existingUser.id !== userId) {
        throw new Error('Username is already taken');
      }
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.username && { username: data.username }),
      },
      include: { 
        portfolios: { 
          include: { template: true },
          orderBy: { createdAt: 'desc' }
        } 
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: {
        datasets: true,
        _count: {
          select: { queries: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        datasets: true,
        queries: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async create(userId: string, data: any) {
    // To be implemented
    return null;
  }

  async update(id: string, data: any) {
    // To be implemented
    return null;
  }

  async delete(id: string) {
    // To be implemented
    return null;
  }
}

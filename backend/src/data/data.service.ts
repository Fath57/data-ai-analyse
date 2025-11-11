import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class DataService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadFile(projectId: string, file: Express.Multer.File) {
    // To be implemented
    // 1. Validate file type and size
    // 2. Store file (S3 or local)
    // 3. Parse CSV/Excel
    // 4. Extract schema
    // 5. Create dataset record
    return null;
  }

  async findAll(projectId: string) {
    return this.prisma.dataset.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.dataset.findUnique({
      where: { id },
    });
  }

  async preview(id: string, limit = 100) {
    // To be implemented
    // Read file and return first N rows
    return null;
  }

  async delete(id: string) {
    // To be implemented
    return null;
  }

  async exportDataset(id: string, format: 'csv' | 'xlsx') {
    // To be implemented
    return null;
  }
}

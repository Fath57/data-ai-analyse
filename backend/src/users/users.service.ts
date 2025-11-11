import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(userData: any) {
    // To be implemented
    return null;
  }

  async update(id: string, userData: any) {
    // To be implemented
    return null;
  }

  async delete(id: string) {
    // To be implemented
    return null;
  }
}

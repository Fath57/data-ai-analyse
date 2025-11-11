import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Database disconnected');
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    // Delete in order to respect foreign key constraints
    await this.$transaction([
      this.query.deleteMany(),
      this.dataset.deleteMany(),
      this.project.deleteMany(),
      this.refreshToken.deleteMany(),
      this.user.deleteMany(),
      this.template.deleteMany(),
    ]);
  }
}

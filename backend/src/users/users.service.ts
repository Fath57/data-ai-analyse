import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map(({ password, ...user }) => user);
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            projects: true,
            queries: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, ...userData } = createUserDto;

    // Check if user exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...userData,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    // Check if user exists
    await this.findById(id);

    // If email is being updated, check for conflicts
    if (updateUserDto.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    // If password is being updated, hash it
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async delete(id: string): Promise<void> {
    // Check if user exists
    await this.findById(id);

    // Delete user (cascades will handle related records)
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateRole(id: string, role: UserRole): Promise<Omit<User, 'password'>> {
    // Check if user exists
    await this.findById(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deactivateUser(id: string): Promise<Omit<User, 'password'>> {
    // Check if user exists
    await this.findById(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async activateUser(id: string): Promise<Omit<User, 'password'>> {
    // Check if user exists
    await this.findById(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserStats(id: string): Promise<any> {
    const user = await this.findById(id);

    const stats = await this.prisma.user.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            projects: true,
            queries: true,
          },
        },
        projects: {
          select: {
            _count: {
              select: {
                datasets: true,
              },
            },
          },
        },
      },
    });

    const totalDatasets = stats?.projects.reduce(
      (acc, project) => acc + project._count.datasets,
      0,
    );

    return {
      ...user,
      stats: {
        totalProjects: stats?._count.projects || 0,
        totalQueries: stats?._count.queries || 0,
        totalDatasets: totalDatasets || 0,
      },
    };
  }
}

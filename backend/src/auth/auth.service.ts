import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // To be implemented
    return null;
  }

  async login(user: any) {
    // To be implemented
    return { accessToken: 'token' };
  }

  async register(userData: any) {
    // To be implemented
    return { user: {} };
  }

  async validateGoogleUser(profile: any) {
    // To be implemented
    return null;
  }
}

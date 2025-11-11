import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.APP_VERSION || '0.1.0',
    };
  }

  getWelcome() {
    return {
      message: 'Welcome to IA Data Insight API',
      description: 'NGO Data Analysis Platform powered by AI',
      version: '0.1.0',
      documentation: '/api',
    };
  }
}

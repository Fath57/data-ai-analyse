import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { OpenAiService } from './services/openai.service';
import { QueryGeneratorService } from './services/query-generator.service';

@Injectable()
export class AiAgentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openaiService: OpenAiService,
    private readonly queryGenerator: QueryGeneratorService,
  ) {}

  async processQuery(userId: string, projectId: string, datasetId: string, question: string) {
    // To be implemented
    // 1. Get dataset schema
    // 2. Send to OpenAI with schema context
    // 3. Generate SQL/Pandas query
    // 4. Execute query
    // 5. Determine best visualization
    // 6. Save query record
    // 7. Return results + chart config
    return null;
  }

  async getTemplates() {
    return this.prisma.template.findMany({
      orderBy: { usageCount: 'desc' },
    });
  }

  async executeTemplate(templateId: string, datasetId: string, params: any) {
    // To be implemented
    return null;
  }

  async getHistory(projectId: string) {
    return this.prisma.query.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      include: {
        dataset: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

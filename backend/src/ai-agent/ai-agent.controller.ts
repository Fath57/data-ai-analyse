import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AiAgentService } from './ai-agent.service';

@ApiTags('queries')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(AuthGuard('jwt'))
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Post('query')
  @ApiOperation({ summary: 'Ask a question to AI about your data' })
  async query(@Body() queryDto: any, @Req() req: any) {
    return { message: 'AI query - To be implemented' };
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get pre-configured query templates for NGOs' })
  async getTemplates() {
    return {
      message: 'NGO templates - To be implemented',
      templates: [
        'Donor Analysis by Source',
        'Monthly Budget Tracking',
        'Impact Metrics Overview',
        'Geographic Distribution Map',
        'Year-over-Year Comparison',
      ],
    };
  }

  @Post('template/:templateId')
  @ApiOperation({ summary: 'Execute a template query' })
  async executeTemplate(@Param('templateId') templateId: string, @Body() params: any) {
    return { message: 'Execute template - To be implemented' };
  }

  @Get('queries/:projectId')
  @ApiOperation({ summary: 'Get query history for a project' })
  async getHistory(@Param('projectId') projectId: string) {
    return { message: 'Query history - To be implemented' };
  }

  @Post('export/:queryId')
  @ApiOperation({ summary: 'Export query results to PDF/Excel' })
  async exportResults(@Param('queryId') queryId: string, @Body() exportDto: any) {
    return { message: 'Export results - To be implemented' };
  }
}

import { Module } from '@nestjs/common';
import { AiAgentController } from './ai-agent.controller';
import { AiAgentService } from './ai-agent.service';
import { OpenAiService } from './services/openai.service';
import { QueryGeneratorService } from './services/query-generator.service';

@Module({
  controllers: [AiAgentController],
  providers: [AiAgentService, OpenAiService, QueryGeneratorService],
  exports: [AiAgentService],
})
export class AiAgentModule {}

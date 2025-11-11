import { Module } from '@nestjs/common';
import { AiAgentController } from './ai-agent.controller';
import { AiAgentService } from './ai-agent.service';
import { OpenAiService } from './services/openai.service';
import { GeminiService } from './services/gemini.service';
import { AiProviderService } from './services/ai-provider.service';
import { QueryGeneratorService } from './services/query-generator.service';

@Module({
  controllers: [AiAgentController],
  providers: [
    AiAgentService,
    OpenAiService,
    GeminiService,
    AiProviderService,
    QueryGeneratorService,
  ],
  exports: [AiAgentService, AiProviderService],
})
export class AiAgentModule {}

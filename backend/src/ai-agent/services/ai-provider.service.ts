import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiService } from './openai.service';
import { GeminiService } from './gemini.service';

export enum AIProvider {
  OPENAI = 'openai',
  GEMINI = 'gemini',
}

export interface IAIService {
  generateQueryFromNaturalLanguage(
    question: string,
    datasetSchema: any,
  ): Promise<any>;
  determineVisualization(question: string, results: any): Promise<any>;
  generateInsights(data: any): Promise<string>;
}

@Injectable()
export class AiProviderService {
  private defaultProvider: AIProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly openaiService: OpenAiService,
    private readonly geminiService: GeminiService,
  ) {
    // Determine default provider from environment
    const provider =
      this.configService.get<string>('AI_PROVIDER')?.toLowerCase() || 'openai';
    this.defaultProvider =
      provider === 'gemini' ? AIProvider.GEMINI : AIProvider.OPENAI;
  }

  /**
   * Get the AI service based on provider preference
   */
  getService(provider?: AIProvider): IAIService {
    const selectedProvider = provider || this.defaultProvider;

    switch (selectedProvider) {
      case AIProvider.GEMINI:
        return this.geminiService;
      case AIProvider.OPENAI:
      default:
        return this.openaiService;
    }
  }

  /**
   * Fallback mechanism: try primary provider, fallback to secondary if it fails
   */
  async generateQueryWithFallback(
    question: string,
    datasetSchema: any,
    primaryProvider?: AIProvider,
  ): Promise<any> {
    const primary = primaryProvider || this.defaultProvider;
    const fallback =
      primary === AIProvider.OPENAI ? AIProvider.GEMINI : AIProvider.OPENAI;

    try {
      const service = this.getService(primary);
      return await service.generateQueryFromNaturalLanguage(
        question,
        datasetSchema,
      );
    } catch (error) {
      console.log(`${primary} failed, falling back to ${fallback}...`);
      try {
        const fallbackService = this.getService(fallback);
        return await fallbackService.generateQueryFromNaturalLanguage(
          question,
          datasetSchema,
        );
      } catch (fallbackError) {
        throw new Error(
          `Both AI providers failed: ${error.message}, ${fallbackError.message}`,
        );
      }
    }
  }

  async determineVisualizationWithFallback(
    question: string,
    results: any,
    primaryProvider?: AIProvider,
  ): Promise<any> {
    const primary = primaryProvider || this.defaultProvider;
    const fallback =
      primary === AIProvider.OPENAI ? AIProvider.GEMINI : AIProvider.OPENAI;

    try {
      const service = this.getService(primary);
      return await service.determineVisualization(question, results);
    } catch (error) {
      console.log(`${primary} failed, falling back to ${fallback}...`);
      try {
        const fallbackService = this.getService(fallback);
        return await fallbackService.determineVisualization(question, results);
      } catch (fallbackError) {
        // Return default if both fail
        return {
          chartType: 'table',
          title: 'Data Analysis',
          reasoning: 'Default visualization (AI providers unavailable)',
        };
      }
    }
  }

  async generateInsightsWithFallback(
    data: any,
    primaryProvider?: AIProvider,
  ): Promise<string> {
    const primary = primaryProvider || this.defaultProvider;
    const fallback =
      primary === AIProvider.OPENAI ? AIProvider.GEMINI : AIProvider.OPENAI;

    try {
      const service = this.getService(primary);
      return await service.generateInsights(data);
    } catch (error) {
      console.log(`${primary} failed, falling back to ${fallback}...`);
      try {
        const fallbackService = this.getService(fallback);
        return await fallbackService.generateInsights(data);
      } catch (fallbackError) {
        return 'Unable to generate insights at this time.';
      }
    }
  }

  getDefaultProvider(): AIProvider {
    return this.defaultProvider;
  }

  getAvailableProviders(): AIProvider[] {
    return [AIProvider.OPENAI, AIProvider.GEMINI];
  }
}

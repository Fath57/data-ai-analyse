import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // Using Gemini Pro model
      this.model = this.genAI.getGenerativeModel({
        model: this.configService.get<string>('GEMINI_MODEL') || 'gemini-pro',
      });
    }
  }

  async generateQueryFromNaturalLanguage(
    question: string,
    datasetSchema: any,
  ): Promise<any> {
    if (!this.model) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = this.buildQueryGenerationPrompt(question, datasetSchema);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the response to extract query and metadata
      return this.parseQueryResponse(text);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate query with Gemini');
    }
  }

  async determineVisualization(question: string, results: any): Promise<any> {
    if (!this.model) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = this.buildVisualizationPrompt(question, results);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseVisualizationResponse(text);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to determine visualization with Gemini');
    }
  }

  async generateInsights(data: any): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = this.buildInsightsPrompt(data);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate insights with Gemini');
    }
  }

  private buildQueryGenerationPrompt(
    question: string,
    datasetSchema: any,
  ): string {
    return `You are a data analysis expert for NGOs. Given a dataset schema and a natural language question, generate an appropriate data query.

Dataset Schema:
${JSON.stringify(datasetSchema, null, 2)}

User Question: ${question}

Please analyze the question and provide:
1. A SQL-like query or data transformation steps
2. The columns needed
3. Any aggregations or filters required
4. Suggested chart type (bar, line, pie, table, etc.)

Respond in JSON format:
{
  "query": "the query or transformation logic",
  "columns": ["col1", "col2"],
  "chartType": "bar",
  "reasoning": "brief explanation"
}`;
  }

  private buildVisualizationPrompt(question: string, results: any): string {
    const dataPreview =
      Array.isArray(results) && results.length > 0
        ? JSON.stringify(results.slice(0, 3), null, 2)
        : JSON.stringify(results, null, 2);

    return `Based on the following data analysis question and results, determine the best visualization type.

Question: ${question}

Data Preview:
${dataPreview}

Choose the most appropriate chart type from: bar, line, pie, doughnut, scatter, table, area, radar.

Respond in JSON format:
{
  "chartType": "bar",
  "xAxis": "column_name",
  "yAxis": ["value_column"],
  "title": "Chart Title",
  "reasoning": "brief explanation"
}`;
  }

  private buildInsightsPrompt(data: any): string {
    const dataPreview =
      Array.isArray(data) && data.length > 0
        ? JSON.stringify(data.slice(0, 5), null, 2)
        : JSON.stringify(data, null, 2);

    return `Analyze the following data and provide key insights for an NGO.

Data:
${dataPreview}

Provide:
1. Key trends or patterns
2. Notable findings
3. Recommendations (if applicable)

Keep it concise and actionable (3-5 sentences).`;
  }

  private parseQueryResponse(text: string): any {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback: return the raw text
      return {
        query: text,
        columns: [],
        chartType: 'table',
        reasoning: 'Parsed from text response',
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return {
        query: text,
        columns: [],
        chartType: 'table',
        reasoning: 'Could not parse response',
      };
    }
  }

  private parseVisualizationResponse(text: string): any {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return {
        chartType: 'table',
        title: 'Data Analysis',
        reasoning: 'Default visualization',
      };
    } catch (error) {
      console.error('Error parsing visualization response:', error);
      return {
        chartType: 'table',
        title: 'Data Analysis',
        reasoning: 'Could not parse response',
      };
    }
  }

  async isConfigured(): Promise<boolean> {
    return !!this.model;
  }
}

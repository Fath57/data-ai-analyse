# Guide des Providers IA (OpenAI & Gemini)

Ce guide explique comment utiliser et configurer les deux providers d'IA disponibles dans IA Data Insight.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Configuration](#configuration)
3. [Utilisation](#utilisation)
4. [Comparaison des providers](#comparaison-des-providers)
5. [Fallback automatique](#fallback-automatique)
6. [Exemples](#exemples)

---

## Vue d'ensemble

IA Data Insight supporte deux providers d'IA:

| Provider | Modèle | Avantages | Coût estimé |
|----------|--------|-----------|-------------|
| **OpenAI** | GPT-4 Turbo | Très précis, excellent pour SQL complexe | ~$0.01-0.03/requête |
| **Gemini** | Gemini Pro | Gratuit (quotas généreux), rapide | Gratuit (60 req/min) |

### Quand utiliser quel provider?

**OpenAI (GPT-4):**
- Requêtes SQL complexes
- Analyses avancées
- Haute précision requise
- Budget disponible

**Gemini:**
- MVP et développement
- Requêtes simples à moyennes
- Budget limité
- Testing intensif

---

## Configuration

### 1. Variables d'environnement

Dans votre fichier `.env`:

```bash
# Choisir le provider par défaut
AI_PROVIDER=openai  # ou 'gemini'

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=4000

# Gemini Configuration
GEMINI_API_KEY=your-gemini-key-here
GEMINI_MODEL=gemini-pro
```

### 2. Obtenir les clés API

**OpenAI:**
1. Aller sur [platform.openai.com](https://platform.openai.com/)
2. Créer un compte et ajouter des crédits
3. Générer une clé API

**Gemini:**
1. Aller sur [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Créer une clé API Google
3. Gratuit avec quotas généreux (60 req/min, 1500 req/jour)

---

## Utilisation

### Backend (NestJS)

#### Utilisation basique

```typescript
import { AiProviderService, AIProvider } from './services/ai-provider.service';

@Injectable()
export class YourService {
  constructor(private readonly aiProvider: AiProviderService) {}

  async analyzeData(question: string, schema: any) {
    // Utiliser le provider par défaut
    const service = this.aiProvider.getService();
    const result = await service.generateQueryFromNaturalLanguage(
      question,
      schema
    );

    return result;
  }
}
```

#### Spécifier un provider

```typescript
async analyzeData(question: string, schema: any, useGemini = false) {
  // Forcer l'utilisation d'un provider spécifique
  const provider = useGemini ? AIProvider.GEMINI : AIProvider.OPENAI;
  const service = this.aiProvider.getService(provider);

  const result = await service.generateQueryFromNaturalLanguage(
    question,
    schema
  );

  return result;
}
```

#### Utiliser le fallback automatique

```typescript
async analyzeDataWithFallback(question: string, schema: any) {
  try {
    // Tente avec OpenAI, fallback sur Gemini si échec
    const result = await this.aiProvider.generateQueryWithFallback(
      question,
      schema,
      AIProvider.OPENAI
    );

    return result;
  } catch (error) {
    console.error('Both AI providers failed:', error);
    throw new Error('AI analysis unavailable');
  }
}
```

### Frontend (Next.js)

#### Sélection du provider par l'utilisateur

```tsx
'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export function AIProviderSelector() {
  const [provider, setProvider] = useState<'openai' | 'gemini'>('gemini');

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">AI Provider:</label>
      <Select value={provider} onValueChange={setProvider}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai">
            OpenAI (GPT-4) <Badge variant="warning" className="ml-2">Paid</Badge>
          </SelectItem>
          <SelectItem value="gemini">
            Google Gemini <Badge variant="success" className="ml-2">Free</Badge>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

#### Appel API avec provider sélectionné

```typescript
// lib/api.ts
export const aiAPI = {
  query: (data: {
    question: string;
    datasetId: string;
    provider?: 'openai' | 'gemini';
  }) => api.post('/ai/query', data),
};

// Dans votre composant
const handleQuery = async () => {
  const result = await aiAPI.query({
    question: userQuestion,
    datasetId: currentDataset.id,
    provider: selectedProvider, // 'openai' ou 'gemini'
  });
};
```

---

## Comparaison des providers

### Capacités

| Fonctionnalité | OpenAI GPT-4 | Gemini Pro |
|----------------|--------------|------------|
| Génération de requêtes SQL | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Compréhension du langage naturel | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Génération d'insights | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Recommandation de visualisations | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Vitesse de réponse | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Coût | ⭐⭐ | ⭐⭐⭐⭐⭐ |

### Tarification (estimée)

**OpenAI GPT-4 Turbo:**
- Input: $0.01 / 1K tokens
- Output: $0.03 / 1K tokens
- Requête moyenne: ~$0.02-0.05

**Gemini Pro:**
- Gratuit jusqu'à:
  - 60 requêtes/minute
  - 1,500 requêtes/jour
- Au-delà: tarification à venir

### Latence moyenne

- **OpenAI**: 2-5 secondes
- **Gemini**: 1-3 secondes

---

## Fallback automatique

Le système implémente un mécanisme de fallback intelligent:

```typescript
// Backend: services/ai-provider.service.ts
async generateQueryWithFallback(
  question: string,
  datasetSchema: any,
  primaryProvider?: AIProvider,
): Promise<any> {
  const primary = primaryProvider || this.defaultProvider;
  const fallback = primary === AIProvider.OPENAI
    ? AIProvider.GEMINI
    : AIProvider.OPENAI;

  try {
    // Essayer avec le provider principal
    const service = this.getService(primary);
    return await service.generateQueryFromNaturalLanguage(question, datasetSchema);
  } catch (error) {
    console.log(`${primary} failed, falling back to ${fallback}...`);

    try {
      // Fallback sur le provider secondaire
      const fallbackService = this.getService(fallback);
      return await fallbackService.generateQueryFromNaturalLanguage(question, datasetSchema);
    } catch (fallbackError) {
      throw new Error(`Both AI providers failed`);
    }
  }
}
```

### Quand le fallback se déclenche

- Clé API invalide ou expirée
- Quota atteint
- Erreur réseau
- Timeout
- Erreur du modèle

---

## Exemples

### Exemple 1: Analyse de données de donateurs

```typescript
// Backend Controller
@Post('analyze')
async analyzeData(@Body() dto: AnalyzeDto) {
  const { question, datasetId, preferredProvider } = dto;

  // Récupérer le schéma du dataset
  const dataset = await this.dataService.findOne(datasetId);

  // Utiliser le fallback pour garantir une réponse
  const analysis = await this.aiProvider.generateQueryWithFallback(
    question,
    dataset.schema,
    preferredProvider
  );

  return analysis;
}
```

**Question**: "Qui sont mes 5 meilleurs donateurs cette année?"

**Réponse OpenAI**:
```json
{
  "query": "SELECT donor_name, SUM(amount) as total FROM donations WHERE YEAR(date) = 2024 GROUP BY donor_name ORDER BY total DESC LIMIT 5",
  "chartType": "bar",
  "reasoning": "Bar chart is best for comparing top donors"
}
```

**Réponse Gemini**:
```json
{
  "query": "SELECT donor_name, SUM(amount) as total FROM donations WHERE date >= '2024-01-01' GROUP BY donor_name ORDER BY total DESC LIMIT 5",
  "chartType": "bar",
  "reasoning": "Horizontal bar chart for donor comparison"
}
```

### Exemple 2: Comparaison de performance

```typescript
// Test de performance
async function compareProviders() {
  const question = "Montre-moi l'évolution des donations par mois";
  const schema = { /* schéma dataset */ };

  // OpenAI
  const startOpenAI = Date.now();
  const openAIResult = await openaiService.generateQueryFromNaturalLanguage(
    question,
    schema
  );
  const openAITime = Date.now() - startOpenAI;

  // Gemini
  const startGemini = Date.now();
  const geminiResult = await geminiService.generateQueryFromNaturalLanguage(
    question,
    schema
  );
  const geminiTime = Date.now() - startGemini;

  console.log({
    openAI: { time: openAITime, result: openAIResult },
    gemini: { time: geminiTime, result: geminiResult },
  });
}
```

### Exemple 3: Interface utilisateur avec choix du provider

```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { aiAPI } from '@/lib/api';

export function AIQueryPanel() {
  const [question, setQuestion] = useState('');
  const [provider, setProvider] = useState<'openai' | 'gemini'>('gemini');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const result = await aiAPI.query({
        question,
        datasetId: 'current-dataset-id',
        provider,
      });

      toast({
        title: 'Analyse terminée',
        description: `Réponse générée par ${provider === 'openai' ? 'OpenAI' : 'Gemini'}`,
        variant: 'success',
      });

      // Afficher les résultats...
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de générer l\'analyse',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Data Analysis</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">
                  Gemini <Badge variant="success" className="ml-1">Free</Badge>
                </SelectItem>
                <SelectItem value="openai">
                  GPT-4 <Badge variant="warning" className="ml-1">Paid</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Posez votre question en langage naturel..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Analyse en cours...' : 'Analyser'}
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Bonnes pratiques

### 1. **Optimisation des coûts**

```typescript
// Utiliser Gemini pour le développement
const isDevelopment = process.env.NODE_ENV === 'development';
const defaultProvider = isDevelopment ? AIProvider.GEMINI : AIProvider.OPENAI;
```

### 2. **Caching des résultats**

```typescript
// Mettre en cache les analyses similaires
const cacheKey = `ai_query_${hash(question + datasetId)}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const result = await aiProvider.generateQuery(question, schema);
await redis.setex(cacheKey, 3600, JSON.stringify(result));
```

### 3. **Monitoring des providers**

```typescript
// Logger l'utilisation pour analyser les coûts
logger.info('AI Query', {
  provider: selectedProvider,
  question,
  responseTime,
  cost: estimatedCost,
});
```

---

## FAQ

**Q: Puis-je utiliser les deux providers en même temps?**
R: Non, une seule requête utilise un seul provider, mais le système peut basculer automatiquement si l'un échoue.

**Q: Gemini est-il vraiment gratuit?**
R: Oui, avec des quotas généreux (60 req/min). Au-delà, des frais peuvent s'appliquer.

**Q: Quelle est la différence de qualité?**
R: GPT-4 est légèrement plus précis pour les requêtes très complexes, mais Gemini est excellent pour 90% des cas.

**Q: Comment changer le provider par défaut?**
R: Modifiez `AI_PROVIDER` dans votre fichier `.env`.

---

## Ressources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)

---

**Dernière mise à jour**: Novembre 2024

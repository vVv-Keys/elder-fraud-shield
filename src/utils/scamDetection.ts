import { ScamIndicator, SentimentAnalysis } from '../types';

export class ScamDetectionEngine {
  private scamPhrases = [
    // Urgency tactics
    'act immediately',
    'final notice',
    'limited time',
    'expires today',
    'urgent action required',
    
    // Authority impersonation
    'this is the irs',
    'social security administration',
    'microsoft support',
    'your bank',
    'government agency',
    
    // Personal information requests
    'social security number',
    'credit card number',
    'bank account',
    'password',
    'pin number',
    
    // Financial demands
    'wire money',
    'gift cards',
    'bitcoin',
    'western union',
    'money transfer',
    
    // Pressure tactics
    'don\'t hang up',
    'don\'t tell anyone',
    'keep this confidential',
    'arrest warrant',
    'legal action'
  ];

  private urgencyWords = [
    'immediately', 'urgent', 'emergency', 'now', 'quickly',
    'deadline', 'expires', 'final', 'last chance', 'hurry'
  ];

  public analyzePhrase(phrase: string): ScamIndicator[] {
    const indicators: ScamIndicator[] = [];
    const lowerPhrase = phrase.toLowerCase();

    // Check for scam phrases
    this.scamPhrases.forEach((scamPhrase, index) => {
      if (lowerPhrase.includes(scamPhrase)) {
        indicators.push({
          id: `indicator-${Date.now()}-${index}`,
          type: this.categorizePhrase(scamPhrase),
          phrase: phrase,
          confidence: this.calculateConfidence(scamPhrase, phrase),
          timestamp: new Date(),
          severity: this.calculateSeverity(scamPhrase)
        });
      }
    });

    return indicators;
  }

  public analyzeSentiment(transcript: string[]): SentimentAnalysis {
    const fullText = transcript.join(' ').toLowerCase();
    
    // Simple sentiment analysis (in production, use ML models)
    const urgencyScore = this.calculateUrgencyScore(fullText);
    const manipulationScore = this.calculateManipulationScore(fullText);
    const fearScore = this.calculateFearScore(fullText);
    const angerScore = this.calculateAngerScore(fullText);

    const overallScore = (urgencyScore + manipulationScore + fearScore + angerScore) / 4;
    
    return {
      overall: overallScore > 0.7 ? 'aggressive' : overallScore > 0.5 ? 'negative' : 'neutral',
      confidence: Math.min(0.95, overallScore + 0.1),
      emotions: {
        urgency: urgencyScore,
        manipulation: manipulationScore,
        fear: fearScore,
        anger: angerScore
      }
    };
  }

  private categorizePhrase(phrase: string): ScamIndicator['type'] {
    if (phrase.includes('money') || phrase.includes('wire') || phrase.includes('card')) {
      return 'money_request';
    }
    if (phrase.includes('social security') || phrase.includes('account') || phrase.includes('password')) {
      return 'personal_info';
    }
    if (phrase.includes('irs') || phrase.includes('government') || phrase.includes('support')) {
      return 'authority_claim';
    }
    if (phrase.includes('immediately') || phrase.includes('urgent') || phrase.includes('final')) {
      return 'urgency';
    }
    return 'pressure_tactic';
  }

  private calculateConfidence(scamPhrase: string, fullPhrase: string): number {
    // Higher confidence for exact matches and context
    const exactMatch = fullPhrase.toLowerCase().includes(scamPhrase);
    const contextWords = ['please', 'need', 'must', 'have to', 'required'];
    const hasContext = contextWords.some(word => fullPhrase.toLowerCase().includes(word));
    
    let confidence = exactMatch ? 0.8 : 0.6;
    if (hasContext) confidence += 0.1;
    
    return Math.min(0.95, confidence);
  }

  private calculateSeverity(phrase: string): ScamIndicator['severity'] {
    const highRiskPhrases = ['social security', 'wire money', 'arrest warrant', 'legal action'];
    const mediumRiskPhrases = ['final notice', 'expires today', 'government agency'];
    
    if (highRiskPhrases.some(risk => phrase.includes(risk))) return 'high';
    if (mediumRiskPhrases.some(risk => phrase.includes(risk))) return 'medium';
    return 'low';
  }

  private calculateUrgencyScore(text: string): number {
    const urgencyCount = this.urgencyWords.filter(word => text.includes(word)).length;
    return Math.min(1, urgencyCount * 0.2);
  }

  private calculateManipulationScore(text: string): number {
    const manipulationWords = ['trust me', 'special offer', 'only you', 'secret', 'confidential'];
    const count = manipulationWords.filter(word => text.includes(word)).length;
    return Math.min(1, count * 0.25);
  }

  private calculateFearScore(text: string): number {
    const fearWords = ['arrest', 'lawsuit', 'police', 'court', 'legal action', 'suspended'];
    const count = fearWords.filter(word => text.includes(word)).length;
    return Math.min(1, count * 0.3);
  }

  private calculateAngerScore(text: string): number {
    const angerWords = ['stupid', 'idiot', 'listen to me', 'pay attention'];
    const count = angerWords.filter(word => text.includes(word)).length;
    return Math.min(1, count * 0.4);
  }
}

export const scamDetector = new ScamDetectionEngine();
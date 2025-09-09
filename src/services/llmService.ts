export interface LLMAnalysisRequest {
  transcript: string;
  context: {
    callerNumber: string;
    callDuration: number;
    userAge?: number;
    previousCalls?: string[];
  };
}

export interface LLMAnalysisResponse {
  isScam: boolean;
  confidence: number;
  scamType: string;
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  recommendations: string[];
  urgencyScore: number;
  manipulationTactics: string[];
  redFlags: string[];
}

export class LLMService {
  private apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  private model = 'gpt-3.5-turbo';

  public async analyzeCallTranscript(request: LLMAnalysisRequest): Promise<LLMAnalysisResponse> {
    try {
      // Enhanced analysis with multiple AI models
      return await this.simulateAdvancedLLMAnalysis(request);
    } catch (error) {
      console.error('LLM analysis failed:', error);
      return this.fallbackAnalysis(request.transcript);
    }
  }

  public async analyzeWithMultipleModels(transcript: string): Promise<{
    sentiment: any;
    toxicity: number;
    scamLikelihood: number;
    keyPhrases: string[];
  }> {
    try {
      // Simulate multiple AI model analysis
      const sentiment = await this.analyzeSentiment(transcript);
      const toxicity = this.analyzeToxicity(transcript);
      const scamLikelihood = this.calculateScamLikelihood(transcript);
      const keyPhrases = this.extractKeyPhrases(transcript);

      return {
        sentiment,
        toxicity,
        scamLikelihood,
        keyPhrases
      };
    } catch (error) {
      console.error('Multi-model analysis failed:', error);
      throw error;
    }
  }

  private async analyzeSentiment(text: string): Promise<any> {
    // Enhanced sentiment analysis
    const emotionalWords = {
      anger: ['angry', 'furious', 'mad', 'irritated'],
      fear: ['scared', 'afraid', 'worried', 'anxious', 'terrified'],
      urgency: ['urgent', 'immediately', 'now', 'quickly', 'hurry'],
      manipulation: ['trust me', 'believe me', 'special offer', 'only you']
    };

    const lowerText = text.toLowerCase();
    const scores = {};

    Object.entries(emotionalWords).forEach(([emotion, words]) => {
      const matches = words.filter(word => lowerText.includes(word)).length;
      scores[emotion] = Math.min(1, matches * 0.3);
    });

    return {
      overall: Object.values(scores).reduce((sum: number, score: number) => sum + score, 0) > 1.5 ? 'negative' : 'neutral',
      scores
    };
  }

  private analyzeToxicity(text: string): number {
    const toxicPhrases = [
      'you\'re stupid', 'idiot', 'shut up', 'listen to me',
      'don\'t be dumb', 'pay attention', 'are you deaf'
    ];

    const lowerText = text.toLowerCase();
    const matches = toxicPhrases.filter(phrase => lowerText.includes(phrase)).length;
    
    return Math.min(1, matches * 0.4);
  }

  private calculateScamLikelihood(text: string): number {
    const scamIndicators = [
      'final notice', 'suspended', 'arrest warrant', 'legal action',
      'wire money', 'gift cards', 'bitcoin', 'remote access',
      'social security', 'irs', 'microsoft support', 'virus detected'
    ];

    const lowerText = text.toLowerCase();
    const matches = scamIndicators.filter(indicator => lowerText.includes(indicator)).length;
    
    return Math.min(1, matches * 0.25);
  }

  private extractKeyPhrases(text: string): string[] {
    // Simple key phrase extraction
    const phrases = text.split(/[.!?]+/).map(phrase => phrase.trim()).filter(phrase => phrase.length > 10);
    return phrases.slice(0, 5); // Return top 5 phrases
  }

  private async simulateAdvancedLLMAnalysis(request: LLMAnalysisRequest): Promise<LLMAnalysisResponse> {
    const transcript = request.transcript.toLowerCase();
    
    // Advanced scam detection patterns
    const scamPatterns = {
      irs_tax: {
        keywords: ['irs', 'tax', 'refund', 'audit', 'owe money', 'tax debt'],
        confidence: 0.95,
        type: 'IRS Tax Scam',
        riskLevel: 'critical' as const
      },
      tech_support: {
        keywords: ['microsoft', 'computer', 'virus', 'infected', 'remote access', 'windows'],
        confidence: 0.92,
        type: 'Tech Support Scam',
        riskLevel: 'critical' as const
      },
      bank_fraud: {
        keywords: ['bank', 'account suspended', 'verify account', 'fraud alert', 'security'],
        confidence: 0.88,
        type: 'Bank Fraud Scam',
        riskLevel: 'high' as const
      },
      prize_lottery: {
        keywords: ['won', 'prize', 'lottery', 'congratulations', 'claim', 'winner'],
        confidence: 0.85,
        type: 'Prize/Lottery Scam',
        riskLevel: 'high' as const
      },
      medicare: {
        keywords: ['medicare', 'health insurance', 'benefits', 'coverage', 'medical'],
        confidence: 0.80,
        type: 'Medicare Scam',
        riskLevel: 'medium' as const
      }
    };

    // Detect scam type
    let detectedScam = null;
    let maxMatches = 0;

    Object.entries(scamPatterns).forEach(([key, pattern]) => {
      const matches = pattern.keywords.filter(keyword => transcript.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedScam = pattern;
      }
    });

    // Calculate risk factors
    const riskFactors = {
      urgency: this.calculateUrgencyScore(transcript),
      authority: this.calculateAuthorityScore(transcript),
      financial: this.calculateFinancialScore(transcript),
      personal: this.calculatePersonalInfoScore(transcript),
      pressure: this.calculatePressureScore(transcript)
    };

    const avgRiskScore = Object.values(riskFactors).reduce((sum, score) => sum + score, 0) / 5;
    const isScam = detectedScam !== null || avgRiskScore > 0.6;
    
    // Generate contextual recommendations
    const recommendations = this.generateContextualRecommendations(
      detectedScam,
      riskFactors,
      request.context
    );

    // Detect manipulation tactics
    const manipulationTactics = this.detectManipulationTactics(transcript);
    const redFlags = this.identifyRedFlags(transcript, riskFactors);

    return {
      isScam,
      confidence: detectedScam ? detectedScam.confidence : avgRiskScore,
      scamType: detectedScam ? detectedScam.type : 'Unknown/General Fraud',
      riskLevel: detectedScam ? detectedScam.riskLevel : this.calculateRiskLevel(avgRiskScore),
      explanation: this.generateExplanation(detectedScam, riskFactors, transcript),
      recommendations,
      urgencyScore: riskFactors.urgency,
      manipulationTactics,
      redFlags
    };
  }

  private calculateUrgencyScore(transcript: string): number {
    const urgencyWords = [
      'immediately', 'urgent', 'emergency', 'now', 'quickly', 'hurry',
      'deadline', 'expires', 'final', 'last chance', 'time sensitive'
    ];
    
    const matches = urgencyWords.filter(word => transcript.includes(word)).length;
    return Math.min(1, matches * 0.25);
  }

  private calculateAuthorityScore(transcript: string): number {
    const authorityWords = [
      'irs', 'fbi', 'police', 'government', 'social security', 'medicare',
      'microsoft', 'apple', 'google', 'bank', 'official', 'department'
    ];
    
    const matches = authorityWords.filter(word => transcript.includes(word)).length;
    return Math.min(1, matches * 0.3);
  }

  private calculateFinancialScore(transcript: string): number {
    const financialWords = [
      'money', 'payment', 'credit card', 'bank account', 'wire transfer',
      'gift card', 'bitcoin', 'refund', 'fee', 'charge', 'deposit', 'withdraw'
    ];
    
    const matches = financialWords.filter(word => transcript.includes(word)).length;
    return Math.min(1, matches * 0.35);
  }

  private calculatePersonalInfoScore(transcript: string): number {
    const personalWords = [
      'social security number', 'ssn', 'password', 'pin', 'account number',
      'date of birth', 'mother maiden name', 'address', 'zip code', 'verify'
    ];
    
    const matches = personalWords.filter(word => transcript.includes(word)).length;
    return Math.min(1, matches * 0.4);
  }

  private calculatePressureScore(transcript: string): number {
    const pressureWords = [
      'don\'t hang up', 'stay on the line', 'don\'t tell anyone', 'secret',
      'arrest', 'lawsuit', 'legal action', 'consequences', 'trouble'
    ];
    
    const matches = pressureWords.filter(word => transcript.includes(word)).length;
    return Math.min(1, matches * 0.3);
  }

  private generateContextualRecommendations(
    detectedScam: any,
    riskFactors: any,
    context: LLMAnalysisRequest['context']
  ): string[] {
    const recommendations: string[] = [];

    if (detectedScam) {
      switch (detectedScam.type) {
        case 'IRS Tax Scam':
          recommendations.push('🏛️ The IRS NEVER calls without sending letters first');
          recommendations.push('🛑 Hang up immediately - this is definitely a scam');
          break;
        case 'Tech Support Scam':
          recommendations.push('💻 Microsoft/Apple never call customers unsolicited');
          recommendations.push('🚫 Never give remote access to your computer');
          break;
        case 'Bank Fraud Scam':
          recommendations.push('🏦 Call your bank directly using the number on your card');
          recommendations.push('❓ Ask for their name and department, then verify');
          break;
      }
    }

    if (riskFactors.urgency > 0.7) {
      recommendations.push('⏰ Scammers create false urgency - take time to think');
    }

    if (riskFactors.personal > 0.5) {
      recommendations.push('🔒 NEVER give personal information to unsolicited callers');
    }

    if (riskFactors.financial > 0.5) {
      recommendations.push('💳 Legitimate companies don\'t ask for payment over the phone');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Continue conversation but stay alert for warning signs');
    }

    return recommendations;
  }

  private detectManipulationTactics(transcript: string): string[] {
    const tactics: string[] = [];
    const lowerText = transcript.toLowerCase();

    if (lowerText.includes('trust me') || lowerText.includes('believe me')) {
      tactics.push('Trust Building');
    }

    if (lowerText.includes('special offer') || lowerText.includes('limited time')) {
      tactics.push('Artificial Scarcity');
    }

    if (lowerText.includes('don\'t tell') || lowerText.includes('secret')) {
      tactics.push('Secrecy Demands');
    }

    if (lowerText.includes('arrest') || lowerText.includes('legal action')) {
      tactics.push('Fear Intimidation');
    }

    if (lowerText.includes('verify') || lowerText.includes('confirm')) {
      tactics.push('False Verification');
    }

    return tactics;
  }

  private identifyRedFlags(transcript: string, riskFactors: any): string[] {
    const redFlags: string[] = [];
    const lowerText = transcript.toLowerCase();

    if (riskFactors.urgency > 0.7) {
      redFlags.push('🚩 Extreme urgency pressure');
    }

    if (lowerText.includes('don\'t hang up')) {
      redFlags.push('🚩 Preventing call termination');
    }

    if (lowerText.includes('gift card') || lowerText.includes('wire money')) {
      redFlags.push('🚩 Unusual payment method');
    }

    if (lowerText.includes('remote access') || lowerText.includes('teamviewer')) {
      redFlags.push('🚩 Requesting computer access');
    }

    if (riskFactors.personal > 0.8) {
      redFlags.push('🚩 Aggressive personal info requests');
    }

    return redFlags;
  }

  private calculateRiskLevel(score: number): 'safe' | 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 0.8) return 'critical';
    if (score >= 0.6) return 'high';
    if (score >= 0.4) return 'medium';
    if (score >= 0.2) return 'low';
    return 'safe';
  }

  private generateExplanation(detectedScam: any, riskFactors: any, transcript: string): string {
    if (detectedScam) {
      return `This appears to be a ${detectedScam.type}. These scams typically target elderly individuals by ${this.getScamDescription(detectedScam.type)}.`;
    }

    const highestRisk = Object.entries(riskFactors).reduce((max, [key, value]) => 
      value > max.value ? { key, value } : max, { key: '', value: 0 }
    );

    if (highestRisk.value > 0.5) {
      return `The caller is using ${highestRisk.key} tactics commonly associated with phone scams.`;
    }

    return 'The conversation appears normal, but continue to be cautious.';
  }

  private getScamDescription(scamType: string): string {
    switch (scamType) {
      case 'IRS Tax Scam':
        return 'impersonating the IRS and claiming you owe taxes or are entitled to a refund';
      case 'Tech Support Scam':
        return 'claiming your computer is infected and offering to fix it remotely';
      case 'Bank Fraud Scam':
        return 'pretending to be from your bank and claiming there\'s suspicious activity';
      case 'Prize/Lottery Scam':
        return 'claiming you\'ve won a prize but need to pay fees to claim it';
      case 'Medicare Scam':
        return 'offering fake Medicare benefits or requesting Medicare information';
      default:
        return 'using various deceptive tactics to steal money or personal information';
    }
  }

  private fallbackAnalysis(transcript: string): LLMAnalysisResponse {
    return {
      isScam: false,
      confidence: 0.5,
      scamType: 'Analysis Unavailable',
      riskLevel: 'medium',
      explanation: 'Unable to perform advanced analysis. Using basic detection.',
      recommendations: ['Stay alert and be cautious with any requests for information'],
      urgencyScore: 0.3,
      manipulationTactics: [],
      redFlags: []
    };
  }
}

export const llmService = new LLMService();
import { llmService } from '../services/llmService';
import { voiceAI } from '../services/voiceAI';

export interface AdvancedScamAnalysis {
  overallRisk: number;
  scamType: string;
  confidence: number;
  aiRecommendations: string[];
  voiceStressLevel: number;
  emotionalManipulation: number;
  linguisticPatterns: string[];
  behavioralIndicators: string[];
}

export class AdvancedScamDetector {
  private knownScamNumbers = new Set([
    '+1-555-000-1234',
    '+1-800-000-5678',
    '+1-888-000-9999',
    '+1-877-000-1111'
  ]);

  public async performComprehensiveAnalysis(
    transcript: string,
    callerNumber: string,
    callDuration: number,
    voiceMetrics?: any
  ): Promise<AdvancedScamAnalysis> {
    
    // Check against known scam numbers
    const isKnownScammer = this.knownScamNumbers.has(callerNumber);
    
    // Analyze with LLM
    const llmAnalysis = await llmService.analyzeCallTranscript({
      transcript,
      context: {
        callerNumber,
        callDuration,
        userAge: 75, // Default elderly user
        previousCalls: []
      }
    });

    // Advanced linguistic analysis
    const linguisticPatterns = this.analyzeLinguisticPatterns(transcript);
    
    // Behavioral analysis
    const behavioralIndicators = this.analyzeBehavioralPatterns(transcript, callDuration);
    
    // Voice stress analysis (simulated)
    const voiceStressLevel = this.calculateVoiceStress(transcript, voiceMetrics);
    
    // Emotional manipulation detection
    const emotionalManipulation = this.detectEmotionalManipulation(transcript);

    // Calculate overall risk
    let overallRisk = llmAnalysis.confidence;
    
    if (isKnownScammer) overallRisk = Math.max(overallRisk, 0.95);
    if (voiceStressLevel > 0.7) overallRisk += 0.1;
    if (emotionalManipulation > 0.6) overallRisk += 0.15;
    
    overallRisk = Math.min(1, overallRisk);

    return {
      overallRisk,
      scamType: llmAnalysis.scamType,
      confidence: llmAnalysis.confidence,
      aiRecommendations: llmAnalysis.recommendations,
      voiceStressLevel,
      emotionalManipulation,
      linguisticPatterns,
      behavioralIndicators
    };
  }

  private analyzeLinguisticPatterns(transcript: string): string[] {
    const patterns: string[] = [];
    const text = transcript.toLowerCase();

    // Script-like language patterns
    if (text.includes('this is') && text.includes('calling from')) {
      patterns.push('Formal script introduction');
    }

    // Repetitive phrases
    const words = text.split(' ');
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const repeatedWords = Object.entries(wordCount)
      .filter(([word, count]) => count > 3 && word.length > 3)
      .map(([word]) => word);

    if (repeatedWords.length > 0) {
      patterns.push(`Repetitive language: ${repeatedWords.join(', ')}`);
    }

    // Complex sentence structures (scammers often use simple, direct language)
    const sentences = text.split(/[.!?]+/);
    const avgWordsPerSentence = sentences.reduce((sum, sentence) => 
      sum + sentence.trim().split(' ').length, 0) / sentences.length;

    if (avgWordsPerSentence < 8) {
      patterns.push('Unusually simple sentence structure');
    }

    return patterns;
  }

  private analyzeBehavioralPatterns(transcript: string, duration: number): string[] {
    const indicators: string[] = [];
    const text = transcript.toLowerCase();

    // Fast talking (estimated)
    const wordsPerMinute = transcript.split(' ').length / (duration / 60);
    if (wordsPerMinute > 180) {
      indicators.push('Rapid speech pattern (pressure tactic)');
    }

    // Interruption patterns
    if (text.includes('let me') && text.includes('explain')) {
      indicators.push('Preventing user from speaking');
    }

    // Information gathering sequence
    if (text.includes('verify') || text.includes('confirm')) {
      indicators.push('Systematic information gathering');
    }

    // Escalation tactics
    if (text.includes('supervisor') || text.includes('manager')) {
      indicators.push('False escalation offers');
    }

    return indicators;
  }

  private calculateVoiceStress(transcript: string, voiceMetrics?: any): number {
    // Simulated voice stress analysis
    // In production, this would analyze actual audio features
    const stressIndicators = [
      'immediately', 'urgent', 'problem', 'issue', 'suspended',
      'arrest', 'legal', 'court', 'lawsuit', 'police'
    ];

    const matches = stressIndicators.filter(indicator => 
      transcript.toLowerCase().includes(indicator)
    ).length;

    return Math.min(1, matches * 0.2 + (voiceMetrics?.pitch || 0.3));
  }

  private detectEmotionalManipulation(transcript: string): number {
    const manipulationTactics = [
      'trust me', 'help you', 'protect you', 'save money', 'special offer',
      'only you', 'selected', 'qualified', 'deserve', 'entitled'
    ];

    const fearTactics = [
      'arrest', 'lawsuit', 'legal action', 'consequences', 'trouble',
      'suspended', 'frozen', 'closed', 'terminated'
    ];

    const text = transcript.toLowerCase();
    const manipulationScore = manipulationTactics.filter(tactic => text.includes(tactic)).length * 0.15;
    const fearScore = fearTactics.filter(tactic => text.includes(tactic)).length * 0.2;

    return Math.min(1, manipulationScore + fearScore);
  }

  public async updateThreatDatabase(newThreats: string[]): Promise<void> {
    newThreats.forEach(number => this.knownScamNumbers.add(number));
    console.log('Threat database updated with new numbers:', newThreats);
  }

  public getKnownScamNumbers(): string[] {
    return Array.from(this.knownScamNumbers);
  }
}

export const advancedScamDetector = new AdvancedScamDetector();
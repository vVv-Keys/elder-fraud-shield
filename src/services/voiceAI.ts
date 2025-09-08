import { HfInference } from '@huggingface/inference';

export interface VoiceAIConfig {
  apiKey?: string;
  model: string;
  sensitivity: number;
  realTimeProcessing: boolean;
}

export interface VoiceAnalysisResult {
  transcript: string;
  sentiment: {
    label: string;
    score: number;
  };
  scamProbability: number;
  detectedPatterns: string[];
  riskFactors: {
    urgency: number;
    authority: number;
    financial: number;
    personal: number;
    pressure: number;
  };
  recommendations: string[];
  confidence: number;
}

export class VoiceAIService {
  private hf: HfInference;
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

  constructor(config: VoiceAIConfig) {
    // Use demo mode for client-side implementation
    this.hf = new HfInference();
    this.setupSpeechRecognition();
  }

  private setupSpeechRecognition(): void {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
    }
  }

  public async startVoiceAnalysis(
    onTranscript: (text: string) => void,
    onAnalysis: (result: VoiceAnalysisResult) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      if (!this.recognition) {
        throw new Error('Speech recognition not supported');
      }

      this.isListening = true;
      let finalTranscript = '';
      let interimTranscript = '';

      this.recognition.onresult = async (event) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            
            // Analyze the final transcript with AI
            const analysis = await this.analyzeWithLLM(transcript);
            onAnalysis(analysis);
          } else {
            interimTranscript += transcript;
          }
        }
        
        onTranscript(finalTranscript + interimTranscript);
      };

      this.recognition.onerror = (event) => {
        onError(`Speech recognition error: ${event.error}`);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          // Restart recognition if it stops unexpectedly
          setTimeout(() => {
            if (this.isListening && this.recognition) {
              this.recognition.start();
            }
          }, 100);
        }
      };

      this.recognition.start();
    } catch (error) {
      onError(`Failed to start voice analysis: ${error}`);
    }
  }

  public stopVoiceAnalysis(): void {
    this.isListening = false;
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  private async analyzeWithLLM(text: string): Promise<VoiceAnalysisResult> {
    try {
      // Sentiment analysis using Hugging Face
      const sentimentResult = await this.hf.textClassification({
        model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
        inputs: text
      });

      // Scam detection using custom prompt
      const scamAnalysis = await this.detectScamPatterns(text);
      
      return {
        transcript: text,
        sentiment: {
          label: Array.isArray(sentimentResult) ? sentimentResult[0]?.label || 'NEUTRAL' : 'NEUTRAL',
          score: Array.isArray(sentimentResult) ? sentimentResult[0]?.score || 0.5 : 0.5
        },
        scamProbability: scamAnalysis.probability,
        detectedPatterns: scamAnalysis.patterns,
        riskFactors: scamAnalysis.riskFactors,
        recommendations: scamAnalysis.recommendations,
        confidence: scamAnalysis.confidence
      };
    } catch (error) {
      console.error('LLM analysis error:', error);
      
      // Fallback to rule-based analysis
      return this.fallbackAnalysis(text);
    }
  }

  private async detectScamPatterns(text: string): Promise<{
    probability: number;
    patterns: string[];
    riskFactors: any;
    recommendations: string[];
    confidence: number;
  }> {
    const lowerText = text.toLowerCase();
    
    // Advanced pattern detection
    const scamPatterns = {
      urgency: [
        'immediately', 'urgent', 'right now', 'expires today', 'final notice',
        'last chance', 'act fast', 'limited time', 'deadline', 'emergency'
      ],
      authority: [
        'irs', 'fbi', 'police', 'government', 'social security', 'medicare',
        'microsoft', 'apple', 'google', 'bank', 'credit card company'
      ],
      financial: [
        'money', 'payment', 'credit card', 'bank account', 'wire transfer',
        'gift card', 'bitcoin', 'refund', 'fee', 'charge', 'deposit'
      ],
      personal: [
        'social security number', 'ssn', 'password', 'pin', 'account number',
        'date of birth', 'mother maiden name', 'address', 'zip code'
      ],
      pressure: [
        'don\'t hang up', 'stay on the line', 'don\'t tell anyone',
        'keep this confidential', 'secret', 'arrest', 'lawsuit', 'legal action'
      ]
    };

    const detectedPatterns: string[] = [];
    const riskFactors = {
      urgency: 0,
      authority: 0,
      financial: 0,
      personal: 0,
      pressure: 0
    };

    // Calculate risk factors
    Object.entries(scamPatterns).forEach(([category, patterns]) => {
      const matches = patterns.filter(pattern => lowerText.includes(pattern));
      if (matches.length > 0) {
        riskFactors[category as keyof typeof riskFactors] = Math.min(1, matches.length * 0.3);
        detectedPatterns.push(`${category.toUpperCase()}: ${matches.join(', ')}`);
      }
    });

    // Calculate overall probability
    const totalRisk = Object.values(riskFactors).reduce((sum, risk) => sum + risk, 0);
    const probability = Math.min(1, totalRisk / 2);

    // Generate recommendations based on detected patterns
    const recommendations = this.generateRecommendations(riskFactors, detectedPatterns);

    return {
      probability,
      patterns: detectedPatterns,
      riskFactors,
      recommendations,
      confidence: Math.min(0.95, probability + 0.2)
    };
  }

  private generateRecommendations(riskFactors: any, patterns: string[]): string[] {
    const recommendations: string[] = [];

    if (riskFactors.urgency > 0.5) {
      recommendations.push('🚨 URGENT: Scammers create false urgency. Take time to think.');
    }

    if (riskFactors.authority > 0.5) {
      recommendations.push('🏛️ AUTHORITY SCAM: Government agencies don\'t call without notice.');
    }

    if (riskFactors.financial > 0.5) {
      recommendations.push('💰 MONEY SCAM: Never give financial information over the phone.');
    }

    if (riskFactors.personal > 0.5) {
      recommendations.push('🔒 IDENTITY THEFT: Never share personal information with callers.');
    }

    if (riskFactors.pressure > 0.5) {
      recommendations.push('⚠️ PRESSURE TACTICS: Legitimate callers don\'t threaten or pressure.');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Continue conversation but stay alert for warning signs.');
    }

    return recommendations;
  }

  private fallbackAnalysis(text: string): VoiceAnalysisResult {
    const lowerText = text.toLowerCase();
    
    // Simple keyword-based analysis as fallback
    const scamKeywords = [
      'irs', 'tax', 'refund', 'social security', 'suspended', 'arrest',
      'microsoft', 'computer', 'virus', 'infected', 'remote access',
      'bank', 'account', 'suspended', 'verify', 'confirm',
      'prize', 'winner', 'congratulations', 'claim', 'fee'
    ];

    const detectedKeywords = scamKeywords.filter(keyword => lowerText.includes(keyword));
    const scamProbability = Math.min(1, detectedKeywords.length * 0.2);

    return {
      transcript: text,
      sentiment: {
        label: scamProbability > 0.6 ? 'NEGATIVE' : 'NEUTRAL',
        score: scamProbability
      },
      scamProbability,
      detectedPatterns: detectedKeywords.map(keyword => `Detected: ${keyword}`),
      riskFactors: {
        urgency: lowerText.includes('urgent') || lowerText.includes('immediately') ? 0.8 : 0.2,
        authority: lowerText.includes('irs') || lowerText.includes('government') ? 0.9 : 0.1,
        financial: lowerText.includes('money') || lowerText.includes('account') ? 0.7 : 0.1,
        personal: lowerText.includes('social security') || lowerText.includes('password') ? 0.9 : 0.1,
        pressure: lowerText.includes('don\'t hang up') || lowerText.includes('arrest') ? 0.8 : 0.1
      },
      recommendations: scamProbability > 0.6 ? 
        ['🚨 HIGH RISK: Consider hanging up immediately'] : 
        ['✅ Continue conversation but stay alert'],
      confidence: 0.7
    };
  }

  public async analyzeAudioFile(audioBlob: Blob): Promise<VoiceAnalysisResult> {
    try {
      // Convert audio to text using Hugging Face
      const result = await this.hf.automaticSpeechRecognition({
        model: 'openai/whisper-small',
        data: audioBlob
      });

      const transcript = typeof result === 'object' && 'text' in result ? result.text : '';
      return await this.analyzeWithLLM(transcript);
    } catch (error) {
      console.error('Audio analysis error:', error);
      throw new Error('Failed to analyze audio');
    }
  }

  public isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }
}

// Global voice AI service instance
export const voiceAI = new VoiceAIService({
  model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
  sensitivity: 0.75,
  realTimeProcessing: true
});
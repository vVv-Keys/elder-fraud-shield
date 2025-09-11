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
  voiceMetrics: {
    speechRate: number;
    pauseFrequency: number;
    stressLevel: number;
    emotionalTone: string;
  };
}

export class VoiceAIService {
  private hf: HfInference;
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;

  constructor(config: VoiceAIConfig) {
    this.hf = new HfInference(config.apiKey);
    this.setupSpeechRecognition();
    this.setupAudioAnalysis();
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

  private setupAudioAnalysis(): void {
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public async startVoiceAnalysis(
    onTranscript: (text: string) => void,
    onAnalysis: (result: VoiceAnalysisResult) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      if (!this.recognition) {
        throw new Error('Voice recognition not supported in this browser');
      }

      // Get microphone access for audio analysis
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (this.audioContext && this.mediaStream) {
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        source.connect(this.analyser);
      }

      this.isListening = true;
      let finalTranscript = '';
      let interimTranscript = '';
      let speechStartTime = Date.now();
      let wordCount = 0;
      let pauseCount = 0;

      this.recognition.onresult = async (event) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            wordCount += transcript.split(' ').length;
            
            // Analyze the final transcript
            const analysis = await this.performAdvancedAnalysis(
              transcript, 
              finalTranscript,
              speechStartTime,
              wordCount,
              pauseCount
            );
            onAnalysis(analysis);
          } else {
            interimTranscript += transcript;
          }
        }
        
        onTranscript(finalTranscript + interimTranscript);
      };

      this.recognition.onstart = () => {
        speechStartTime = Date.now();
      };

      this.recognition.onend = () => {
        pauseCount++;
        if (this.isListening) {
          setTimeout(() => {
            if (this.isListening && this.recognition) {
              this.recognition.start();
            }
          }, 100);
        }
      };

      this.recognition.onerror = (event) => {
        onError(`Voice recognition error: ${event.error}`);
      };

      this.recognition.start();
    } catch (error) {
      onError(`Failed to start voice analysis: Please allow microphone access`);
    }
  }

  private async performAdvancedAnalysis(
    currentPhrase: string,
    fullTranscript: string,
    startTime: number,
    wordCount: number,
    pauseCount: number
  ): Promise<VoiceAnalysisResult> {
    try {
      // Calculate voice metrics
      const duration = (Date.now() - startTime) / 1000;
      const speechRate = wordCount / (duration / 60); // words per minute
      const pauseFrequency = pauseCount / duration;
      
      // Audio analysis for stress detection
      const stressLevel = this.analyzeAudioStress();
      
      // Sentiment analysis using Hugging Face
      let sentimentResult;
      try {
        sentimentResult = await this.hf.textClassification({
          model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
          inputs: currentPhrase
        });
      } catch (error) {
        console.warn('Sentiment analysis failed, using fallback');
        sentimentResult = [{ label: 'NEUTRAL', score: 0.5 }];
      }

      // Advanced scam detection
      const scamAnalysis = await this.detectAdvancedScamPatterns(currentPhrase, fullTranscript);
      
      // Emotional tone analysis
      const emotionalTone = this.analyzeEmotionalTone(currentPhrase, stressLevel);
      
      return {
        transcript: currentPhrase,
        sentiment: {
          label: Array.isArray(sentimentResult) ? sentimentResult[0]?.label || 'NEUTRAL' : 'NEUTRAL',
          score: Array.isArray(sentimentResult) ? sentimentResult[0]?.score || 0.5 : 0.5
        },
        scamProbability: scamAnalysis.probability,
        detectedPatterns: scamAnalysis.patterns,
        riskFactors: scamAnalysis.riskFactors,
        recommendations: scamAnalysis.recommendations,
        confidence: scamAnalysis.confidence,
        voiceMetrics: {
          speechRate,
          pauseFrequency,
          stressLevel,
          emotionalTone
        }
      };
    } catch (error) {
      console.error('Advanced analysis error:', error);
      return this.fallbackAnalysis(currentPhrase);
    }
  }

  private analyzeAudioStress(): number {
    if (!this.analyser) return 0.3;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    // Calculate average frequency intensity
    const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    
    // Higher frequencies often indicate stress/tension
    const highFreqSum = dataArray.slice(bufferLength * 0.7).reduce((sum, value) => sum + value, 0);
    const highFreqAvg = highFreqSum / (bufferLength * 0.3);
    
    // Normalize stress level (0-1)
    return Math.min(1, (highFreqAvg / 255) * 2);
  }

  private analyzeEmotionalTone(text: string, stressLevel: number): string {
    const lowerText = text.toLowerCase();
    
    if (stressLevel > 0.7) return 'aggressive';
    if (lowerText.includes('please') || lowerText.includes('help')) return 'pleading';
    if (lowerText.includes('urgent') || lowerText.includes('immediately')) return 'urgent';
    if (lowerText.includes('trust') || lowerText.includes('believe')) return 'persuasive';
    if (lowerText.includes('problem') || lowerText.includes('issue')) return 'concerning';
    
    return 'neutral';
  }

  private async detectAdvancedScamPatterns(currentPhrase: string, fullTranscript: string): Promise<{
    probability: number;
    patterns: string[];
    riskFactors: any;
    recommendations: string[];
    confidence: number;
  }> {
    const text = currentPhrase.toLowerCase();
    const fullText = fullTranscript.toLowerCase();
    
    // Enhanced scam pattern database
    const scamPatterns = {
      urgency: {
        keywords: ['immediately', 'urgent', 'right now', 'expires today', 'final notice', 'last chance', 'act fast', 'limited time', 'deadline', 'emergency'],
        weight: 0.8
      },
      authority: {
        keywords: ['irs', 'fbi', 'police', 'government', 'social security', 'medicare', 'microsoft', 'apple', 'google', 'bank', 'credit card company', 'department'],
        weight: 0.9
      },
      financial: {
        keywords: ['money', 'payment', 'credit card', 'bank account', 'wire transfer', 'gift card', 'bitcoin', 'refund', 'fee', 'charge', 'deposit', 'withdraw'],
        weight: 0.85
      },
      personal: {
        keywords: ['social security number', 'ssn', 'password', 'pin', 'account number', 'date of birth', 'mother maiden name', 'address', 'zip code', 'verify', 'confirm'],
        weight: 0.95
      },
      pressure: {
        keywords: ['don\'t hang up', 'stay on the line', 'don\'t tell anyone', 'keep this confidential', 'secret', 'arrest', 'lawsuit', 'legal action', 'consequences'],
        weight: 0.9
      },
      technical: {
        keywords: ['computer', 'virus', 'infected', 'malware', 'remote access', 'teamviewer', 'windows', 'error', 'warning', 'security alert'],
        weight: 0.85
      }
    };

    const detectedPatterns: string[] = [];
    const riskFactors: any = {};
    let totalRisk = 0;

    // Analyze patterns with context awareness
    Object.entries(scamPatterns).forEach(([category, pattern]) => {
      const matches = pattern.keywords.filter(keyword => text.includes(keyword) || fullText.includes(keyword));
      if (matches.length > 0) {
        const categoryRisk = Math.min(1, matches.length * 0.3) * pattern.weight;
        riskFactors[category] = categoryRisk;
        totalRisk += categoryRisk;
        detectedPatterns.push(`${category.toUpperCase()}: ${matches.join(', ')}`);
      } else {
        riskFactors[category] = 0;
      }
    });

    // Context-based risk adjustment
    if (fullText.length > 100) {
      // Longer conversations with multiple risk factors are more dangerous
      const riskFactorCount = Object.values(riskFactors).filter((risk: any) => risk > 0.3).length;
      if (riskFactorCount >= 3) {
        totalRisk *= 1.3; // 30% increase for multiple risk factors
      }
    }

    const probability = Math.min(1, totalRisk / 3);
    const recommendations = this.generateContextualRecommendations(riskFactors, detectedPatterns, probability);

    return {
      probability,
      patterns: detectedPatterns,
      riskFactors,
      recommendations,
      confidence: Math.min(0.95, probability + 0.15)
    };
  }

  private generateContextualRecommendations(riskFactors: any, patterns: string[], probability: number): string[] {
    const recommendations: string[] = [];

    if (probability >= 0.8) {
      recommendations.push('🚨 CRITICAL: Hang up immediately - this is extremely dangerous');
      recommendations.push('📞 Call your family right now to let them know about this threat');
    } else if (probability >= 0.6) {
      recommendations.push('⚠️ HIGH RISK: Consider ending this call');
      recommendations.push('❓ Ask for their name, company, and call them back using official numbers');
    } else if (probability >= 0.4) {
      recommendations.push('⚡ MEDIUM RISK: Be very cautious');
      recommendations.push('🔍 Verify any claims they make independently');
    }

    if (riskFactors.urgency > 0.5) {
      recommendations.push('⏰ Scammers create false urgency - take time to think');
    }

    if (riskFactors.authority > 0.5) {
      recommendations.push('🏛️ Government agencies and companies don\'t call without prior notice');
    }

    if (riskFactors.financial > 0.5) {
      recommendations.push('💰 Never give financial information to unsolicited callers');
    }

    if (riskFactors.personal > 0.5) {
      recommendations.push('🔒 NEVER share personal information like SSN or passwords');
    }

    if (riskFactors.pressure > 0.5) {
      recommendations.push('⚠️ Legitimate callers don\'t threaten or pressure you');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Continue conversation but stay alert for warning signs');
      recommendations.push('📝 Write down what they\'re saying for reference');
    }

    return recommendations;
  }

  private fallbackAnalysis(text: string): VoiceAnalysisResult {
    const lowerText = text.toLowerCase();
    
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
      confidence: 0.7,
      voiceMetrics: {
        speechRate: 150,
        pauseFrequency: 0.3,
        stressLevel: scamProbability * 0.8,
        emotionalTone: scamProbability > 0.6 ? 'aggressive' : 'neutral'
      }
    };
  }

  public stopVoiceAnalysis(): void {
    this.isListening = false;
    
    if (this.recognition) {
      this.recognition.stop();
    }
    
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
  }

  public async analyzeAudioFile(audioBlob: Blob): Promise<VoiceAnalysisResult> {
    try {
      const result = await this.hf.automaticSpeechRecognition({
        model: 'openai/whisper-small',
        data: audioBlob
      });

      const transcript = typeof result === 'object' && 'text' in result ? result.text : '';
      return await this.performAdvancedAnalysis(transcript, transcript, Date.now(), transcript.split(' ').length, 0);
    } catch (error) {
      console.error('Audio analysis error:', error);
      throw new Error('Failed to analyze audio');
    }
  }

  public isSupported(): boolean {
    return !!(typeof window !== 'undefined' && (window.SpeechRecognition || (window as any).webkitSpeechRecognition));
  }

  public getAudioSupport(): boolean {
    return !!(typeof window !== 'undefined' && window.AudioContext && navigator.mediaDevices);
  }
}

// Global voice AI service instance
export const voiceAI = new VoiceAIService({
  model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
  sensitivity: 0.75,
  realTimeProcessing: true
});
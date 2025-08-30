export interface CallData {
  id: string;
  phoneNumber: string;
  startTime: Date;
  duration: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  transcript: string[];
  scamIndicators: ScamIndicator[];
  sentiment: SentimentAnalysis;
}

export interface ScamIndicator {
  id: string;
  type: 'urgency' | 'money_request' | 'personal_info' | 'authority_claim' | 'pressure_tactic';
  phrase: string;
  confidence: number;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface SentimentAnalysis {
  overall: 'positive' | 'neutral' | 'negative' | 'aggressive';
  confidence: number;
  emotions: {
    anger: number;
    fear: number;
    urgency: number;
    manipulation: number;
  };
}

export interface Alert {
  id: string;
  type: 'scam_detected' | 'high_risk' | 'suspicious_activity' | 'emergency';
  title: string;
  message: string;
  timestamp: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  callId?: string;
  isRead: boolean;
  actions?: AlertAction[];
}

export interface AlertAction {
  id: string;
  label: string;
  type: 'hang_up' | 'notify_contact' | 'record' | 'escalate';
  variant: 'primary' | 'secondary' | 'danger';
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface VoiceAnalysis {
  isProcessing: boolean;
  currentPhrase: string;
  riskScore: number;
  detectedPatterns: string[];
  recommendations: string[];
}
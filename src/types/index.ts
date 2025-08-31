export interface CallData {
  id: string;
  phoneNumber: string;
  callerName?: string;
  startTime: Date;
  duration: number;
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  transcript: string[];
  scamIndicators: ScamIndicator[];
  sentiment: SentimentAnalysis;
  isRecorded: boolean;
  location?: string;
}

export interface ScamIndicator {
  id: string;
  type: 'urgency' | 'money_request' | 'personal_info' | 'authority_claim' | 'pressure_tactic' | 'tech_support' | 'prize_scam';
  phrase: string;
  confidence: number;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: string;
  recommendation: string;
}

export interface SentimentAnalysis {
  overall: 'positive' | 'neutral' | 'negative' | 'aggressive' | 'threatening';
  confidence: number;
  emotions: {
    anger: number;
    fear: number;
    urgency: number;
    manipulation: number;
    deception: number;
  };
  voiceStress: number;
}

export interface Alert {
  id: string;
  type: 'scam_detected' | 'high_risk' | 'suspicious_activity' | 'emergency' | 'safe_call' | 'blocked_call';
  title: string;
  message: string;
  timestamp: Date;
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  callId?: string;
  isRead: boolean;
  actions?: AlertAction[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  autoResolved?: boolean;
}

export interface AlertAction {
  id: string;
  label: string;
  type: 'hang_up' | 'notify_contact' | 'record' | 'escalate' | 'block_number' | 'report_scam';
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  description: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  emergencyContact: boolean;
  preferredContactMethod: 'phone' | 'email' | 'both';
  timezone?: string;
  notes?: string;
}

export interface VoiceAnalysis {
  isProcessing: boolean;
  currentPhrase: string;
  riskScore: number;
  detectedPatterns: string[];
  recommendations: string[];
  confidence: number;
  processingTime: number;
}

export interface UserSettings {
  sensitivity: number;
  autoHangup: boolean;
  notifyContacts: boolean;
  recordCalls: boolean;
  voiceAlerts: boolean;
  realTimeAnalysis: boolean;
  emergencyMode: boolean;
  language: string;
  timezone: string;
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  simplifiedInterface: boolean;
  autoBlockKnownScams: boolean;
  weeklyReports: boolean;
}

export interface SystemStatus {
  isOnline: boolean;
  lastUpdate: Date;
  version: string;
  uptime: number;
  callsProcessed: number;
  threatsBlocked: number;
}
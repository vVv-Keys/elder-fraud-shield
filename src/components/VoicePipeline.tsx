import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff, AlertTriangle, Shield, Volume2, Play, Pause } from 'lucide-react';
import { CallData, Alert, VoiceAnalysis } from '../types';
import RealTimeAnalysis from './RealTimeAnalysis';
import ScamIndicators from './ScamIndicators';

interface VoicePipelineProps {
  onCallStart: (callData: CallData) => void;
  onCallEnd: () => void;
  onNewAlert: (alert: Alert) => void;
  isCallActive: boolean;
  currentCall: CallData | null;
  highContrast: boolean;
}

const VoicePipeline: React.FC<VoicePipelineProps> = ({
  onCallStart,
  onCallEnd,
  onNewAlert,
  isCallActive,
  currentCall,
  highContrast
}) => {
  const [isListening, setIsListening] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysis>({
    isProcessing: false,
    currentPhrase: '',
    riskScore: 0,
    detectedPatterns: [],
    recommendations: [],
    confidence: 0,
    processingTime: 0
  });

  // Update call duration
  useEffect(() => {
    if (!isCallActive) return;

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  // Reset duration when call ends
  useEffect(() => {
    if (!isCallActive) {
      setCallDuration(0);
    }
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate incoming call with realistic scam scenarios
  const simulateIncomingCall = () => {
    const scamScenarios = [
      {
        number: '+1 (555) 000-1234',
        name: 'Unknown Caller',
        riskLevel: 'high' as const,
        scenario: 'IRS Tax Scam'
      },
      {
        number: '+1 (800) 123-4567',
        name: 'Microsoft Support',
        riskLevel: 'critical' as const,
        scenario: 'Tech Support Scam'
      },
      {
        number: '+1 (555) 999-0000',
        name: 'Bank Security',
        riskLevel: 'medium' as const,
        scenario: 'Bank Fraud Alert'
      }
    ];

    const scenario = scamScenarios[Math.floor(Math.random() * scamScenarios.length)];
    
    const mockCall: CallData = {
      id: `call-${Date.now()}`,
      phoneNumber: scenario.number,
      callerName: scenario.name,
      startTime: new Date(),
      duration: 0,
      riskLevel: scenario.riskLevel,
      transcript: [],
      scamIndicators: [],
      sentiment: {
        overall: 'neutral',
        confidence: 0.7,
        emotions: {
          anger: 0.1,
          fear: 0.2,
          urgency: 0.3,
          manipulation: 0.1,
          deception: 0.2
        },
        voiceStress: 0.3
      },
      isRecorded: true
    };
    
    onCallStart(mockCall);
    setIsListening(true);
    
    // Simulate progressive scam detection
    setTimeout(() => {
      const alert: Alert = {
        id: `alert-${Date.now()}`,
        type: 'scam_detected',
        title: `⚠️ SCAM ALERT: ${scenario.scenario}`,
        message: `This caller is using known scam tactics. They may try to pressure you or ask for personal information. DO NOT give them any information.`,
        timestamp: new Date(),
        riskLevel: scenario.riskLevel,
        callId: mockCall.id,
        isRead: false,
        priority: scenario.riskLevel === 'critical' ? 'urgent' : 'high',
        actions: [
          { 
            id: '1', 
            label: '🛑 HANG UP NOW', 
            type: 'hang_up', 
            variant: 'danger',
            description: 'Immediately end this dangerous call'
          },
          { 
            id: '2', 
            label: '📞 Call Sarah', 
            type: 'notify_contact', 
            variant: 'primary',
            description: 'Notify your daughter about this threat'
          },
          { 
            id: '3', 
            label: '📝 Report Scam', 
            type: 'report_scam', 
            variant: 'secondary',
            description: 'Report this number to authorities'
          }
        ]
      };
      onNewAlert(alert);
    }, 3000);
  };

  const simulateSpecificScam = (type: 'irs' | 'tech' | 'bank') => {
    const scenarios = {
      irs: {
        number: '+1 (202) 555-0123',
        name: 'IRS Tax Division',
        riskLevel: 'critical' as const,
        scenario: 'IRS Tax Scam'
      },
      tech: {
        number: '+1 (800) 555-0199',
        name: 'Microsoft Support',
        riskLevel: 'critical' as const,
        scenario: 'Tech Support Scam'
      },
      bank: {
        number: '+1 (555) 555-0187',
        name: 'Bank Security',
        riskLevel: 'high' as const,
        scenario: 'Bank Fraud Alert'
      }
    };

    const scenario = scenarios[type];
    
    const mockCall: CallData = {
      id: `call-${Date.now()}`,
      phoneNumber: scenario.number,
      callerName: scenario.name,
      startTime: new Date(),
      duration: 0,
      riskLevel: scenario.riskLevel,
      transcript: [],
      scamIndicators: [],
      sentiment: {
        overall: 'negative',
        confidence: 0.8,
        emotions: {
          anger: 0.2,
          fear: 0.4,
          urgency: 0.7,
          manipulation: 0.6,
          deception: 0.8
        },
        voiceStress: 0.6
      },
      isRecorded: true
    };
    
    onCallStart(mockCall);
    setIsListening(true);
    
    // Simulate immediate high-risk detection
    setTimeout(() => {
      const alert: Alert = {
        id: `alert-${Date.now()}`,
        type: 'scam_detected',
        title: `🚨 DANGER: ${scenario.scenario} Detected`,
        message: `This is a dangerous scam call. The caller is trying to trick you. DO NOT give them any information. Hang up immediately.`,
        timestamp: new Date(),
        riskLevel: scenario.riskLevel,
        callId: mockCall.id,
        isRead: false,
        priority: 'urgent',
        actions: [
          { 
            id: '1', 
            label: '🛑 HANG UP RIGHT NOW', 
            type: 'hang_up', 
            variant: 'danger',
            description: 'End this dangerous call immediately'
          },
          { 
            id: '2', 
            label: '📞 Call My Family', 
            type: 'notify_contact', 
            variant: 'primary',
            description: 'Let your family know about this threat'
          }
        ]
      };
      onNewAlert(alert);
    }, 2000);
  };

  const handleEndCall = () => {
    onCallEnd();
    setIsListening(false);
    setVoiceAnalysis({
      isProcessing: false,
      currentPhrase: '',
      riskScore: 0,
      detectedPatterns: [],
      recommendations: [],
      confidence: 0,
      processingTime: 0
    });
  };

  // Enhanced real-time voice analysis simulation
  useEffect(() => {
    if (!isCallActive) return;

    const interval = setInterval(() => {
      const scamPhrases = [
        "This is your final notice from the IRS...",
        "Your computer has been infected with a virus...",
        "You've won a $1000 gift card, but we need your credit card...",
        "Your social security number has been suspended...",
        "This is Microsoft support, we detected suspicious activity...",
        "You need to wire money immediately to avoid arrest...",
        "Don't hang up or you'll be arrested...",
        "We need to verify your bank account information..."
      ];
      
      const patterns = [
        "🚨 Urgency pressure tactics",
        "👮 False authority claims",
        "💳 Personal information requests",
        "💰 Financial demands",
        "🤐 Secrecy requirements",
        "💻 Tech support impersonation",
        "🏆 Prize/lottery scams"
      ];

      const recommendations = [
        "🛑 Consider hanging up immediately",
        "❓ Ask for their name and company",
        "📞 Say you'll call them back",
        "🔍 Verify with official sources",
        "🚫 Never give personal information",
        "👥 Ask a family member for advice",
        "📝 Write down what they're saying"
      ];

      const riskScore = Math.min(100, Math.random() * 85 + 15);
      
      setVoiceAnalysis({
        isProcessing: true,
        currentPhrase: scamPhrases[Math.floor(Math.random() * scamPhrases.length)],
        riskScore,
        detectedPatterns: patterns.slice(0, Math.floor(Math.random() * 4) + 1),
        recommendations: recommendations.slice(0, Math.floor(Math.random() * 3) + 2),
        confidence: Math.random() * 0.3 + 0.7,
        processingTime: Math.random() * 2 + 0.5
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  return (
    <div className="space-y-8">
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-xl border overflow-hidden`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Volume2 className="w-8 h-8" />
            <span>Phone Call Monitor</span>
          </h2>
          <p className="text-blue-100 mt-2 text-lg">
            AI is listening and protecting you from scam calls
          </p>
        </div>
        
        <div className="p-8">
          {!isCallActive ? (
            <div className="text-center py-16">
              <div className={`w-32 h-32 ${highContrast ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                <Phone className={`w-16 h-16 ${highContrast ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-4`}>
                Ready to Protect You
              </h3>
              <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} mb-8 text-lg max-w-md mx-auto`}>
                ScamGuard is actively monitoring for incoming calls. When a call comes in, 
                our AI will analyze it in real-time to keep you safe.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={simulateIncomingCall}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  🎭 Try Demo Call
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => simulateSpecificScam('irs')}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    📋 IRS Tax Scam
                  </button>
                  <button
                    onClick={() => simulateSpecificScam('tech')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    💻 Tech Support
                  </button>
                  <button
                    onClick={() => simulateSpecificScam('bank')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    🏦 Bank Fraud
                  </button>
                </div>
                <p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Test how ScamGuard protects you
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Call Status Header */}
              <div className={`p-6 rounded-xl border-2 ${
                currentCall?.riskLevel === 'critical' ? 'bg-red-50 border-red-300' :
                currentCall?.riskLevel === 'high' ? 'bg-orange-50 border-orange-300' :
                'bg-blue-50 border-blue-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className={`text-xl font-bold ${
                        currentCall?.riskLevel === 'critical' ? 'text-red-900' :
                        currentCall?.riskLevel === 'high' ? 'text-orange-900' :
                        'text-blue-900'
                      }`}>
                        📞 ACTIVE CALL
                      </p>
                      <p className={`text-lg ${
                        currentCall?.riskLevel === 'critical' ? 'text-red-700' :
                        currentCall?.riskLevel === 'high' ? 'text-orange-700' :
                        'text-blue-700'
                      }`}>
                        {currentCall?.phoneNumber} • {currentCall?.callerName}
                      </p>
                      <p className={`text-sm ${
                        currentCall?.riskLevel === 'critical' ? 'text-red-600' :
                        currentCall?.riskLevel === 'high' ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        Duration: {formatDuration(callDuration)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleEndCall}
                    data-hangup-button
                    className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl transition-colors shadow-lg text-lg font-bold"
                  >
                    <PhoneOff className="w-6 h-6" />
                    <span>END CALL</span>
                  </button>
                </div>
              </div>

              {/* Real-time Analysis */}
              <RealTimeAnalysis analysis={voiceAnalysis} highContrast={highContrast} />
              
              {/* Scam Indicators */}
              <ScamIndicators callData={currentCall} highContrast={highContrast} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoicePipeline;
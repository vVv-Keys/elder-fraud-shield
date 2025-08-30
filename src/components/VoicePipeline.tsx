import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Phone, PhoneOff, AlertTriangle, Shield, Volume2 } from 'lucide-react';
import { CallData, Alert, VoiceAnalysis } from '../types';
import RealTimeAnalysis from './RealTimeAnalysis';
import ScamIndicators from './ScamIndicators';

interface VoicePipelineProps {
  onCallStart: (callData: CallData) => void;
  onCallEnd: () => void;
  onNewAlert: (alert: Alert) => void;
  isCallActive: boolean;
  currentCall: CallData | null;
}

const VoicePipeline: React.FC<VoicePipelineProps> = ({
  onCallStart,
  onCallEnd,
  onNewAlert,
  isCallActive,
  currentCall
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceAnalysis>({
    isProcessing: false,
    currentPhrase: '',
    riskScore: 0,
    detectedPatterns: [],
    recommendations: []
  });

  // Simulate incoming call
  const simulateIncomingCall = () => {
    const mockCall: CallData = {
      id: `call-${Date.now()}`,
      phoneNumber: '+1 (555) 000-1234',
      startTime: new Date(),
      duration: 0,
      riskLevel: 'low',
      transcript: [],
      scamIndicators: [],
      sentiment: {
        overall: 'neutral',
        confidence: 0.7,
        emotions: {
          anger: 0.1,
          fear: 0.2,
          urgency: 0.3,
          manipulation: 0.1
        }
      }
    };
    
    onCallStart(mockCall);
    setIsListening(true);
    
    // Simulate scam detection after a few seconds
    setTimeout(() => {
      const alert: Alert = {
        id: `alert-${Date.now()}`,
        type: 'scam_detected',
        title: 'Potential Scam Detected',
        message: 'The caller is using high-pressure tactics and requesting personal information.',
        timestamp: new Date(),
        riskLevel: 'high',
        callId: mockCall.id,
        isRead: false,
        actions: [
          { id: '1', label: 'Hang Up', type: 'hang_up', variant: 'danger' },
          { id: '2', label: 'Notify Sarah', type: 'notify_contact', variant: 'primary' },
          { id: '3', label: 'Record Call', type: 'record', variant: 'secondary' }
        ]
      };
      onNewAlert(alert);
    }, 3000);
  };

  const handleEndCall = () => {
    onCallEnd();
    setIsListening(false);
    setVoiceAnalysis({
      isProcessing: false,
      currentPhrase: '',
      riskScore: 0,
      detectedPatterns: [],
      recommendations: []
    });
  };

  // Simulate real-time voice analysis
  useEffect(() => {
    if (!isCallActive) return;

    const interval = setInterval(() => {
      const phrases = [
        "This is your final notice...",
        "You need to act immediately...",
        "Your account will be closed...",
        "Provide your social security number...",
        "Wire money to this account...",
        "Don't tell anyone about this call..."
      ];
      
      const patterns = [
        "Urgency pressure",
        "Authority impersonation",
        "Personal info request",
        "Financial demand",
        "Secrecy request"
      ];

      const recommendations = [
        "Ask for caller's name and company",
        "Request to call them back",
        "Verify with official sources",
        "Never give personal information",
        "Hang up if pressured"
      ];

      setVoiceAnalysis({
        isProcessing: true,
        currentPhrase: phrases[Math.floor(Math.random() * phrases.length)],
        riskScore: Math.min(100, Math.random() * 85 + 15),
        detectedPatterns: patterns.slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: recommendations.slice(0, Math.floor(Math.random() * 3) + 2)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isCallActive]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Volume2 className="w-6 h-6" />
            <span>Real-Time Voice Monitor</span>
          </h2>
          <p className="text-blue-100 mt-1">AI-powered scam detection for incoming calls</p>
        </div>
        
        <div className="p-6">
          {!isCallActive ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Waiting for Calls</h3>
              <p className="text-gray-600 mb-6">ScamGuard is actively monitoring for incoming calls</p>
              
              <button
                onClick={simulateIncomingCall}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Simulate Incoming Call
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Call Status */}
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-semibold text-red-900">Active Call</p>
                    <p className="text-sm text-red-700">{currentCall?.phoneNumber}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleEndCall}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              </div>

              {/* Real-time Analysis */}
              <RealTimeAnalysis analysis={voiceAnalysis} />
              
              {/* Scam Indicators */}
              <ScamIndicators callData={currentCall} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoicePipeline;
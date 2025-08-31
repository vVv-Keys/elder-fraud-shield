import React from 'react';
import { AlertTriangle, DollarSign, User, Clock, Shield, Laptop, Gift } from 'lucide-react';
import { CallData } from '../types';

interface ScamIndicatorsProps {
  callData: CallData | null;
  highContrast: boolean;
}

const ScamIndicators: React.FC<ScamIndicatorsProps> = ({ callData, highContrast }) => {
  const getIndicatorIcon = (type: string) => {
    switch (type) {
      case 'money_request': return DollarSign;
      case 'personal_info': return User;
      case 'urgency': return Clock;
      case 'authority_claim': return Shield;
      case 'tech_support': return Laptop;
      case 'prize_scam': return Gift;
      default: return AlertTriangle;
    }
  };

  const getIndicatorColor = (severity: string) => {
    if (highContrast) {
      switch (severity) {
        case 'critical': return 'bg-red-900 border-red-600 text-red-200';
        case 'high': return 'bg-red-900 border-red-700 text-red-300';
        case 'medium': return 'bg-orange-900 border-orange-700 text-orange-300';
        default: return 'bg-yellow-900 border-yellow-700 text-yellow-300';
      }
    }
    
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-300 text-red-900';
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      default: return '⚠️';
    }
  };

  // Enhanced mock indicators for demonstration
  const mockIndicators = [
    {
      id: '1',
      type: 'urgency',
      phrase: 'You must act immediately or your account will be closed forever',
      confidence: 0.95,
      timestamp: new Date(),
      severity: 'critical' as const,
      context: 'Caller is creating false urgency to pressure you',
      recommendation: 'Legitimate companies give you time to think. Hang up now.'
    },
    {
      id: '2',
      type: 'personal_info',
      phrase: 'Can you confirm your social security number for verification?',
      confidence: 0.92,
      timestamp: new Date(),
      severity: 'high' as const,
      context: 'Requesting sensitive personal information',
      recommendation: 'Never give your SSN over the phone to unsolicited callers.'
    },
    {
      id: '3',
      type: 'authority_claim',
      phrase: 'This is the IRS calling about your unpaid taxes',
      confidence: 0.88,
      timestamp: new Date(),
      severity: 'high' as const,
      context: 'Impersonating government agency',
      recommendation: 'The IRS never calls without sending letters first.'
    }
  ];

  const indicators = callData?.scamIndicators || (callData ? mockIndicators : []);

  return (
    <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <AlertTriangle className="w-7 h-7 text-red-600" />
        <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
          Scam Warning Signs
        </h3>
        {indicators.length > 0 && (
          <span className="bg-red-600 text-white text-lg font-bold px-4 py-2 rounded-full">
            {indicators.length} DETECTED
          </span>
        )}
      </div>
      
      <div className="space-y-6">
        {indicators.map((indicator) => {
          const Icon = getIndicatorIcon(indicator.type);
          return (
            <div
              key={indicator.id}
              className={`p-6 rounded-xl border-2 ${getIndicatorColor(indicator.severity)} shadow-md`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{getSeverityEmoji(indicator.severity)}</span>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg uppercase tracking-wide">
                      {indicator.type.replace('_', ' ')} DETECTED
                    </span>
                    <span className="text-lg font-bold">
                      {Math.round(indicator.confidence * 100)}% SURE
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-base mb-1">What they said:</p>
                      <p className="text-lg font-medium italic">"{indicator.phrase}"</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-base mb-1">Why this is suspicious:</p>
                      <p className="text-lg">{indicator.context}</p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${
                      highContrast ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'
                    } border`}>
                      <p className="font-semibold text-base mb-1">💡 What you should do:</p>
                      <p className={`text-lg font-medium ${highContrast ? 'text-blue-200' : 'text-blue-800'}`}>
                        {indicator.recommendation}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`text-sm mt-3 ${highContrast ? 'text-gray-400' : 'text-gray-600'}`}>
                    Detected at {indicator.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {indicators.length === 0 && (
          <div className="text-center py-12">
            <Shield className={`w-20 h-20 ${highContrast ? 'text-green-400' : 'text-green-500'} mx-auto mb-6`} />
            <h4 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-2`}>
              ✅ No Scam Signs Detected
            </h4>
            <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              This call appears to be safe so far
            </p>
            <p className={`${highContrast ? 'text-gray-400' : 'text-gray-500'} text-base mt-2`}>
              We're still monitoring and will alert you if anything changes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamIndicators;
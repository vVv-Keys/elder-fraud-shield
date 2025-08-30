import React from 'react';
import { AlertTriangle, DollarSign, User, Clock, Shield } from 'lucide-react';
import { CallData } from '../types';

interface ScamIndicatorsProps {
  callData: CallData | null;
}

const ScamIndicators: React.FC<ScamIndicatorsProps> = ({ callData }) => {
  const getIndicatorIcon = (type: string) => {
    switch (type) {
      case 'money_request': return DollarSign;
      case 'personal_info': return User;
      case 'urgency': return Clock;
      case 'authority_claim': return Shield;
      default: return AlertTriangle;
    }
  };

  const getIndicatorColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  // Mock indicators for demonstration
  const mockIndicators = [
    {
      id: '1',
      type: 'urgency',
      phrase: 'You must act immediately or your account will be closed',
      confidence: 0.92,
      timestamp: new Date(),
      severity: 'high' as const
    },
    {
      id: '2',
      type: 'personal_info',
      phrase: 'Can you confirm your social security number?',
      confidence: 0.88,
      timestamp: new Date(),
      severity: 'high' as const
    },
    {
      id: '3',
      type: 'authority_claim',
      phrase: 'This is the IRS calling about your taxes',
      confidence: 0.85,
      timestamp: new Date(),
      severity: 'medium' as const
    }
  ];

  const indicators = callData?.scamIndicators || (callData ? mockIndicators : []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-gray-900">Scam Indicators</h3>
        {indicators.length > 0 && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
            {indicators.length} detected
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {indicators.map((indicator) => {
          const Icon = getIndicatorIcon(indicator.type);
          return (
            <div
              key={indicator.id}
              className={`p-4 rounded-lg border ${getIndicatorColor(indicator.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm uppercase tracking-wide">
                      {indicator.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-medium">
                      {Math.round(indicator.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">"{indicator.phrase}"</p>
                  <p className="text-xs opacity-75">
                    Detected at {indicator.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {indicators.length === 0 && (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">No scam indicators detected</p>
            <p className="text-sm text-gray-500">Call appears safe so far</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScamIndicators;
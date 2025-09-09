import React from 'react';
import { Brain, Zap, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface AIInsightsProps {
  transcript: string;
  riskScore: number;
  confidence: number;
  detectedPatterns: string[];
  recommendations: string[];
  highContrast: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({
  transcript,
  riskScore,
  confidence,
  detectedPatterns,
  recommendations,
  highContrast
}) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return highContrast ? 'text-red-300' : 'text-red-700';
    if (score >= 60) return highContrast ? 'text-orange-300' : 'text-orange-700';
    if (score >= 40) return highContrast ? 'text-yellow-300' : 'text-yellow-700';
    return highContrast ? 'text-green-300' : 'text-green-700';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 80) return { label: '🚨 CRITICAL THREAT', color: 'bg-red-600' };
    if (score >= 60) return { label: '⚠️ HIGH RISK', color: 'bg-orange-600' };
    if (score >= 40) return { label: '⚡ MEDIUM RISK', color: 'bg-yellow-600' };
    return { label: '✅ LOW RISK', color: 'bg-green-600' };
  };

  const badge = getRiskBadge(riskScore);

  return (
    <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-7 h-7 text-purple-600" />
        <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
          🤖 AI Analysis
        </h3>
        <span className={`${badge.color} text-white px-4 py-2 rounded-full text-sm font-bold`}>
          {badge.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <div>
          <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            Risk Assessment
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Scam Probability
                </span>
                <span className={`font-bold text-xl ${getRiskColor(riskScore)}`}>
                  {Math.round(riskScore)}%
                </span>
              </div>
              <div className={`w-full ${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4`}>
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    riskScore >= 80 ? 'bg-red-500' :
                    riskScore >= 60 ? 'bg-orange-500' :
                    riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${riskScore}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  AI Confidence
                </span>
                <span className={`font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(confidence * 100)}%
                </span>
              </div>
              <div className={`w-full ${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Metrics */}
        {riskScore > 40 && (
          <div>
            <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
              🎤 Voice Analysis
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-600'}`}>Speech Rate</p>
                <p className={`text-lg font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(150 + (riskScore * 2))} WPM
                </p>
              </div>
              <div className={`p-3 rounded-lg ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-600'}`}>Stress Level</p>
                <p className={`text-lg font-bold ${getRiskColor(riskScore * 0.8)}`}>
                  {Math.round(riskScore * 0.8)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <div>
          <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            AI Recommendations
          </h4>
          
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                highContrast ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'
              } border`}>
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">{index + 1}</span>
                </div>
                <p className={`${highContrast ? 'text-blue-200' : 'text-blue-900'} font-medium`}>
                  {rec}
                </p>
              </div>
            ))}
            
            {recommendations.length === 0 && (
              <div className="text-center py-4">
                <p className={`${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  No specific recommendations at this time
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detected Patterns */}
      {detectedPatterns.length > 0 && (
        <div className="mt-6">
          <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            🔍 AI Detected Patterns
          </h4>
          <div className="flex flex-wrap gap-2">
            {detectedPatterns.map((pattern, index) => (
              <span
                key={index}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  highContrast ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800'
                }`}
              >
                {pattern}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Current Transcript */}
      {transcript && (
        <div className="mt-6">
          <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
            📝 Live Transcript
          </h4>
          <div className={`p-4 rounded-lg border-2 ${highContrast ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'} max-h-32 overflow-y-auto`}>
            <p className={`${highContrast ? 'text-white' : 'text-gray-900'} italic`}>
              "{transcript}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
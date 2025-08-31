import React from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Clock, Target } from 'lucide-react';
import { VoiceAnalysis } from '../types';

interface RealTimeAnalysisProps {
  analysis: VoiceAnalysis;
  highContrast: boolean;
}

const RealTimeAnalysis: React.FC<RealTimeAnalysisProps> = ({ analysis, highContrast }) => {
  const getRiskColor = (score: number) => {
    if (highContrast) {
      if (score >= 80) return 'text-red-300 bg-red-900 border-red-700';
      if (score >= 60) return 'text-orange-300 bg-orange-900 border-orange-700';
      if (score >= 40) return 'text-yellow-300 bg-yellow-900 border-yellow-700';
      return 'text-green-300 bg-green-900 border-green-700';
    }
    
    if (score >= 80) return 'text-red-800 bg-red-50 border-red-300';
    if (score >= 60) return 'text-orange-800 bg-orange-50 border-orange-300';
    if (score >= 40) return 'text-yellow-800 bg-yellow-50 border-yellow-300';
    return 'text-green-800 bg-green-50 border-green-300';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return '🚨 DANGER - LIKELY SCAM';
    if (score >= 60) return '⚠️ HIGH RISK';
    if (score >= 40) return '⚡ MEDIUM RISK';
    return '✅ APPEARS SAFE';
  };

  const getRiskBarColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* AI Analysis */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-lg`}>
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="w-7 h-7 text-purple-600" />
          <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            AI is Analyzing
          </h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3 block`}>
              What the caller just said:
            </label>
            <div className={`p-4 rounded-xl border-2 ${highContrast ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
              <p className={`${highContrast ? 'text-white' : 'text-gray-900'} text-lg italic font-medium`}>
                "{analysis.currentPhrase || 'Listening for speech...'}"
              </p>
            </div>
          </div>
          
          <div>
            <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3 block`}>
              Danger Level:
            </label>
            <div className={`p-6 rounded-xl border-2 ${getRiskColor(analysis.riskScore)}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-2xl">{Math.round(analysis.riskScore)}%</span>
                <span className="text-lg font-bold">{getRiskLabel(analysis.riskScore)}</span>
              </div>
              <div className={`w-full ${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4 shadow-inner`}>
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${getRiskBarColor(analysis.riskScore)}`}
                  style={{ width: `${analysis.riskScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-2 font-medium">
                <span>Safe</span>
                <span>Dangerous</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Target className={`w-4 h-4 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={highContrast ? 'text-gray-300' : 'text-gray-600'}>
                Confidence: {Math.round(analysis.confidence * 100)}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={highContrast ? 'text-gray-300' : 'text-gray-600'}>
                Analysis: {analysis.processingTime.toFixed(1)}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Recommendations */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-lg`}>
        <div className="flex items-center space-x-3 mb-6">
          <CheckCircle className="w-7 h-7 text-green-600" />
          <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            What You Should Do
          </h3>
        </div>
        
        <div className="space-y-4">
          {analysis.recommendations.map((recommendation, index) => (
            <div key={index} className={`flex items-start space-x-4 p-4 rounded-xl border-2 ${
              highContrast ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className={`${highContrast ? 'text-blue-200' : 'text-blue-900'} font-semibold text-lg leading-relaxed`}>
                {recommendation}
              </p>
            </div>
          ))}
          
          {analysis.recommendations.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className={`w-16 h-16 ${highContrast ? 'text-green-400' : 'text-green-500'} mx-auto mb-4`} />
              <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
                No immediate action needed
              </p>
              <p className={`${highContrast ? 'text-gray-400' : 'text-gray-500'} text-base`}>
                Continue your conversation normally
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detected Patterns */}
      <div className={`xl:col-span-2 ${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-lg`}>
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-7 h-7 text-orange-600" />
          <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Warning Signs Detected
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {analysis.detectedPatterns.map((pattern, index) => (
            <div
              key={index}
              className={`inline-flex items-center space-x-3 px-6 py-3 rounded-xl text-lg font-semibold border-2 ${
                highContrast ? 'bg-orange-900 border-orange-700 text-orange-200' : 'bg-orange-100 border-orange-300 text-orange-800'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              <span>{pattern}</span>
            </div>
          ))}
          
          {analysis.detectedPatterns.length === 0 && (
            <div className="w-full text-center py-8">
              <Shield className={`w-16 h-16 ${highContrast ? 'text-green-400' : 'text-green-500'} mx-auto mb-4`} />
              <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg font-medium`}>
                No warning signs detected so far
              </p>
              <p className={`${highContrast ? 'text-gray-400' : 'text-gray-500'} text-base`}>
                This call appears to be safe
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalysis;
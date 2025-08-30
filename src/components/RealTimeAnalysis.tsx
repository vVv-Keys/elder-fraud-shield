import React from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { VoiceAnalysis } from '../types';

interface RealTimeAnalysisProps {
  analysis: VoiceAnalysis;
}

const RealTimeAnalysis: React.FC<RealTimeAnalysisProps> = ({ analysis }) => {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'CRITICAL RISK';
    if (score >= 60) return 'HIGH RISK';
    if (score >= 40) return 'MEDIUM RISK';
    return 'LOW RISK';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* AI Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">AI Analysis</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Current Phrase</label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-900 italic">
                {analysis.currentPhrase || 'Listening...'}
              </p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Risk Score</label>
            <div className={`p-4 rounded-lg border ${getRiskColor(analysis.riskScore)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">{Math.round(analysis.riskScore)}%</span>
                <span className="text-sm font-semibold">{getRiskLabel(analysis.riskScore)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    analysis.riskScore >= 80 ? 'bg-red-500' :
                    analysis.riskScore >= 60 ? 'bg-orange-500' :
                    analysis.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${analysis.riskScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Recommendations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Live Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          {analysis.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-blue-900 font-medium">{recommendation}</p>
            </div>
          ))}
          
          {analysis.recommendations.length === 0 && (
            <p className="text-gray-500 text-sm italic">No specific recommendations at this time</p>
          )}
        </div>
      </div>

      {/* Detected Patterns */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-gray-900">Detected Patterns</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {analysis.detectedPatterns.map((pattern, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
            >
              <AlertCircle className="w-3 h-3" />
              <span>{pattern}</span>
            </span>
          ))}
          
          {analysis.detectedPatterns.length === 0 && (
            <p className="text-gray-500 text-sm italic">No suspicious patterns detected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalysis;
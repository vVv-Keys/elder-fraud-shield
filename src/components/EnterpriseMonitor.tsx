import React, { useState, useEffect } from 'react';
import { Activity, Users, Shield, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Globe } from 'lucide-react';
import { enterpriseAPI } from '../services/enterpriseAPI';

interface EnterpriseMonitorProps {
  highContrast: boolean;
}

const EnterpriseMonitor: React.FC<EnterpriseMonitorProps> = ({ highContrast }) => {
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    threatsBlocked: 3456,
    systemUptime: 99.9,
    avgResponseTime: 1.2,
    protectionRate: 94.7
  });

  const [threatIntelligence, setThreatIntelligence] = useState<any>(null);

  useEffect(() => {
    const loadThreatIntelligence = async () => {
      try {
        const intel = await enterpriseAPI.getThreatIntelligence();
        setThreatIntelligence(intel);
      } catch (error) {
        console.error('Failed to load threat intelligence:', error);
      }
    };

    loadThreatIntelligence();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
          Enterprise Command Center
        </h2>
        <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
          Real-time system monitoring and threat intelligence
        </p>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {systemStats.activeUsers.toLocaleString()}
              </p>
              <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Active Users
              </p>
            </div>
          </div>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {systemStats.threatsBlocked.toLocaleString()}
              </p>
              <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Threats Blocked
              </p>
            </div>
          </div>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {systemStats.systemUptime}%
              </p>
              <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                System Uptime
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Intelligence */}
      {threatIntelligence && (
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-lg border`}>
          <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
            🧠 AI Threat Intelligence
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                Emerging Threats
              </h4>
              <div className="space-y-4">
                {threatIntelligence.emergingThreats.map((threat: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    threat.severity === 'critical' ? 'bg-red-50 border-red-200' :
                    threat.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}>
                    <h5 className="font-bold text-lg mb-2">{threat.type}</h5>
                    <p className="text-base mb-2">{threat.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {threat.indicators.map((indicator: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-gray-200 rounded text-sm">
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                Protection Analytics
              </h4>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span>Detection Accuracy</span>
                    <span className="font-bold">{systemStats.protectionRate}%</span>
                  </div>
                  <div className={`w-full ${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${systemStats.protectionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span>Response Time</span>
                    <span className="font-bold">{systemStats.avgResponseTime}s</span>
                  </div>
                  <div className={`w-full ${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseMonitor;
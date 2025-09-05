import React from 'react';
import { BarChart3, TrendingDown, Shield, AlertTriangle, Phone, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Alert } from '../types';

interface DashboardProps {
  alerts: Alert[];
  highContrast: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ alerts, highContrast }) => {
  const stats = {
    totalCalls: 47,
    scamsBlocked: 12,
    safeCalls: 35,
    riskReduction: 89,
    avgResponseTime: 2.3,
    weeklyTrend: '+15%'
  };

  const recentActivity = [
    { 
      time: '2:34 PM', 
      event: '🛑 Scam call blocked', 
      risk: 'high', 
      number: '+1 (555) 000-1234',
      action: 'Auto-blocked and reported'
    },
    { 
      time: '11:22 AM', 
      event: '⚠️ Suspicious activity detected', 
      risk: 'medium', 
      number: '+1 (555) 000-5678',
      action: 'User warned, call continued'
    },
    { 
      time: '9:15 AM', 
      event: '✅ Safe call completed', 
      risk: 'safe', 
      number: '+1 (555) 123-4567',
      action: 'No action needed'
    },
    { 
      time: 'Yesterday', 
      event: '📞 Emergency contact notified', 
      risk: 'high', 
      number: '+1 (555) 000-9999',
      action: 'Sarah was contacted'
    }
  ];

  const weeklyData = [
    { day: 'Monday', calls: 8, scams: 2, safe: 6 },
    { day: 'Tuesday', calls: 6, scams: 1, safe: 5 },
    { day: 'Wednesday', calls: 9, scams: 3, safe: 6 },
    { day: 'Thursday', calls: 5, scams: 0, safe: 5 },
    { day: 'Friday', calls: 7, scams: 2, safe: 5 },
    { day: 'Saturday', calls: 4, scams: 1, safe: 3 },
    { day: 'Sunday', calls: 8, scams: 3, safe: 5 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Your Protection Report
          </h2>
          <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
            See how ScamGuard has been protecting you
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-blue-100 rounded-xl shadow-sm">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Calls
              </p>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.totalCalls}
              </p>
            </div>
          </div>
          <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
            This month
          </p>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-red-100 rounded-xl shadow-sm">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <p className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Scams Blocked
              </p>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.scamsBlocked}
              </p>
            </div>
          </div>
          <p className="text-base text-green-600 font-medium">
            +3 from last week
          </p>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-green-100 rounded-xl shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Safe Calls
              </p>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.safeCalls}
              </p>
            </div>
          </div>
          <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
            No threats detected
          </p>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-purple-100 rounded-xl shadow-sm">
              <TrendingDown className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Protection Rate
              </p>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.riskReduction}%
              </p>
            </div>
          </div>
          <p className="text-base text-green-600 font-medium">
            {stats.weeklyTrend} improvement
          </p>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              This Week's Activity
            </h3>
          </div>
          
          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                    {day.day}
                  </span>
                  <span className={`text-lg font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                    {day.calls} calls
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex-1 ${highContrast ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4 overflow-hidden`}>
                    <div className="flex h-full">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${(day.safe / day.calls) * 100}%` }}
                      ></div>
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${(day.scams / day.calls) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-medium">
                    <span className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className={highContrast ? 'text-gray-300' : 'text-gray-600'}>
                        {day.safe} safe
                      </span>
                    </span>
                    {day.scams > 0 && (
                      <span className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className={highContrast ? 'text-gray-300' : 'text-gray-600'}>
                          {day.scams} blocked
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
            Recent Activity
          </h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className={`p-4 rounded-xl border ${
                highContrast ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              } transition-colors`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                    activity.risk === 'high' ? 'bg-red-500' :
                    activity.risk === 'medium' ? 'bg-orange-500' : 
                    activity.risk === 'safe' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className={`text-lg font-semibold ${highContrast ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {activity.event}
                    </p>
                    <p className={`text-base ${highContrast ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                      {activity.number}
                    </p>
                    <p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.action}
                    </p>
                  </div>
                  <span className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protection Summary */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
        <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
          Protection Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
            <h4 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-2`}>
              {stats.riskReduction >= 90 ? 'Excellent Protection' : 
               stats.riskReduction >= 75 ? 'Good Protection' : 'Basic Protection'}
            </h4>
            <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              {stats.riskReduction}% of threats successfully blocked
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-blue-600" />
            </div>
            <h4 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-2`}>
              Fast Detection
            </h4>
            <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              Threats detected in {stats.avgResponseTime} seconds
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
              <TrendingDown className="w-12 h-12 text-purple-600" />
            </div>
            <h4 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-2`}>
              Improving Safety
            </h4>
            <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              {stats.weeklyTrend} better than last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
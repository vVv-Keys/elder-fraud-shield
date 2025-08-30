import React from 'react';
import { BarChart3, TrendingDown, Shield, AlertTriangle, Phone, Clock } from 'lucide-react';
import { Alert } from '../types';

interface DashboardProps {
  alerts: Alert[];
}

const Dashboard: React.FC<DashboardProps> = ({ alerts }) => {
  const stats = {
    totalCalls: 47,
    scamsBlocked: 12,
    riskReduction: 89,
    avgResponseTime: 2.3
  };

  const recentActivity = [
    { time: '2:34 PM', event: 'Scam call blocked', risk: 'high', number: '+1 (555) 000-1234' },
    { time: '11:22 AM', event: 'Suspicious activity detected', risk: 'medium', number: '+1 (555) 000-5678' },
    { time: '9:15 AM', event: 'Safe call completed', risk: 'low', number: '+1 (555) 123-4567' },
    { time: 'Yesterday', event: 'Contact notification sent', risk: 'high', number: '+1 (555) 000-9999' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Protection Dashboard</h2>
          <p className="text-gray-600">Overview of your call security and protection metrics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCalls}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Scams Blocked</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scamsBlocked}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Reduction</p>
              <p className="text-2xl font-bold text-gray-900">{stats.riskReduction}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Weekly Protection Summary</h3>
          </div>
          
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const calls = Math.floor(Math.random() * 8) + 2;
              const scams = Math.floor(Math.random() * 3);
              return (
                <div key={day} className="flex items-center space-x-4">
                  <span className="w-8 text-sm font-medium text-gray-600">{day}</span>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(calls / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{calls} calls</span>
                  </div>
                  {scams > 0 && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      {scams} blocked
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.risk === 'high' ? 'bg-red-500' :
                  activity.risk === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                  <p className="text-xs text-gray-500">{activity.number}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
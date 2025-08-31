import React, { useState } from 'react';
import { AlertTriangle, Phone, Mail, Clock, CheckCircle, X, Shield, TrendingDown } from 'lucide-react';
import { Alert, TrustedContact } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
  trustedContacts: TrustedContact[];
  highContrast: boolean;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, trustedContacts, highContrast }) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const stats = {
    totalCalls: 47,
    scamsBlocked: 12,
    riskReduction: 89,
    avgResponseTime: 2.3
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'scam_detected': return AlertTriangle;
      case 'high_risk': return AlertTriangle;
      case 'emergency': return Phone;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (riskLevel: string) => {
    if (highContrast) {
      switch (riskLevel) {
        case 'critical': return 'bg-red-900 border-red-600 text-red-200';
        case 'high': return 'bg-orange-900 border-orange-600 text-orange-200';
        case 'medium': return 'bg-yellow-900 border-yellow-600 text-yellow-200';
        default: return 'bg-blue-900 border-blue-600 text-blue-200';
      }
    }
    
    switch (riskLevel) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const handleAction = (action: any) => {
    console.log('Executing action:', action);
    // In a real app, this would trigger the actual action
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Safety Alerts
          </h2>
          <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
            Recent warnings and protection updates
          </p>
        </div>
        
        <div className={`flex items-center space-x-4 px-6 py-3 rounded-xl ${
          highContrast ? 'bg-gray-800' : 'bg-blue-50'
        }`}>
          <span className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
            {alerts.filter(a => !a.isRead).length} unread
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-6">
          {alerts.length === 0 ? (
            <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-12 rounded-2xl shadow-lg border text-center`}>
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-4`}>
                ✅ All Clear
              </h3>
              <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
                No safety alerts at this time - you're well protected!
              </p>
            </div>
          ) : (
            alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                    getAlertColor(alert.riskLevel)
                  } ${!alert.isRead ? 'ring-4 ring-blue-300' : ''}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start space-x-4">
                    <Icon className="w-8 h-8 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold">{alert.title}</h4>
                        <span className="text-lg font-bold uppercase px-3 py-1 rounded-full">
                          {alert.riskLevel} risk
                        </span>
                      </div>
                      <p className="text-lg mb-4 leading-relaxed">{alert.message}</p>
                      <div className="flex items-center space-x-6 text-base">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-5 h-5" />
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                        </span>
                        {alert.callId && (
                          <span className="flex items-center space-x-1">
                            <Phone className="w-5 h-5" />
                            <span>Call ID: {alert.callId.slice(-8)}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Alert Details */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg border p-8`}>
          {selectedAlert ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                  Alert Details
                </h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className={`p-2 ${highContrast ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                >
                  <X className={`w-6 h-6 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} block mb-2`}>
                    Alert Type
                  </label>
                  <span className={`inline-block px-4 py-2 rounded-xl text-lg font-bold ${
                    getAlertColor(selectedAlert.riskLevel)
                  }`}>
                    {selectedAlert.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} block mb-2`}>
                    What Happened
                  </label>
                  <p className={`text-lg ${highContrast ? 'text-white' : 'text-gray-900'} leading-relaxed`}>
                    {selectedAlert.message}
                  </p>
                </div>
                
                <div>
                  <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} block mb-2`}>When</label>
                  <p className={`text-lg ${highContrast ? 'text-white' : 'text-gray-900'}`}>{selectedAlert.timestamp.toLocaleString()}</p>
                </div>

                {selectedAlert.actions && (
                  <div>
                    <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} block mb-4`}>
                      What You Can Do
                    </label>
                    <div className="space-y-3">
                      {selectedAlert.actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleAction(action)}
                          className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg ${
                            action.variant === 'danger'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : action.variant === 'primary'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : (highContrast ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900')
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className={`w-20 h-20 ${highContrast ? 'text-gray-500' : 'text-gray-400'} mx-auto mb-6`} />
              <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
                Click on an alert to see more details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-blue-100 rounded-xl">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Calls
              </h4>
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
            <div className="p-4 bg-red-100 rounded-xl">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Scams Blocked
              </h4>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.scamsBlocked}
              </p>
            </div>
          </div>
          <p className="text-base text-green-600 font-medium">+3 from last week</p>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-green-100 rounded-xl">
              <TrendingDown className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Risk Reduction
              </h4>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.riskReduction}%
              </p>
            </div>
          </div>
          <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
            Compared to baseline
          </p>
        </div>

        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-purple-100 rounded-xl">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h4 className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                Response Time
              </h4>
              <p className={`text-4xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                {stats.avgResponseTime}s
              </p>
            </div>
          </div>
          <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
            Average detection
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
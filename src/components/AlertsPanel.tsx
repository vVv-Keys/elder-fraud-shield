import React, { useState } from 'react';
import { AlertTriangle, Phone, Mail, Clock, CheckCircle, X } from 'lucide-react';
import { Alert, TrustedContact } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
  trustedContacts: TrustedContact[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, trustedContacts }) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'scam_detected': return AlertTriangle;
      case 'high_risk': return AlertTriangle;
      case 'emergency': return Phone;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (riskLevel: string) => {
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
          <h2 className="text-2xl font-bold text-gray-900">Security Alerts</h2>
          <p className="text-gray-600">Real-time notifications and threat responses</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {alerts.filter(a => !a.isRead).length} unread
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          {alerts.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All Clear</h3>
              <p className="text-gray-600">No security alerts at this time</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    getAlertColor(alert.riskLevel)
                  } ${!alert.isRead ? 'ring-2 ring-blue-200' : ''}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <span className="text-xs font-medium uppercase">
                          {alert.riskLevel} risk
                        </span>
                      </div>
                      <p className="text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                        </span>
                        {alert.callId && (
                          <span className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {selectedAlert ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Alert Details</h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    getAlertColor(selectedAlert.riskLevel)
                  }`}>
                    {selectedAlert.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                  <p className="text-sm text-gray-900">{selectedAlert.message}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Timestamp</label>
                  <p className="text-sm text-gray-900">{selectedAlert.timestamp.toLocaleString()}</p>
                </div>

                {selectedAlert.actions && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Quick Actions</label>
                    <div className="space-y-2">
                      {selectedAlert.actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleAction(action)}
                          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                            action.variant === 'danger'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : action.variant === 'primary'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
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
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Select an alert to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Total Calls</h4>
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalCalls}</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Scams Blocked</h4>
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.scamsBlocked}</p>
          <p className="text-sm text-green-600 mt-1">+3 from last week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Risk Reduction</h4>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.riskReduction}%</p>
          <p className="text-sm text-gray-600 mt-1">Compared to baseline</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Response Time</h4>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}s</p>
          <p className="text-sm text-gray-600 mt-1">Average detection</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
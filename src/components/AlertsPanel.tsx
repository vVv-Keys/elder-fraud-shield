import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, Phone, Mail, Shield, X, Filter, Search } from 'lucide-react';
import { Alert, TrustedContact } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
  trustedContacts: TrustedContact[];
  highContrast: boolean;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, trustedContacts, highContrast }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical' | 'high' | 'medium'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !alert.isRead) ||
      (filter !== 'all' && filter !== 'unread' && alert.riskLevel === filter);
    
    const matchesSearch = searchTerm === '' ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'scam_detected': return '🚨';
      case 'high_risk': return '⚠️';
      case 'suspicious_activity': return '⚡';
      case 'emergency': return '🆘';
      case 'safe_call': return '✅';
      case 'blocked_call': return '🛑';
      default: return '⚠️';
    }
  };

  const getAlertColor = (riskLevel: Alert['riskLevel']) => {
    if (highContrast) {
      switch (riskLevel) {
        case 'critical': return 'bg-red-900 border-red-600 text-red-200';
        case 'high': return 'bg-orange-900 border-orange-600 text-orange-200';
        case 'medium': return 'bg-yellow-900 border-yellow-600 text-yellow-200';
        case 'low': return 'bg-blue-900 border-blue-600 text-blue-200';
        default: return 'bg-green-900 border-green-600 text-green-200';
      }
    }
    
    switch (riskLevel) {
      case 'critical': return 'bg-red-50 border-red-300 text-red-900';
      case 'high': return 'bg-orange-50 border-orange-300 text-orange-900';
      case 'medium': return 'bg-yellow-50 border-yellow-300 text-yellow-900';
      case 'low': return 'bg-blue-50 border-blue-300 text-blue-900';
      default: return 'bg-green-50 border-green-300 text-green-900';
    }
  };

  const handleAlertAction = (alertId: string, actionType: string) => {
    console.log(`Executing action ${actionType} for alert ${alertId}`);
    
    switch (actionType) {
      case 'hang_up':
        // Simulate hanging up
        break;
      case 'notify_contact':
        // Simulate notifying contacts
        break;
      case 'report_scam':
        // Simulate reporting to authorities
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Safety Alerts
          </h2>
          <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
            Recent warnings and protection updates
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 ${highContrast ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-14 pr-6 py-4 text-lg rounded-xl border-2 ${
                  highContrast 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className={`w-6 h-6 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className={`px-4 py-4 text-lg border-2 rounded-xl ${
                highContrast 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-4 focus:ring-blue-500`}
            >
              <option value="all">All Alerts</option>
              <option value="unread">Unread Only</option>
              <option value="critical">Critical</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-6">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-8 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all ${getAlertColor(alert.riskLevel)} ${
                !alert.isRead ? 'ring-4 ring-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{getAlertIcon(alert.type)}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{alert.title}</h3>
                    <p className="text-lg font-medium mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-base">
                      <span className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>{alert.timestamp.toLocaleString()}</span>
                      </span>
                      <span className="font-bold uppercase">
                        {alert.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                </div>
                
                {!alert.isRead && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                )}
              </div>
              
              {alert.actions && alert.actions.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {alert.actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAlertAction(alert.id, action.type)}
                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ${
                        action.variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' :
                        action.variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                        action.variant === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                        highContrast ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-16 rounded-2xl shadow-lg border text-center`}>
            <Shield className={`w-20 h-20 ${highContrast ? 'text-green-400' : 'text-green-500'} mx-auto mb-6`} />
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-4`}>
              ✅ All Clear!
            </h3>
            <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              No alerts to show. You're well protected!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
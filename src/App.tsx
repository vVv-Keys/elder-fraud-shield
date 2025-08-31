import React, { useState, useEffect } from 'react';
import { Shield, Phone, AlertTriangle, Users, BarChart3, Settings, HelpCircle } from 'lucide-react';
import Header from './components/Header';
import VoicePipeline from './components/VoicePipeline';
import Dashboard from './components/Dashboard';
import AlertsPanel from './components/AlertsPanel';
import ContactsManager from './components/ContactsManager';
import SettingsPanel from './components/SettingsPanel';
import HelpCenter from './components/HelpCenter';
import EmergencyPanel from './components/EmergencyPanel';
import { CallData, Alert, TrustedContact } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'dashboard' | 'alerts' | 'contacts' | 'settings' | 'help'>('monitor');
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentCall, setCurrentCall] = useState<CallData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('large');
  const [highContrast, setHighContrast] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      phone: '+1 (555) 123-4567',
      email: 'sarah@example.com',
      isPrimary: true,
      emergencyContact: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      relationship: 'Family Doctor',
      phone: '+1 (555) 987-6543',
      email: 'dr.chen@healthcenter.com',
      isPrimary: false,
      emergencyContact: false
    },
    {
      id: '3',
      name: 'Tom Johnson',
      relationship: 'Son',
      phone: '+1 (555) 456-7890',
      email: 'tom@example.com',
      isPrimary: true,
      emergencyContact: true
    }
  ]);

  const handleNewAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
    
    // Show emergency panel for critical alerts
    if (alert.riskLevel === 'critical') {
      setShowEmergencyPanel(true);
    }
  };

  const handleCallStart = (callData: CallData) => {
    setIsCallActive(true);
    setCurrentCall(callData);
  };

  const handleCallEnd = () => {
    setIsCallActive(false);
    setCurrentCall(null);
  };

  const navigation = [
    { id: 'monitor', label: 'Phone Protection', icon: Phone, description: 'Monitor incoming calls' },
    { id: 'dashboard', label: 'My Safety Report', icon: BarChart3, description: 'View protection summary' },
    { id: 'alerts', label: 'Safety Alerts', icon: AlertTriangle, description: 'Recent warnings' },
    { id: 'contacts', label: 'Family Contacts', icon: Users, description: 'Emergency contacts' },
    { id: 'settings', label: 'Preferences', icon: Settings, description: 'Adjust settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, description: 'Get assistance' }
  ];

  const fontSizeClasses = {
    normal: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl'
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50'} ${fontSizeClasses[fontSize]}`}>
      <Header 
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        highContrast={highContrast}
        onHighContrastChange={setHighContrast}
      />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className={`w-80 ${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-lg border-r min-h-screen`}>
          <div className="p-8">
            <div className={`flex items-center space-x-4 mb-10 p-4 rounded-xl ${highContrast ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>ScamGuard</h2>
                <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>Protecting You</p>
              </div>
            </div>
            
            <ul className="space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 text-left ${
                        activeTab === item.id
                          ? `${highContrast ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'} border-l-4 border-blue-600 shadow-md`
                          : `${highContrast ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'} hover:shadow-sm`
                      }`}
                    >
                      <Icon className="w-6 h-6 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-semibold block">{item.label}</span>
                        <span className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.description}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Emergency Button */}
            <div className="mt-8 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <button
                data-emergency-button
                onClick={() => setShowEmergencyPanel(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                🚨 EMERGENCY HELP
              </button>
              <p className="text-red-700 text-sm mt-2 text-center font-medium">
                Click if you need immediate assistance
              </p>
              <p className="text-red-600 text-xs mt-1 text-center">
                Keyboard shortcut: Ctrl + Shift + E
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className={`${highContrast ? 'text-white' : 'text-gray-900'}`}>
            {activeTab === 'monitor' && (
              <VoicePipeline
                onCallStart={handleCallStart}
                onCallEnd={handleCallEnd}
                onNewAlert={handleNewAlert}
                isCallActive={isCallActive}
                currentCall={currentCall}
                highContrast={highContrast}
              />
            )}
            
            {activeTab === 'dashboard' && (
              <Dashboard alerts={alerts} highContrast={highContrast} />
            )}
            
            {activeTab === 'alerts' && (
              <AlertsPanel 
                alerts={alerts} 
                trustedContacts={trustedContacts}
                highContrast={highContrast}
                highContrast={highContrast}
              />
            )}
            
            {activeTab === 'contacts' && (
              <ContactsManager
                contacts={trustedContacts}
                onUpdateContacts={setTrustedContacts}
                highContrast={highContrast}
                highContrast={highContrast}
              />
            )}
            
            {activeTab === 'settings' && (
              <SettingsPanel 
                highContrast={highContrast}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                onHighContrastChange={setHighContrast}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                onHighContrastChange={setHighContrast}
              />
            )}

            {activeTab === 'help' && (
              <HelpCenter highContrast={highContrast} />
            )}
          </div>
        </main>
      </div>

      {/* Emergency Panel Modal */}
      {showEmergencyPanel && (
        <EmergencyPanel
          trustedContacts={trustedContacts}
          onClose={() => setShowEmergencyPanel(false)}
          highContrast={highContrast}
        />
      )}
    </div>
  );
}

export default App;
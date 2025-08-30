import React, { useState, useEffect } from 'react';
import { Shield, Phone, AlertTriangle, Users, BarChart3, Settings } from 'lucide-react';
import Header from './components/Header';
import VoicePipeline from './components/VoicePipeline';
import Dashboard from './components/Dashboard';
import AlertsPanel from './components/AlertsPanel';
import ContactsManager from './components/ContactsManager';
import SettingsPanel from './components/SettingsPanel';
import { CallData, Alert, TrustedContact } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'dashboard' | 'alerts' | 'contacts' | 'settings'>('monitor');
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentCall, setCurrentCall] = useState<CallData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      phone: '+1 (555) 123-4567',
      email: 'sarah@example.com',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      relationship: 'Family Doctor',
      phone: '+1 (555) 987-6543',
      email: 'dr.chen@healthcenter.com',
      isPrimary: false
    }
  ]);

  const handleNewAlert = (alert: Alert) => {
    setAlerts(prev => [alert, ...prev]);
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
    { id: 'monitor', label: 'Live Monitor', icon: Phone },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">ScamGuard</h2>
                <p className="text-sm text-gray-500">AI Protection</p>
              </div>
            </div>
            
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'monitor' && (
            <VoicePipeline
              onCallStart={handleCallStart}
              onCallEnd={handleCallEnd}
              onNewAlert={handleNewAlert}
              isCallActive={isCallActive}
              currentCall={currentCall}
            />
          )}
          
          {activeTab === 'dashboard' && (
            <Dashboard alerts={alerts} />
          )}
          
          {activeTab === 'alerts' && (
            <AlertsPanel alerts={alerts} trustedContacts={trustedContacts} />
          )}
          
          {activeTab === 'contacts' && (
            <ContactsManager
              contacts={trustedContacts}
              onUpdateContacts={setTrustedContacts}
            />
          )}
          
          {activeTab === 'settings' && (
            <SettingsPanel />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
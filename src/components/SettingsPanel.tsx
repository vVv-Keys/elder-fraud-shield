import React, { useState } from 'react';
import { Settings, Volume2, Shield, Bell, Eye, Type, Smartphone, Users, Lock } from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsPanelProps {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  onFontSizeChange: (size: 'normal' | 'large' | 'extra-large') => void;
  onHighContrastChange: (enabled: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  highContrast, 
  fontSize, 
  onFontSizeChange, 
  onHighContrastChange 
}) => {
  const [settings, setSettings] = useState<UserSettings>({
    sensitivity: 75,
    autoHangup: false,
    notifyContacts: true,
    recordCalls: true,
    voiceAlerts: true,
    realTimeAnalysis: true,
    emergencyMode: false,
    simplifiedInterface: true,
    largeButtons: true,
    autoBlockKnownScams: true,
    weeklyReports: true,
    language: 'en',
    timezone: 'America/New_York',
    fontSize: fontSize,
    highContrast: highContrast,
    reducedMotion: false,
    voiceCommands: false
  });

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Apply changes immediately for accessibility settings
    if (key === 'fontSize') {
      onFontSizeChange(value);
    } else if (key === 'highContrast') {
      onHighContrastChange(value);
    }
  };

  const SettingCard: React.FC<{
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    children: React.ReactNode;
  }> = ({ title, description, icon: Icon, children }) => (
    <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
          Settings & Preferences
        </h2>
        <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
          Customize ScamGuard to work best for you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Display Settings */}
        <SettingCard
          title="Display & Accessibility"
          description="Make the screen easier to see and use"
          icon={Eye}
        >
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Text Size
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                  highContrast 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-4 focus:ring-blue-500`}
              >
                <option value="normal">Normal Size</option>
                <option value="large">Large Size (Recommended)</option>
                <option value="extra-large">Extra Large Size</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  High Contrast Mode
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Makes text and buttons easier to see
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('highContrast', !settings.highContrast)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.highContrast ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Large Buttons
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Makes buttons bigger and easier to press
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('largeButtons', !settings.largeButtons)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.largeButtons ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.largeButtons ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Protection Settings */}
        <SettingCard
          title="Protection Level"
          description="How sensitive should scam detection be"
          icon={Shield}
        >
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Detection Sensitivity: {settings.sensitivity}%
              </label>
              <input
                type="range"
                min="25"
                max="100"
                step="5"
                value={settings.sensitivity}
                onChange={(e) => handleSettingChange('sensitivity', parseInt(e.target.value))}
                className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-base mt-2">
                <span className={highContrast ? 'text-gray-400' : 'text-gray-500'}>Less Sensitive</span>
                <span className={highContrast ? 'text-gray-400' : 'text-gray-500'}>More Sensitive</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Auto-Block Known Scams
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Automatically hang up on known scam numbers
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('autoBlockKnownScams', !settings.autoBlockKnownScams)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.autoBlockKnownScams ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.autoBlockKnownScams ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Emergency Mode
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Extra protection during high-risk times
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('emergencyMode', !settings.emergencyMode)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.emergencyMode ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.emergencyMode ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Sound & Voice Settings */}
        <SettingCard
          title="Sound & Voice"
          description="How ScamGuard talks to you"
          icon={Volume2}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Voice Alerts
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  ScamGuard will speak warnings out loud
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('voiceAlerts', !settings.voiceAlerts)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.voiceAlerts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.voiceAlerts ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Voice Commands
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Control ScamGuard with your voice
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('voiceCommands', !settings.voiceCommands)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.voiceCommands ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.voiceCommands ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Family Notifications */}
        <SettingCard
          title="Family Notifications"
          description="When to contact your family"
          icon={Users}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notify Family of Threats
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Tell your family when scams are detected
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('notifyContacts', !settings.notifyContacts)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.notifyContacts ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.notifyContacts ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weekly Safety Reports
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Send weekly summaries to your family
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('weeklyReports', !settings.weeklyReports)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.weeklyReports ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.weeklyReports ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Call Recording */}
        <SettingCard
          title="Call Recording"
          description="Keep records for your safety"
          icon={Smartphone}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Record Suspicious Calls
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep evidence of scam attempts
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('recordCalls', !settings.recordCalls)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.recordCalls ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.recordCalls ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Real-Time Analysis
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Analyze calls as they happen
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('realTimeAnalysis', !settings.realTimeAnalysis)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  settings.realTimeAnalysis ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.realTimeAnalysis ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SettingCard>

        {/* Enterprise Security */}
        <SettingCard
          title="Security & Privacy"
          description="Enterprise-grade protection settings"
          icon={Lock}
        >
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${highContrast ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'} border`}>
              <h4 className={`font-bold text-lg ${highContrast ? 'text-green-200' : 'text-green-800'} mb-2`}>
                🔒 Enterprise Security Active
              </h4>
              <ul className={`space-y-1 text-base ${highContrast ? 'text-green-300' : 'text-green-700'}`}>
                <li>✅ End-to-end encryption</li>
                <li>✅ GDPR & HIPAA compliant</li>
                <li>✅ SOC 2 Type II certified</li>
                <li>✅ Zero data retention policy</li>
              </ul>
            </div>
          </div>
        </SettingCard>
      </div>

      {/* Quick Setup Recommendations */}
      <div className={`${highContrast ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} p-8 rounded-2xl border`}>
        <h3 className={`text-2xl font-bold ${highContrast ? 'text-blue-200' : 'text-blue-900'} mb-6`}>
          💡 Recommended Settings for Best Protection
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-lg font-bold ${highContrast ? 'text-blue-300' : 'text-blue-800'} mb-3`}>
              For Maximum Safety:
            </h4>
            <ul className={`space-y-2 text-base ${highContrast ? 'text-blue-200' : 'text-blue-700'}`}>
              <li>• Set sensitivity to 85% or higher</li>
              <li>• Enable auto-block for known scams</li>
              <li>• Turn on voice alerts</li>
              <li>• Add at least 2 family contacts</li>
            </ul>
          </div>
          
          <div>
            <h4 className={`text-lg font-bold ${highContrast ? 'text-blue-300' : 'text-blue-800'} mb-3`}>
              For Easier Use:
            </h4>
            <ul className={`space-y-2 text-base ${highContrast ? 'text-blue-200' : 'text-blue-700'}`}>
              <li>• Use "Large" or "Extra Large" text</li>
              <li>• Enable high contrast mode</li>
              <li>• Keep large buttons turned on</li>
              <li>• Enable voice commands</li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={() => {
            handleSettingChange('sensitivity', 85);
            handleSettingChange('autoBlockKnownScams', true);
            handleSettingChange('voiceAlerts', true);
            handleSettingChange('fontSize', 'large');
            handleSettingChange('largeButtons', true);
          }}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          ⚡ Apply Recommended Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
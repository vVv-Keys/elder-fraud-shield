import React, { useState } from 'react';
import { Settings, Shield, Volume2, Bell, Smartphone, Brain, Save, Type, Eye, Zap } from 'lucide-react';

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
  const [settings, setSettings] = useState({
    sensitivity: 85,
    autoHangup: true,
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
    timezone: 'America/New_York'
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
          Your Preferences
        </h2>
        <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
          Adjust how ScamGuard works for you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accessibility Settings */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-7 h-7 text-green-600" />
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              Make It Easier to See
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                Text Size
              </label>
              <select
                value={fontSize}
                onChange={(e) => onFontSizeChange(e.target.value as any)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                  highContrast 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="normal">Normal Size</option>
                <option value="large">Large Text (Recommended)</option>
                <option value="extra-large">Extra Large Text</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  High Contrast Colors
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Makes text easier to read
                </p>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => onHighContrastChange(e.target.checked)}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Simple Interface
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Hide advanced features
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.simplifiedInterface}
                onChange={(e) => setSettings({ ...settings, simplifiedInterface: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Detection Settings */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="w-7 h-7 text-purple-600" />
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              Protection Level
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                How Careful Should We Be: {settings.sensitivity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sensitivity}
                onChange={(e) => setSettings({ ...settings, sensitivity: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className={`flex justify-between text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'} mt-2 font-medium`}>
                <span>Less Careful</span>
                <span>Very Careful</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Watch Calls Live
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Check calls while you're talking
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.realTimeAnalysis}
                onChange={(e) => setSettings({ ...settings, realTimeAnalysis: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Hang Up Dangerous Calls
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  End very dangerous calls automatically
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoHangup}
                onChange={(e) => setSettings({ ...settings, autoHangup: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-7 h-7 text-orange-600" />
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              Alerts & Notifications
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Spoken Warnings
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  ScamGuard will speak warnings out loud
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.voiceAlerts}
                onChange={(e) => setSettings({ ...settings, voiceAlerts: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tell My Family
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Contact family when there's danger
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifyContacts}
                onChange={(e) => setSettings({ ...settings, notifyContacts: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Save Call Recordings
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep recordings as proof
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.recordCalls}
                onChange={(e) => setSettings({ ...settings, recordCalls: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Emergency Settings */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-7 h-7 text-red-600" />
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              Extra Protection
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Emergency Mode
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Maximum protection and instant alerts
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.emergencyMode}
                onChange={(e) => setSettings({ ...settings, emergencyMode: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
            </div>
            
            {settings.emergencyMode && (
              <div className={`p-4 ${highContrast ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'} border rounded-xl`}>
                <p className={`text-lg ${highContrast ? 'text-red-200' : 'text-red-800'} font-bold`}>
                  🚨 Emergency Mode Active
                </p>
                <p className={`text-base ${highContrast ? 'text-red-300' : 'text-red-700'}`}>
                  All calls will be checked very carefully
                </p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Block Known Scammers
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Stop calls from reported scam numbers
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoBlockKnownScams}
                onChange={(e) => setSettings({ ...settings, autoBlockKnownScams: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className={`text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weekly Safety Reports
                </label>
                <p className={`text-base ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Get a summary of your protection
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={(e) => setSettings({ ...settings, weeklyReports: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              </div>
            )}
          </div>
        </div>

        {/* System Settings */}
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <div className="flex items-center space-x-3 mb-6">
            <Smartphone className="w-7 h-7 text-gray-600" />
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
              System Settings
            </h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                  highContrast 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Your Time Zone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                  highContrast 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-colors shadow-lg text-lg font-bold"
        >
          <Save className="w-6 h-6" />
          <span>Save All Changes</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
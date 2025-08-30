import React, { useState } from 'react';
import { Settings, Shield, Volume2, Bell, Smartphone, Brain, Save } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    sensitivity: 75,
    autoHangup: false,
    notifyContacts: true,
    recordCalls: true,
    voiceAlerts: true,
    realTimeAnalysis: true,
    emergencyMode: false,
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
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Configure your ScamGuard protection preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Settings */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Detection Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detection Sensitivity: {settings.sensitivity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sensitivity}
                onChange={(e) => setSettings({ ...settings, sensitivity: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Real-time Analysis</label>
                <p className="text-xs text-gray-500">Analyze calls as they happen</p>
              </div>
              <input
                type="checkbox"
                checked={settings.realTimeAnalysis}
                onChange={(e) => setSettings({ ...settings, realTimeAnalysis: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Auto Hang-up</label>
                <p className="text-xs text-gray-500">Automatically end high-risk calls</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoHangup}
                onChange={(e) => setSettings({ ...settings, autoHangup: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Voice Alerts</label>
                <p className="text-xs text-gray-500">Spoken warnings during calls</p>
              </div>
              <input
                type="checkbox"
                checked={settings.voiceAlerts}
                onChange={(e) => setSettings({ ...settings, voiceAlerts: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notify Contacts</label>
                <p className="text-xs text-gray-500">Alert trusted contacts of threats</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifyContacts}
                onChange={(e) => setSettings({ ...settings, notifyContacts: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Record Calls</label>
                <p className="text-xs text-gray-500">Save recordings for evidence</p>
              </div>
              <input
                type="checkbox"
                checked={settings.recordCalls}
                onChange={(e) => setSettings({ ...settings, recordCalls: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Emergency Settings */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-gray-900">Emergency Mode</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Emergency Mode</label>
                <p className="text-xs text-gray-500">Maximum protection with instant alerts</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emergencyMode}
                onChange={(e) => setSettings({ ...settings, emergencyMode: e.target.checked })}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
            </div>
            
            {settings.emergencyMode && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">Emergency Mode Active</p>
                <p className="text-xs text-red-700">All calls will be analyzed with maximum sensitivity</p>
              </div>
            )}
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">System</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
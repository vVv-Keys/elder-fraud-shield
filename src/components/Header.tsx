import React from 'react';
import { Shield, Bell, User, Type, Eye, Volume2 } from 'lucide-react';

interface HeaderProps {
  fontSize: 'normal' | 'large' | 'extra-large';
  onFontSizeChange: (size: 'normal' | 'large' | 'extra-large') => void;
  highContrast: boolean;
  onHighContrastChange: (enabled: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  fontSize, 
  onFontSizeChange, 
  highContrast, 
  onHighContrastChange 
}) => {
  return (
    <header className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
                  ScamGuard AI
                </h1>
                <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                  Your Personal Phone Protection
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Accessibility Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Type className={`w-5 h-5 ${highContrast ? 'text-gray-300' : 'text-gray-600'}`} />
                <select
                  value={fontSize}
                  onChange={(e) => onFontSizeChange(e.target.value as any)}
                  className={`px-3 py-2 rounded-lg border ${
                    highContrast 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="normal">Normal Text</option>
                  <option value="large">Large Text</option>
                  <option value="extra-large">Extra Large Text</option>
                </select>
              </div>
              
              <button
                onClick={() => onHighContrastChange(!highContrast)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  highContrast
                    ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-5 h-5" />
                <span className="font-medium">
                  {highContrast ? 'Normal View' : 'High Contrast'}
                </span>
              </button>
            </div>

            {/* Status Indicator */}
            <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl border ${
              highContrast ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'
            }`}>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <span className={`text-lg font-bold ${highContrast ? 'text-green-300' : 'text-green-700'}`}>
                  PROTECTED
                </span>
                <p className={`text-sm ${highContrast ? 'text-green-400' : 'text-green-600'}`}>
                  System is watching
                </p>
              </div>
            </div>
            
            {/* User Profile */}
            <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
              highContrast ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
            } transition-colors cursor-pointer`}>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <div>
                <span className={`text-lg font-semibold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                  Margaret Smith
                </span>
                <p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                  Account Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { AlertTriangle, Phone, X, Users, Shield, Clock } from 'lucide-react';
import { TrustedContact } from '../types';

interface EmergencyPanelProps {
  trustedContacts: TrustedContact[];
  onClose: () => void;
  highContrast: boolean;
}

const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ trustedContacts, onClose, highContrast }) => {
  const [isContacting, setIsContacting] = useState(false);
  const [contactedPeople, setContactedPeople] = useState<string[]>([]);

  const handleEmergencyContact = async (contact: TrustedContact) => {
    setIsContacting(true);
    
    // Simulate contacting the person
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setContactedPeople(prev => [...prev, contact.id]);
    setIsContacting(false);
  };

  const handleCallPolice = () => {
    window.open('tel:911', '_self');
  };

  const handleCallFTC = () => {
    window.open('tel:1-877-382-4357', '_self');
  };

  const primaryContacts = trustedContacts.filter(contact => contact.isPrimary);
  const emergencyContacts = trustedContacts.filter(contact => contact.emergencyContact);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-2xl border max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="bg-red-600 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-3xl font-bold text-white">🚨 EMERGENCY HELP</h2>
                <p className="text-red-100 text-lg">Get immediate assistance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-700 rounded-lg transition-colors"
            >
              <X className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Immediate Actions */}
          <div>
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
              🚨 If You're in Immediate Danger
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={handleCallPolice}
                className="bg-red-600 hover:bg-red-700 text-white p-8 rounded-xl font-bold text-xl transition-colors shadow-lg flex items-center space-x-4"
              >
                <Phone className="w-8 h-8" />
                <div className="text-left">
                  <div>📞 CALL 911</div>
                  <div className="text-lg font-normal opacity-90">Emergency Services</div>
                </div>
              </button>
              
              <button
                onClick={handleCallFTC}
                className="bg-orange-600 hover:bg-orange-700 text-white p-8 rounded-xl font-bold text-xl transition-colors shadow-lg flex items-center space-x-4"
              >
                <Shield className="w-8 h-8" />
                <div className="text-left">
                  <div>📞 REPORT SCAM</div>
                  <div className="text-lg font-normal opacity-90">FTC Fraud Hotline</div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Family */}
          <div>
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
              👨‍👩‍👧‍👦 Contact Your Family
            </h3>
            
            {primaryContacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {primaryContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-6 rounded-xl border-2 ${
                      contactedPeople.includes(contact.id)
                        ? (highContrast ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-300')
                        : (highContrast ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300')
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                          {contact.name}
                        </h4>
                        <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                          {contact.relationship}
                        </p>
                      </div>
                    </div>
                    
                    {contactedPeople.includes(contact.id) ? (
                      <div className={`text-center py-4 ${highContrast ? 'text-green-300' : 'text-green-700'}`}>
                        <div className="text-2xl mb-2">✅</div>
                        <p className="text-lg font-bold">CONTACTED</p>
                        <p className="text-base">They have been notified</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEmergencyContact(contact)}
                        disabled={isContacting}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-3"
                      >
                        {isContacting ? (
                          <>
                            <Clock className="w-6 h-6 animate-spin" />
                            <span>CONTACTING...</span>
                          </>
                        ) : (
                          <>
                            <Phone className="w-6 h-6" />
                            <span>CONTACT {contact.name.toUpperCase()}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 p-6 rounded-xl border-2 ${
                highContrast ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}>
                <Users className={`w-16 h-16 ${highContrast ? 'text-gray-400' : 'text-gray-400'} mx-auto mb-4`} />
                <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                  No emergency contacts set up yet
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Add Contacts Now
                </button>
              </div>
            )}
          </div>

          {/* Quick Help */}
          <div>
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
              ❓ Quick Help
            </h3>
            
            <div className={`p-6 rounded-xl border-2 ${
              highContrast ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'
            }`}>
              <h4 className={`text-lg font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-3`}>
                If you think this is a scam call:
              </h4>
              <ol className={`space-y-2 text-lg ${highContrast ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>1. 🛑 Hang up immediately</li>
                <li>2. 📞 Call your family using the buttons above</li>
                <li>3. 📝 Don't worry - you did the right thing</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;
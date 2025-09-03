import React, { useState } from 'react';
import { HelpCircle, Phone, Mail, MessageCircle, Book, Video, Search, ChevronDown, ChevronRight } from 'lucide-react';

interface HelpCenterProps {
  highContrast: boolean;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ highContrast }) => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: '1',
      question: 'How do I know if a call is a scam?',
      answer: 'ScamGuard will show you warning signs in real-time. Look for red alerts, high risk scores, and our recommendations. Common scam signs include: pressure to act immediately, requests for personal information, claims to be from government agencies, and demands for money or gift cards.'
    },
    {
      id: '2',
      question: 'What should I do if ScamGuard detects a scam?',
      answer: 'Follow the on-screen instructions immediately. Usually this means hanging up the phone right away. ScamGuard will show you a big red "HANG UP NOW" button. You can also press the emergency button to get help from your family members.'
    },
    {
      id: '3',
      question: 'How do I add my family members as emergency contacts?',
      answer: 'Go to "Family Contacts" in the menu. Click "Add Contact" and enter their name, relationship (like daughter or son), phone number, and email. Make sure to mark your most important contacts as "Primary" so they get notified first.'
    },
    {
      id: '4',
      question: 'Can I make the text bigger?',
      answer: 'Yes! At the top of the screen, look for the text size dropdown. You can choose "Large Text" or "Extra Large Text". You can also turn on "High Contrast" mode to make everything easier to see.'
    },
    {
      id: '5',
      question: 'What if I accidentally hang up on a real call?',
      answer: 'Don\'t worry! If it was a legitimate caller, they will call back or leave a voicemail. It\'s always better to be safe. You can also check your call history to see if the number was marked as safe.'
    },
    {
      id: '6',
      question: 'How does ScamGuard protect my privacy?',
      answer: 'ScamGuard only analyzes calls for scam patterns. We don\'t store your personal conversations. All analysis happens in real-time and only safety-related information is kept to protect you better in the future.'
    }
  ];

  const quickActions = [
    {
      title: 'Call Support',
      description: 'Speak with a real person',
      icon: Phone,
      action: 'tel:+1-800-SCAMGUARD',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Email Help',
      description: 'Send us a message',
      icon: Mail,
      action: 'mailto:help@scamguard.ai',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Live Chat',
      description: 'Chat with support',
      icon: MessageCircle,
      action: '#',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with ScamGuard',
      description: 'Learn the basics in 5 minutes',
      duration: '5 min',
      icon: Book
    },
    {
      title: 'Setting Up Family Contacts',
      description: 'Add your trusted family members',
      duration: '3 min',
      icon: Video
    },
    {
      title: 'Understanding Scam Alerts',
      description: 'Know what to do when alerts appear',
      duration: '4 min',
      icon: Video
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
          Help & Support
        </h2>
        <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
          Get help using ScamGuard and staying safe from phone scams
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.title}
              href={action.action}
              className={`${action.color} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 block text-center`}
            >
              <Icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{action.title}</h3>
              <p className="text-lg opacity-90">{action.description}</p>
            </a>
          );
        })}
      </div>

      {/* Search */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border`}>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 ${highContrast ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search for help..."
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

      {/* Tutorials */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
        <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
          Video Tutorials
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => {
            const Icon = tutorial.icon;
            return (
              <div
                key={tutorial.title}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg transform hover:scale-102 ${
                  highContrast ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } cursor-pointer`}
              >
                <Icon className={`w-10 h-10 ${highContrast ? 'text-blue-400' : 'text-blue-600'} mb-4`} />
                <h4 className={`text-lg font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {tutorial.title}
                </h4>
                <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                  {tutorial.description}
                </p>
                <span className={`text-sm ${highContrast ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                  {tutorial.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
        <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`border-2 rounded-xl ${
                highContrast ? 'border-gray-600' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className={`w-full p-6 text-left flex items-center justify-between transition-all hover:shadow-sm ${
                  highContrast ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                } rounded-xl`}
              >
                <span className={`text-lg font-semibold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                {expandedFaq === faq.id ? (
                  <ChevronDown className={`w-6 h-6 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronRight className={`w-6 h-6 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </button>
              
              {expandedFaq === faq.id && (
                <div className={`px-6 pb-6 border-t ${highContrast ? 'border-gray-600' : 'border-gray-200'}`}>
                  <p className={`${highContrast ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed mt-4`}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact Info */}
      <div className={`p-8 rounded-2xl border-2 ${
        highContrast ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-300'
      }`}>
        <h3 className={`text-2xl font-bold ${highContrast ? 'text-red-200' : 'text-red-900'} mb-4`}>
          🚨 Need Immediate Help?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className={`text-lg font-semibold ${highContrast ? 'text-red-300' : 'text-red-800'} mb-2`}>
              24/7 Emergency Support
            </p>
            <p className={`text-xl font-bold ${highContrast ? 'text-red-200' : 'text-red-900'}`}>
              📞 1-800-SCAM-HELP
            </p>
          </div>
          <div>
            <p className={`text-lg font-semibold ${highContrast ? 'text-red-300' : 'text-red-800'} mb-2`}>
              Report Fraud
            </p>
            <p className={`text-xl font-bold ${highContrast ? 'text-red-200' : 'text-red-900'}`}>
              📞 1-877-FTC-HELP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Phone, Mail, Star } from 'lucide-react';
import { TrustedContact } from '../types';

interface ContactsManagerProps {
  contacts: TrustedContact[];
  onUpdateContacts: (contacts: TrustedContact[]) => void;
  highContrast: boolean;
}

const ContactsManager: React.FC<ContactsManagerProps> = ({ contacts, onUpdateContacts, highContrast }) => {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<TrustedContact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    isPrimary: false,
    emergencyContact: false,
    preferredContactMethod: 'phone' as 'phone' | 'email' | 'both'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContact) {
      // Update existing contact
      const updatedContacts = contacts.map(contact =>
        contact.id === editingContact.id
          ? { ...contact, ...formData }
          : contact
      );
      onUpdateContacts(updatedContacts);
      setEditingContact(null);
    } else {
      // Add new contact
      const newContact: TrustedContact = {
        id: Date.now().toString(),
        ...formData
      };
      onUpdateContacts([...contacts, newContact]);
      setIsAddingContact(false);
    }
    
    setFormData({ name: '', relationship: '', phone: '', email: '', isPrimary: false, emergencyContact: false, preferredContactMethod: 'phone' });
  };

  const handleEdit = (contact: TrustedContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email,
      isPrimary: contact.isPrimary,
      emergencyContact: contact.emergencyContact || false,
      preferredContactMethod: contact.preferredContactMethod || 'phone'
    });
  };

  const handleDelete = (contactId: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    onUpdateContacts(updatedContacts);
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContact(null);
    setFormData({ 
      name: '', 
      relationship: '', 
      phone: '', 
      email: '', 
      isPrimary: false,
      emergencyContact: false,
      preferredContactMethod: 'phone'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'}`}>
            Family Contacts
          </h2>
          <p className={`${highContrast ? 'text-gray-300' : 'text-gray-600'} text-lg mt-2`}>
            People who can help you if there's a problem
          </p>
        </div>
        
        <button
          onClick={() => setIsAddingContact(true)}
          className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors shadow-lg text-lg font-bold"
        >
          <Plus className="w-6 h-6" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingContact || editingContact) && (
        <div className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border`}>
          <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} mb-6`}>
            {editingContact ? 'Edit Family Member' : 'Add New Family Member'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                    highContrast 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g., Sarah Johnson"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  How they're related to you
                </label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                    highContrast 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g., My daughter, My son, My doctor"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                    highContrast 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
              
              <div>
                <label className={`block text-lg font-semibold ${highContrast ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${
                    highContrast 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-4 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="sarah@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <input
                type="checkbox"
                id="isPrimary"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isPrimary" className="text-lg font-semibold text-blue-900">
                ⭐ This is my most important contact (they'll be notified first)
              </label>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-red-50 border border-red-200">
              <input
                type="checkbox"
                id="emergencyContact"
                checked={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.checked })}
                className="w-6 h-6 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="emergencyContact" className="text-lg font-semibold text-red-900">
                🚨 Emergency contact (for urgent situations)
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-bold text-lg shadow-lg"
              >
                {editingContact ? 'Save Changes' : 'Add This Person'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={`${
                  highContrast ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } px-8 py-4 rounded-xl transition-colors font-bold text-lg`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className={`${highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-gray-900'} flex items-center space-x-2`}>
                    <span>{contact.name}</span>
                    {contact.isPrimary && <span className="text-yellow-500">⭐</span>}
                    {contact.emergencyContact && <span className="text-red-500">🚨</span>}
                  </h4>
                  <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                    {contact.relationship}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(contact)}
                  className={`p-3 ${
                    highContrast ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  } rounded-xl transition-colors`}
                >
                  <Edit className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className={`p-3 ${
                    highContrast ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                  } rounded-xl transition-colors`}
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className={`flex items-center space-x-3 text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                <Phone className="w-5 h-5" />
                <span>{contact.phone}</span>
              </div>
              <div className={`flex items-center space-x-3 text-lg ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                <Mail className="w-5 h-5" />
                <span>{contact.email}</span>
              </div>
            </div>
            
            <div className={`mt-6 pt-6 border-t ${highContrast ? 'border-gray-600' : 'border-gray-200'}`}>
              <button 
                onClick={() => console.log(`Testing notification to ${contact.name}`)}
                className={`w-full ${
                highContrast ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
              } py-4 rounded-xl transition-colors text-lg font-semibold`}
              >
                📧 Send Test Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManager;
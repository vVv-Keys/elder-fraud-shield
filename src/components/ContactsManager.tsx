import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Phone, Mail, Star } from 'lucide-react';
import { TrustedContact } from '../types';

interface ContactsManagerProps {
  contacts: TrustedContact[];
  onUpdateContacts: (contacts: TrustedContact[]) => void;
}

const ContactsManager: React.FC<ContactsManagerProps> = ({ contacts, onUpdateContacts }) => {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState<TrustedContact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    isPrimary: false
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
    
    setFormData({ name: '', relationship: '', phone: '', email: '', isPrimary: false });
  };

  const handleEdit = (contact: TrustedContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email,
      isPrimary: contact.isPrimary
    });
  };

  const handleDelete = (contactId: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    onUpdateContacts(updatedContacts);
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContact(null);
    setFormData({ name: '', relationship: '', phone: '', email: '', isPrimary: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trusted Contacts</h2>
          <p className="text-gray-600">Manage emergency contacts for scam alerts</p>
        </div>
        
        <button
          onClick={() => setIsAddingContact(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingContact || editingContact) && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Daughter, Son, Doctor"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPrimary"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isPrimary" className="text-sm text-gray-700">
                Primary emergency contact
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
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
          <div key={contact.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center space-x-1">
                    <span>{contact.name}</span>
                    {contact.isPrimary && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </h4>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => handleEdit(contact)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg transition-colors text-sm font-medium">
                Test Notification
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManager;
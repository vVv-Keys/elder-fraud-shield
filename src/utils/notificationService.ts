import { TrustedContact, Alert } from '../types';

export class NotificationService {
  public async notifyTrustedContacts(
    contacts: TrustedContact[],
    alert: Alert
  ): Promise<void> {
    const primaryContacts = contacts.filter(contact => contact.isPrimary);
    const contactsToNotify = primaryContacts.length > 0 ? primaryContacts : contacts.slice(0, 2);

    for (const contact of contactsToNotify) {
      await this.sendNotification(contact, alert);
    }
  }

  private async sendNotification(contact: TrustedContact, alert: Alert): Promise<void> {
    // In production, integrate with:
    // - Twilio for SMS
    // - SendGrid for email
    // - Push notification services
    
    const message = this.formatAlertMessage(alert, contact);
    
    console.log(`Sending notification to ${contact.name}:`, message);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private formatAlertMessage(alert: Alert, contact: TrustedContact): string {
    return `
ScamGuard Alert: ${alert.title}

${alert.message}

Time: ${alert.timestamp.toLocaleString()}
Risk Level: ${alert.riskLevel.toUpperCase()}

This is an automated alert from ScamGuard AI protection system.
    `.trim();
  }

  public async sendEmergencyAlert(contacts: TrustedContact[]): Promise<void> {
    const emergencyMessage = `
EMERGENCY: ScamGuard has detected a critical threat.

A high-risk scam call is currently in progress. Immediate attention may be required.

Please check on the protected individual or contact them directly.

Time: ${new Date().toLocaleString()}
    `.trim();

    for (const contact of contacts) {
      console.log(`Emergency alert sent to ${contact.name}`);
      // In production, this would send immediate notifications
    }
  }

  public async testNotification(contact: TrustedContact): Promise<boolean> {
    try {
      const testMessage = `
ScamGuard Test Notification

This is a test message to verify your contact information is working correctly.

Contact: ${contact.name}
Relationship: ${contact.relationship}
Time: ${new Date().toLocaleString()}

If you received this message, your notification settings are configured properly.
      `.trim();

      console.log(`Test notification sent to ${contact.name}:`, testMessage);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (error) {
      console.error('Failed to send test notification:', error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();
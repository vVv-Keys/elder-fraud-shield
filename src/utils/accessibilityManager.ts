export class AccessibilityManager {
  private speechSynthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.speechSynthesis = typeof window !== 'undefined' ? window.speechSynthesis : null as any;
    this.setupKeyboardShortcuts();
  }

  // Text-to-speech for alerts and instructions
  public speak(text: string, priority: 'low' | 'medium' | 'high' | 'emergency' = 'medium'): void {
    if (!this.speechSynthesis) return;
    
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    
    switch (priority) {
      case 'emergency':
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        break;
      case 'high':
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.9;
        break;
      default:
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
    }

    this.currentUtterance = utterance;
    this.speechSynthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  // Keyboard navigation helpers
  public setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (event) => {
      // Emergency shortcut: Ctrl + Shift + E
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        this.triggerEmergencyMode();
      }

      // Quick hang up: Ctrl + Shift + H
      if (event.ctrlKey && event.shiftKey && event.key === 'H') {
        event.preventDefault();
        this.triggerHangUp();
      }
    });
  }

  private triggerEmergencyMode(): void {
    const emergencyButton = document.querySelector('[data-emergency-button]') as HTMLButtonElement;
    if (emergencyButton) {
      emergencyButton.click();
    }
  }

  private triggerHangUp(): void {
    const hangUpButton = document.querySelector('[data-hangup-button]') as HTMLButtonElement;
    if (hangUpButton) {
      hangUpButton.click();
    }
  }

  // Screen reader announcements
  public announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }
}

export const accessibilityManager = new AccessibilityManager();
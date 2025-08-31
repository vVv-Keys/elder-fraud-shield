export class AccessibilityManager {
  private speechSynthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  // Text-to-speech for alerts and instructions
  public speak(text: string, priority: 'low' | 'medium' | 'high' | 'emergency' = 'medium'): void {
    // Stop any current speech
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings based on priority
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
      case 'medium':
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        break;
      case 'low':
        utterance.rate = 1.1;
        utterance.pitch = 0.9;
        utterance.volume = 0.7;
        break;
    }

    // Prefer female voices for better clarity
    const voices = this.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
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

      // Speak current alert: Ctrl + Shift + S
      if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        event.preventDefault();
        this.speakCurrentAlert();
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

  private speakCurrentAlert(): void {
    const alertElement = document.querySelector('[data-current-alert]');
    if (alertElement) {
      const alertText = alertElement.textContent || '';
      this.speak(`Current alert: ${alertText}`, 'high');
    }
  }

  // High contrast and font size management
  public applyAccessibilitySettings(settings: {
    fontSize: 'normal' | 'large' | 'extra-large';
    highContrast: boolean;
    reducedMotion: boolean;
  }): void {
    const root = document.documentElement;
    
    // Apply font size
    switch (settings.fontSize) {
      case 'large':
        root.style.setProperty('--base-font-size', '1.125rem');
        break;
      case 'extra-large':
        root.style.setProperty('--base-font-size', '1.25rem');
        break;
      default:
        root.style.setProperty('--base-font-size', '1rem');
    }

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
    } else {
      root.style.setProperty('--animation-duration', '0.3s');
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
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Focus management for better navigation
  public manageFocus(elementSelector: string): void {
    const element = document.querySelector(elementSelector) as HTMLElement;
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Large button creation helper
  public createLargeButton(text: string, onClick: () => void, variant: 'primary' | 'danger' | 'secondary' = 'primary'): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    
    const baseClasses = 'px-8 py-6 rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105';
    
    switch (variant) {
      case 'primary':
        button.className = `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
        break;
      case 'danger':
        button.className = `${baseClasses} bg-red-600 hover:bg-red-700 text-white`;
        break;
      case 'secondary':
        button.className = `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-900`;
        break;
    }
    
    return button;
  }

  // Voice command recognition (future enhancement)
  public setupVoiceCommands(): void {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        this.processVoiceCommand(command);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
      };
      
      // Start listening for voice commands
      recognition.start();
    }
  }

  private processVoiceCommand(command: string): void {
    if (command.includes('emergency') || command.includes('help')) {
      this.triggerEmergencyMode();
    } else if (command.includes('hang up') || command.includes('end call')) {
      this.triggerHangUp();
    } else if (command.includes('repeat') || command.includes('say again')) {
      this.speakCurrentAlert();
    }
  }
}

export const accessibilityManager = new AccessibilityManager();
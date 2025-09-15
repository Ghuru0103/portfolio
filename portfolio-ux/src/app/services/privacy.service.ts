import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializePrivacyProtection();
    }
  }

  private initializePrivacyProtection(): void {
    this.disableRightClick();
    this.disableKeyboardShortcuts();
    this.disableDragAndDrop();
    this.disableTextSelection();
    this.disableImageSaving();
    this.disablePrintScreen();
    this.disableDeveloperTools();
    this.addWatermark();
    this.trackUnauthorizedAccess();
  }

  private disableRightClick(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showWarning('Right-click is disabled for privacy protection');
      return false;
    });
  }

  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // Disable common developer tools shortcuts
      const blockedKeys = [
        { key: 'F12', code: 123 },
        { key: 'Ctrl+Shift+I', ctrl: true, shift: true, code: 73 },
        { key: 'Ctrl+U', ctrl: true, code: 85 },
        { key: 'Ctrl+S', ctrl: true, code: 83 },
        { key: 'Ctrl+A', ctrl: true, code: 65 },
        { key: 'Ctrl+P', ctrl: true, code: 80 },
        { key: 'Ctrl+Shift+C', ctrl: true, shift: true, code: 67 },
        { key: 'Ctrl+Shift+J', ctrl: true, shift: true, code: 74 },
        { key: 'Ctrl+Shift+K', ctrl: true, shift: true, code: 75 }
      ];

      for (const blocked of blockedKeys) {
        if (e.keyCode === blocked.code && 
            (!blocked.ctrl || e.ctrlKey) && 
            (!blocked.shift || e.shiftKey)) {
          e.preventDefault();
          this.showWarning(`${blocked.key} is disabled for privacy protection`);
          return;
        }
      }
    });
  }

  private disableDragAndDrop(): void {
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      this.showWarning('Drag and drop is disabled for privacy protection');
      return false;
    });
  }

  private disableTextSelection(): void {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private disableImageSaving(): void {
    // Prevent image dragging
    document.addEventListener('dragstart', (e) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        this.showWarning('Image saving is disabled for privacy protection');
        return;
      }
    });

    // Add overlay to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.pointerEvents = 'none';
      img.style.userSelect = 'none';
      // Use setAttribute for non-standard CSS properties
      img.setAttribute('draggable', 'false');
    });
  }

  private disablePrintScreen(): void {
    // Detect print screen attempts
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 44) { // Print Screen key
        this.showWarning('Screenshots are not allowed on this site');
        this.blurContent();
      }
    });

    // Blur content when tab loses focus
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.blurContent();
      } else {
        this.unblurContent();
      }
    });
  }

  private disableDeveloperTools(): void {
    // Detect DevTools opening
    let devtools = { open: false, orientation: null };
    
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > 200 || 
          window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          this.showWarning('Developer tools detected. Content will be blurred for privacy.');
          this.blurContent();
        }
      } else {
        devtools.open = false;
        this.unblurContent();
      }
    }, 500);

    // Disable console methods
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    console.table = noop;
    console.group = noop;
    console.groupEnd = noop;
    console.groupCollapsed = noop;
    console.clear = noop;
    console.count = noop;
    console.countReset = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.timeLog = noop;
    console.assert = noop;
    console.dir = noop;
    console.dirxml = noop;
    console.profile = noop;
    console.profileEnd = noop;
    console.timeStamp = noop;
  }

  private addWatermark(): void {
    // Add invisible watermark to track unauthorized usage
    const watermark = document.createElement('div');
    watermark.style.position = 'fixed';
    watermark.style.top = '0';
    watermark.style.left = '0';
    watermark.style.width = '100%';
    watermark.style.height = '100%';
    watermark.style.pointerEvents = 'none';
    watermark.style.zIndex = '9999';
    watermark.style.background = 'transparent';
    watermark.style.fontSize = '0';
    watermark.style.color = 'transparent';
    watermark.textContent = 'GuruPrashad Portfolio - Confidential';
    document.body.appendChild(watermark);
  }

  private trackUnauthorizedAccess(): void {
    // Track suspicious activities
    let suspiciousActivity = 0;
    
    const trackActivity = (type: string) => {
      suspiciousActivity++;
      console.warn(`Suspicious activity detected: ${type} (${suspiciousActivity} attempts)`);
      
      if (suspiciousActivity > 10) {
        this.showWarning('Multiple unauthorized access attempts detected. Please contact the site owner.');
        this.blurContent();
      }
    };

    // Track copy attempts
    document.addEventListener('copy', (e) => {
      e.clipboardData?.setData('text/plain', '');
      e.preventDefault();
      trackActivity('Copy attempt');
    });

    // Track print attempts
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      trackActivity('Print attempt');
    });
  }

  private blurContent(): void {
    document.body.style.filter = 'blur(10px)';
    document.body.style.transition = 'filter 0.3s ease';
  }

  private unblurContent(): void {
    document.body.style.filter = 'none';
  }

  private showWarning(message: string): void {
    // Create warning notification
    const warning = document.createElement('div');
    warning.style.position = 'fixed';
    warning.style.top = '20px';
    warning.style.right = '20px';
    warning.style.background = '#ff4444';
    warning.style.color = 'white';
    warning.style.padding = '10px 20px';
    warning.style.borderRadius = '5px';
    warning.style.zIndex = '10000';
    warning.style.fontSize = '14px';
    warning.style.maxWidth = '300px';
    warning.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    warning.textContent = message;
    
    document.body.appendChild(warning);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (warning.parentNode) {
        warning.parentNode.removeChild(warning);
      }
    }, 3000);
  }

  // Public method to enable text selection for specific elements
  enableTextSelection(element: HTMLElement): void {
    if (isPlatformBrowser(this.platformId)) {
      element.style.userSelect = 'text';
      // Use setProperty for vendor-specific CSS properties
      element.style.setProperty('-webkit-user-select', 'text');
      element.style.setProperty('-moz-user-select', 'text');
      element.style.setProperty('-ms-user-select', 'text');
    }
  }

  // Public method to disable text selection for specific elements
  disableTextSelectionForElement(element: HTMLElement): void {
    if (isPlatformBrowser(this.platformId)) {
      element.style.userSelect = 'none';
      // Use setProperty for vendor-specific CSS properties
      element.style.setProperty('-webkit-user-select', 'none');
      element.style.setProperty('-moz-user-select', 'none');
      element.style.setProperty('-ms-user-select', 'none');
    }
  }
}

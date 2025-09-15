import { Directive, ElementRef, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appPrivacyProtection]',
  standalone: true
})
export class PrivacyProtectionDirective implements OnInit, OnDestroy {

  private overlay: HTMLElement | null = null;
  private isProtected = true;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupProtection();
    }
  }

  ngOnDestroy(): void {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }

  private setupProtection(): void {
    const element = this.el.nativeElement;
    
    // Make element relative positioned
    element.style.position = 'relative';
    
    // Create protection overlay
    this.overlay = document.createElement('div');
    this.overlay.style.position = 'absolute';
    this.overlay.style.top = '0';
    this.overlay.style.left = '0';
    this.overlay.style.width = '100%';
    this.overlay.style.height = '100%';
    this.overlay.style.background = 'transparent';
    this.overlay.style.pointerEvents = 'auto';
    this.overlay.style.zIndex = '999';
    this.overlay.style.cursor = 'default';
    
    element.appendChild(this.overlay);
    
    // Add hover effect to show protection
    this.overlay.addEventListener('mouseenter', () => {
      this.overlay!.style.background = 'rgba(255, 193, 7, 0.1)';
    });
    
    this.overlay.addEventListener('mouseleave', () => {
      this.overlay!.style.background = 'transparent';
    });
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.showProtectionMessage('Right-click is disabled for privacy protection');
    return false;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.showProtectionMessage('Drag and drop is disabled for privacy protection');
    return false;
  }

  @HostListener('selectstart', ['$event'])
  onSelectStart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.showProtectionMessage('Copying is disabled for privacy protection');
    return false;
  }

  private showProtectionMessage(message: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Create temporary message
    const messageEl = document.createElement('div');
    messageEl.style.position = 'fixed';
    messageEl.style.top = '50%';
    messageEl.style.left = '50%';
    messageEl.style.transform = 'translate(-50%, -50%)';
    messageEl.style.background = '#ff4444';
    messageEl.style.color = 'white';
    messageEl.style.padding = '15px 25px';
    messageEl.style.borderRadius = '8px';
    messageEl.style.zIndex = '10001';
    messageEl.style.fontSize = '14px';
    messageEl.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    messageEl.style.maxWidth = '300px';
    messageEl.style.textAlign = 'center';
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 3000);
  }

  // Public method to temporarily disable protection
  disableProtection(): void {
    this.isProtected = false;
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  // Public method to re-enable protection
  enableProtection(): void {
    this.isProtected = true;
    if (this.overlay) {
      this.overlay.style.display = 'block';
    }
  }
}

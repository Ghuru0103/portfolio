import { Component, HostListener, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  activeSection = '';

  private scrollListener?: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
      this.handleInitialHash();
    }
  }

  private handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        this.scrollToElement(hash);
      }, 100); // Reduced from 500ms to 100ms
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupScrollListener() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.scrollListener = () => {
      this.updateActiveSection();
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  private updateActiveSection() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const sections = ['services', 'works', 'contact'];
    const headerHeight = 70;
    
    // If user is at the very top, clear active section
    if (window.scrollY < 50) {
      this.activeSection = '';
      return;
    }
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
          currentSection = sectionId;
        }
      }
    });

    // If no section is in view, check which one is closest
    if (!currentSection) {
      let closestSection = '';
      let minDistance = Infinity;
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - headerHeight);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = sectionId;
          }
        }
      });
      currentSection = closestSection;
    }

    this.activeSection = currentSection;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Prevent body scroll when menu is open
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  scrollToSection(sectionId: string) {
    console.log('scrollToSection called with:', sectionId);
    
    if (!isPlatformBrowser(this.platformId)) {
      console.log('Not in browser platform, returning');
      return;
    }

    // Close mobile menu first
    this.isMenuOpen = false;
    document.body.style.overflow = '';

    // Use hash-based navigation
    this.navigateToSection(sectionId);
  }

  private navigateToSection(sectionId: string) {
    // Update the URL hash
    window.location.hash = sectionId;
    
    // Scroll to the element immediately
    this.scrollToElement(sectionId);
  }

  private scrollToElement(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 70;
      const elementPosition = element.offsetTop - headerHeight;
      
      // Use instant scroll for faster navigation
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'auto' // Changed to auto for instant scrolling
      });
      
    } else {
      console.error('Element not found with ID:', sectionId);
    }
  }

  scrollToTop() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Use hash navigation to go to home
    window.location.hash = 'hero';
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  isActive(sectionId: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    // Check both scroll position and current hash
    const currentHash = window.location.hash.replace('#', '');
    
    // Check if this section is active based on scroll position or hash
    return this.activeSection === sectionId || currentHash === sectionId;
  }
}

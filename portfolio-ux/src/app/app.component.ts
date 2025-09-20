import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AiToolsComponent } from './components/ai-tools/ai-tools.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
// import { PrivacyService } from './services/privacy.service'; // Disabled for development

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, ServicesComponent, SkillsComponent, AiToolsComponent, ProjectsComponent, ContactComponent, ScrollRevealDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-ux';

  constructor(
    // private privacyService: PrivacyService, // Disabled for development
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Commented out for development - privacy protection disabled
    // if (isPlatformBrowser(this.platformId)) {
    //   this.setupPrivacyProtection();
    // }
  }

  private setupPrivacyProtection(): void {
    // Additional privacy measures
    this.disableImageContextMenu();
    this.addImageProtection();
    this.preventScreenshot();
  }

  private disableImageContextMenu(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
    });
  }

  private addImageProtection(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add transparent overlay to prevent direct image access
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'transparent';
      overlay.style.pointerEvents = 'auto';
      overlay.style.zIndex = '1';
      
      // Make image container relative positioned
      const parent = img.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.appendChild(overlay);
      }
    });
  }

  private preventScreenshot(): void {
    // Additional screenshot prevention
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 44) { // Print Screen
        // Flash the screen to make screenshots less useful
        document.body.style.background = '#ff0000';
        setTimeout(() => {
          document.body.style.background = '';
        }, 100);
      }
    });
  }
}

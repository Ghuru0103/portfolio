import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, Profile, ContactForm, ContactResponse } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  profile: Profile | null = null;
  contactForm = {
    name: '',
    email: '',
    message: ''
  };
  isSubmitting = false;
  submitMessage = '';

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.portfolioService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }

  onSubmit() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      this.submitMessage = 'Please fill in all fields';
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';
    
    // Send the form data to the backend
    this.portfolioService.sendContactForm(this.contactForm).subscribe({
      next: (response: ContactResponse) => {
        this.isSubmitting = false;
        if (response.success) {
          this.submitMessage = response.message;
          this.contactForm = { name: '', email: '', message: '' };
        } else {
          this.submitMessage = response.message;
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error sending message:', error);
        this.submitMessage = 'Failed to send message. Please try again or contact me directly at guru.s.prashad@gmail.com';
      }
    });
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}



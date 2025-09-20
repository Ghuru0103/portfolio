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
    // Check if form fields are empty or just whitespace
    if (!this.contactForm.name?.trim() || !this.contactForm.email?.trim() || !this.contactForm.message?.trim()) {
      this.submitMessage = 'Please fill in all fields';
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = 'Sending message...';
    
    // Store form data before clearing
    const formData = {
      name: this.contactForm.name,
      email: this.contactForm.email,
      message: this.contactForm.message
    };
    
    // Log form data for testing
    console.log('Form submitted with data:', formData);
    
    // For local testing: Open email client with pre-filled content
    if (isPlatformBrowser(this.platformId)) {
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:guru.s.prashad@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
    }
    
    // Simulate form submission for local testing
    // In production, Netlify Forms will handle this
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitMessage = 'Message sent successfully! I\'ll get back to you soon. (Email client opened for testing)';
      
      // Clear form after successful submission
      this.contactForm = { name: '', email: '', message: '' };
    }, 1000);
  }

  onFormInput() {
    // Clear submit message when user starts typing
    if (this.submitMessage) {
      this.submitMessage = '';
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
}



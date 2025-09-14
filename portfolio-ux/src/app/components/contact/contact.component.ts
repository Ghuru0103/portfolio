import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService, Profile } from '../../services/portfolio.service';

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

  constructor(private portfolioService: PortfolioService) {}

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
    
    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitMessage = 'Thank you! Your message has been sent successfully.';
      this.contactForm = { name: '', email: '', message: '' };
    }, 2000);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

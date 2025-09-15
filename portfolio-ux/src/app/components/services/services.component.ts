import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Profile } from '../../services/portfolio.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  profile: Profile | null = null;
  
  services = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      description: 'End-to-end development using the MERN stack (MySql, Express, Angular, Node.js) — from backend APIs to responsive, user-friendly frontends.',
      icon: '💻',
      active: false
    },
    {
      id: 2,
      title: 'Custom API Development',
      description: 'Secure and scalable REST & GraphQL APIs, designed to integrate with your applications and third-party services.',
      icon: '🔌',
      active: false
    },
    {
      id: 3,
      title: 'Authentication & User Management',
      description: 'Implementation of role-based access, social logins, and secure authentication flows with JWT & OAuth.',
      icon: '🔐',
      active: false
    },
    {
      id: 4,
      title: 'Real-Time Applications',
      description: 'Build live chat systems, notifications, dashboards, and collaborative tools using WebSockets & Socket.IO.',
      icon: '⚡',
      active: false
    },
    // {
    //   id: 5,
    //   title: 'E-Commerce Solutions',
    //   description: 'Complete online store setups with product catalogs, carts, checkout flows, and payment gateway integrations.',
    //   icon: '🛒',
    //   active: false
    // },
    {
      id: 6,
      title: 'Database Design & Optimization',
      description: 'Data aggregation pipelines, indexing, and performance tuning for large datasets.',
      icon: '🗄️',
      active: false
    },
    // {
    //   id: 7,
    //   title: 'Deployment & DevOps',
    //   description: 'Smooth deployment pipelines using Docker, GitHub Actions, and hosting on AWS, DigitalOcean, Vercel, or Netlify.',
    //   icon: '🚀',
    //   active: false
    // },
    {
      id: 8,
      title: 'UI/UX Development',
      description: 'Modern, responsive, and accessible interfaces with React, Material UI, TailwindCSS, and reusable component libraries.',
      icon: '🎨',
      active: false
    },
    {
      id: 9,
      title: 'Third-Party Integrations',
      description: 'Seamless integration with services like Firebase, Twilio, Google Maps, Stripe, Razorpay, PayPal, and more.',
      icon: '🔗',
      active: false
    },
    {
      id: 10,
      title: 'Maintenance & Optimization',
      description: 'Application health checks, performance audits, bug fixes, and continuous improvements for existing projects.',
      icon: '🔧',
      active: false
    },
    // {
    //   id: 11,
    //   title: 'Mobile App Development',
    //   description: 'Cross-platform mobile applications using React Native and Flutter, with native performance and beautiful UI.',
    //   icon: '📱',
    //   active: false
    // },
    // {
    //   id: 12,
    //   title: 'Cloud Architecture',
    //   description: 'Scalable cloud solutions using AWS, Google Cloud, and Azure with microservices architecture and containerization.',
    //   icon: '☁️',
    //   active: false
    // }
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }

  selectService(selectedService: any) {
    // First, deactivate all services
    this.services.forEach(service => {
      service.active = false;
    });
    
    // Then activate the selected service
    selectedService.active = true;
  }

  getServiceSkills(serviceTitle: string): string[] {
    const skillsMap: { [key: string]: string[] } = {
      'Full-Stack Web Development': ['Mysql', 'Express', 'Angular', 'Node.js', 'TypeScript', 'JavaScript', 'Java'],
      'Custom API Development': ['REST APIs', 'Express.js', 'Node.js', 'Postman'],
      'Authentication & User Management': ['JWT', 'OAuth', 'bcrypt', 'Session Management', 'Role-based Access'],
      'Real-Time Applications': ['WebSockets', 'Real-time Databases'],
      // 'E-Commerce Solutions': ['Stripe', 'PayPal', 'Razorpay', 'Shopping Cart', 'Payment Gateway', 'Order Management'],
      'Database Design & Optimization': ['MYSQL', 'PostgreSQL', 'Indexing', 'Aggregation', 'Performance Tuning', 'Data Modeling'],
      // 'Deployment & DevOps': ['Docker', 'AWS', 'DigitalOcean', 'Vercel', 'Netlify', 'GitHub Actions', 'CI/CD'],
      'UI/UX Development': ['Angular', 'React Native', 'Material UI', 'TailwindCSS', 'Responsive Design', 'Accessibility', 'Component Libraries'],
      'Third-Party Integrations': ['Google Maps', 'Razorpay', 'PayPal', 'Social APIs'],
      'Maintenance & Optimization': ['Performance Audits', 'Bug Fixes', 'Code Reviews', 'Security Updates', 'Monitoring'],
      // 'Mobile App Development': ['React Native', 'Flutter', 'Cross-platform', 'Native Performance', 'Mobile UI/UX'],
      // 'Cloud Architecture': ['AWS', 'Google Cloud', 'Azure', 'Microservices', 'Containerization', 'Scalability']
    };
    return skillsMap[serviceTitle] || [];
  }
}

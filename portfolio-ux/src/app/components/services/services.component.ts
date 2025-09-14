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
      title: 'Product Designer',
      projects: 134,
      icon: '🎨',
      active: true
    },
    {
      id: 2,
      title: 'Branding Designer',
      projects: 37,
      icon: '🎭',
      active: false
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      projects: 62,
      icon: '💻',
      active: false
    }
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
      'Product Designer': ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
      'Branding Designer': ['Logo Design', 'Brand Identity', 'Typography', 'Color Theory', 'Illustration', 'Print Design'],
      'Full Stack Developer': ['Angular', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']
    };
    return skillsMap[serviceTitle] || [];
  }
}

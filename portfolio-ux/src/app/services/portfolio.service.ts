import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticDataService } from './static-data.service';

export interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    instagram: string; // Updated from twitter to instagram
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private staticDataService: StaticDataService) { }

  getProfile(): Observable<Profile> {
    return this.staticDataService.getProfile();
  }

  getProjects(): Observable<Project[]> {
    return this.staticDataService.getProjects();
  }

  getExperience(): Observable<Experience[]> {
    return this.staticDataService.getExperience();
  }

  sendContactForm(contactData: ContactForm): Observable<ContactResponse> {
    return this.staticDataService.sendContactForm(contactData);
  }
}




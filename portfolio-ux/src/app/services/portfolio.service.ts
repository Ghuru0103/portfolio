import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    twitter: string;
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

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }
}


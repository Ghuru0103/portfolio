import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile, Project, Experience, ContactForm, ContactResponse } from './portfolio.service';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  
  private profileData: Profile = {
    name: 'GuruPrashad',
    title: 'Full Stack Developer',
    email: 'guru.s.prashad@gmail.com',
    location: 'Madurai, India',
    bio: 'Passionate developer with expertise in modern web technologies.',
    skills: [
      'HTML', 'CSS', 'Tailwind', 'JavaScript', 'TypeScript', 'Angular', 'RxJS',
      'Java', 'Node.js', 'REST API', 'React Native', 'MySQL', 'PostgreSQL', 
      'AWS', 'Git', 'GitLab'
    ],
    social: {
      github: 'https://github.com/Ghuru0103',
      linkedin: 'https://www.linkedin.com/in/guru-prashad-0b702b279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      instagram: 'https://www.instagram.com/ohh_itzz.guruu?igsh=M2t4MGZ3bjZzaWZ1'
    }
  };

  private projectsData: Project[] = [
    {
      id: 1,
      title: 'JewelGrow',
      description: 'Empowering Jewellers, Retail Jewellery Software',
      technologies: ['Angular', 'Node.js', 'TypeScript'],
      image: 'https://via.placeholder.com/400x300',
      src: 'assets/projects/jgrow.png', // Add your project detail image path here
      liveUrl: 'https://app.jewelgrow.com',
      githubUrl: 'https://github.com/yourusername/portfolio'
    },
    {
      id: 2,
      title: 'Dino',
      description: 'Wholesale Jewellery Management System',
      technologies: ['Angular', 'Node.js', 'TypeScript'],
      image: 'https://via.placeholder.com/400x300',
      src: 'assets/projects/jpro.png', // Add your project detail image path here
      liveUrl: 'https://dino.ayou79.in',
      githubUrl: 'https://github.com/yourusername/ecommerce'
    },
    {
      id: 3,
      title: 'Civixo',
      description: 'Empowering Builders, Construction Management Software',
      technologies: ['Angular', 'Node.js', 'TypeScript'],
      image: 'https://via.placeholder.com/400x300',
      src: 'assets/projects/civixo.png', // Add your project detail image path here
      liveUrl: 'https://app.civixo.com/auth/login',
      githubUrl: 'https://github.com/yourusername/ecommerce'
    }
  ];

  private experienceData: Experience[] = [
    {
      id: 1,
      company: 'Tech Company',
      position: 'Senior Developer',
      duration: '2022 - Present',
      description: 'Led development of multiple web applications and mentored junior developers.',
      technologies: ['Angular', 'Node.js', 'AWS', 'Docker']
    },
    {
      id: 2,
      company: 'Startup Inc',
      position: 'Full Stack Developer',
      duration: '2020 - 2022',
      description: 'Built and maintained web applications from scratch using modern technologies.',
      technologies: ['React', 'Express', 'PostgreSQL', 'Redis']
    }
  ];

  getProfile(): Observable<Profile> {
    return of(this.profileData);
  }

  getProjects(): Observable<Project[]> {
    return of(this.projectsData);
  }

  getExperience(): Observable<Experience[]> {
    return of(this.experienceData);
  }

  sendContactForm(contactData: ContactForm): Observable<ContactResponse> {
    // Simulate form submission with a delay
    return new Observable(observer => {
      setTimeout(() => {
        console.log('📧 Contact form submission received:', contactData);
        console.log('\n📧 ===== NEW CONTACT FORM MESSAGE =====');
        console.log(`👤 Name: ${contactData.name}`);
        console.log(`📮 Email: ${contactData.email}`);
        console.log(`💬 Message: ${contactData.message}`);
        console.log(`⏰ Time: ${new Date().toLocaleString()}`);
        console.log('=====================================\n');
        
        observer.next({
          success: true,
          message: 'Message received! Thank you for your interest. I\'ll get back to you soon.'
        });
        observer.complete();
      }, 1000);
    });
  }
}

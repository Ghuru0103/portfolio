import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'education' | 'career' | 'achievement' | 'project' | 'personal';
  icon: string;
}

@Component({
  selector: 'app-story-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-modal.component.html',
  styleUrl: './story-modal.component.scss'
})
export class StoryModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  timelineEvents: TimelineEvent[] = [
    {
      year: '2020',
      title: 'First Steps into Tech',
      description: 'Started my journey with HTML and CSS, building my first website. Fell in love with the creative possibilities of web development.',
      type: 'education',
      icon: '🚀'
    },
    {
      year: '2021',
      title: 'JavaScript Discovery',
      description: 'Dove deep into JavaScript and discovered the power of interactive web applications. Built my first dynamic projects.',
      type: 'education',
      icon: '⚡'
    },
    {
      year: '2022',
      title: 'First Freelance Project',
      description: 'Completed my first paid project - a restaurant website. Learned the importance of client communication and project management.',
      type: 'career',
      icon: '💼'
    },
    {
      year: '2023',
      title: 'Framework Mastery',
      description: 'Mastered React and Angular, built complex applications. Started contributing to open source projects.',
      type: 'achievement',
      icon: '🏆'
    },
    {
      year: '2024',
      title: 'Full-Stack Development',
      description: 'Expanded into backend development with Node.js and databases. Now building end-to-end applications.',
      type: 'career',
      icon: '🔧'
    },
    {
      year: 'Present',
      title: 'Portfolio & Growth',
      description: 'Building this portfolio to showcase my journey and connecting with amazing people in the tech community.',
      type: 'project',
      icon: '🌟'
    }
  ];

  personalStory = {
    intro: "Hi! I'm a passionate developer who believes technology should solve real problems and create beautiful experiences.",
    passion: "I love turning complex ideas into simple, elegant solutions. Every project is a chance to learn something new and push the boundaries of what's possible.",
    values: "I believe in clean code, user-centered design, and continuous learning. The best developers never stop growing.",
    funFacts: [
      "I debug code in my dreams (seriously!)",
      "Coffee is my fuel for late-night coding sessions",
      "I'm always excited to learn new technologies",
      "I believe every bug is a learning opportunity"
    ]
  };

  onClose() {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getEventTypeClass(type: string): string {
    return `timeline-event--${type}`;
  }
}


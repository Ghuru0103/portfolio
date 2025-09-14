import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Profile } from '../../services/portfolio.service';
import { StoryModalComponent } from '../story-modal/story-modal.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, StoryModalComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  profile: Profile | null = null;
  isStoryModalOpen = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProfile().subscribe(data => {
        console.log(data);
      this.profile = data;
    });
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openStoryModal() {
    this.isStoryModalOpen = true;
  }

  closeStoryModal() {
    this.isStoryModalOpen = false;
  }
}

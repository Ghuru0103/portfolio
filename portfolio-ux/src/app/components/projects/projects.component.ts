import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedCategory = 'All';

  categories = ['All', 'Web App', 'Mobile App', 'Design', 'Branding'];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
  }

  getFilteredProjects() {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(this.selectedCategory.toLowerCase())
      )
    );
  }
}

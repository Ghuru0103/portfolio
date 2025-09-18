import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  
  isAnimating = false;
  
  skills = [
    // Frontend Technologies
    {
      id: 1,
      name: 'HTML',
      icon: 'assets/skills/html5.svg'
    },
    {
      id: 2,
      name: 'CSS',
      icon: 'assets/skills/css3.svg'
    },
    {
      id: 3,
      name: 'TAILWIND',
      icon: 'assets/skills/tailwind.svg'
    },
    {
      id: 4,
      name: 'JAVASCRIPT',
      icon: 'assets/skills/javascript.svg'
    },
    {
      id: 5,
      name: 'TYPESCRIPT',
      icon: 'assets/skills/typescript.svg'
    },
    {
      id: 6,
      name: 'ANGULAR',
      icon: 'assets/skills/angular.svg'
    },
    {
      id: 7,
      name: 'RXJS',
      icon: 'assets/skills/read.svg'
    },
    // Backend Technologies
    {
      id: 8,
      name: 'JAVA',
      icon: 'assets/skills/java.svg'
    },
    {
      id: 9,
      name: 'NODE.JS',
      icon: 'assets/skills/nodejs.svg'
    },
    {
      id: 10,
      name: 'REST API',
      icon: 'assets/skills/restAPi.svg'
    },
    // Mobile Development
    {
      id: 11,
      name: 'REACT NATIVE',
      icon: 'assets/skills/react-native.svg'
    },
    // Databases
    {
      id: 12,
      name: 'MYSQL',
      icon: 'assets/skills/mysql.svg'
    },
    {
      id: 13,
      name: 'POSTGRESQL',
      icon: 'assets/skills/postgresql.svg'
    },
    // DevOps/Cloud
    {
      id: 14,
      name: 'AWS',
      icon: 'assets/skills/aws.svg'
    },
    // Version Control
    {
      id: 15,
      name: 'GIT',
      icon: 'assets/skills/git.svg'
    },
    {
      id: 16,
      name: 'GITLAB',
      icon: 'assets/skills/gitLab.svg'
    }
  ];

  constructor() {}

  ngOnInit() {
  }

}

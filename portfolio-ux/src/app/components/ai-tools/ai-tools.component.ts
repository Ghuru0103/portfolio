import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AITool {
  name: string;
  icon: string;
  iconType: 'emoji' | 'svg';
  tagline: string;
  usedFor: string[];
}

@Component({
  selector: 'app-ai-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-tools.component.html',
  styleUrl: './ai-tools.component.scss'
})
export class AiToolsComponent implements OnInit {
  
  aiTools: AITool[] = [
    {
      name: "ChatGPT 5",
      icon: "assets/AI Tools/chatgpt.svg",
      iconType: "svg",
      tagline: "My on-demand coding partner & problem solver",
      usedFor: [
        "Accelerated feature development by auto-generating clean, reusable code",
        "Reduced debugging time by quickly pinpointing edge-case issues",
        "Explained advanced concepts in seconds, making learning lightning-fast",
        "Enhanced projects with image analysis for smarter functionality"
      ]
    },
    {
      name: "Cursor",
      icon: "assets/AI Tools/cursor.svg",
      iconType: "svg",
      tagline: "The ultimate AI-powered IDE booster",
      usedFor: [
        "Streamlined testing & debugging with context-aware suggestions",
        "Built complex modules faster with AI-assisted code scaffolding",
        "Turned design ideas into working code, bridging dev & design",
        "Analyzed legacy/complex codebases for instant clarity & refactoring"
      ]
    },
    {
      name: "Gemini Pro",
      icon: "assets/AI Tools/gemini.svg",
      iconType: "svg",
      tagline: "My creative & analytical powerhouse",
      usedFor: [
        "Conducted deep technical & market research with precision",
        "Generated high-quality images & videos for marketing campaigns",
        "Validated and structured complex JSON data instantly",
        "Blended creativity with technical analysis to enrich deliverables"
      ]
    },
    {
      name: "Perplexity Pro",
      icon: "assets/AI Tools/perplexity.svg",
      iconType: "svg",
      tagline: "The research genius in my toolkit",
      usedFor: [
        "Solved hard, niche problems through advanced research",
        "Automated PDF & document generation for reporting efficiency",
        "Enhanced project documentation with clean, AI-polished content",
        "Turned raw data into professional-grade deliverables in record time"
      ]
    }
  ];

  constructor() {}

  ngOnInit() {
  }

}

import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.05, // Trigger earlier
        rootMargin: '0px 0px -20px 0px' // Reduced margin for faster trigger
      }
    );

    observer.observe(this.el.nativeElement);
  }
}




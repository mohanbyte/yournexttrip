import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'landing',
  imports: [MatTabsModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        // when image enters DOM
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // optional if using *ngIf
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LandingComponent implements OnInit {
  activeImgIndex: number = 0;
  imageUrls: string[] = [
    'https://landing-images-server.harshsriv99.workers.dev/carousel-1.jpg',
    'https://landing-images-server.harshsriv99.workers.dev/carousel-2.jpg',
    'https://landing-images-server.harshsriv99.workers.dev/carousel-3.jpg',
    'https://landing-images-server.harshsriv99.workers.dev/carousel-4.jpg',
  ];
  activeText: string[] = [
    "Women's Safe Travel Platform",
    `Book Hotels, Cabs & More…`,
    'Pay with Easy EMI Options',
    'PLAN YOUR NEXT TRIP WITH US',
  ];
  subTexts: string[] = [
    'Travel without worry with our women tour guides and leads. End-to-end assistance throughout the tour.',
    'Lowest Prices Guaranteed',
    'Plan your next trip without worry with our easy EMI payment options.',
    "EASY EMI OTIONS  II  Women's Safe Travel Platform  II  End to end and Customizable Packages",
  ];
  ngOnInit() {
    // Initialize any necessary data or state here
    this.startImageRotation();
  }
  startImageRotation() {
    setInterval(() => {
      this.activeImgIndex = (this.activeImgIndex + 1) % this.imageUrls.length;
      this.startTypingEffect();
    }, 6000); // Change image every 5 seconds
  }
  typedText = '';
  typingInterval: any;

  ngOnChanges() {}

  startTypingEffect() {
    // Clear any previous interval
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    const fullText = this.activeText[this.activeImgIndex];
    this.typedText = '';
    let charIndex = 0;

    this.typingInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        this.typedText += fullText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 80); // Adjust typing speed here
  }
}

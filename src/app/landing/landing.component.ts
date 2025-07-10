import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { fadeAnimation, slideInAnimation, zoomAnimation } from '../animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'landing',
  imports: [MatTabsModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  animations: [fadeAnimation, zoomAnimation, slideInAnimation],
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
  cities: any[] = [];
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  tours = [];
  ngOnInit() {
    // Initialize any necessary data or state here
    this.startImageRotation();
    this.httpClient
      .get('https://yournexttrip-be.onrender.com/api/v1/city/summary')
      .subscribe((res: any) => {
        console.log(res);
        this.cities = res.cities;
      });

    this.httpClient
      .get('https://yournexttrip-be.onrender.com/api/v1/tour?cityName=varanasi')
      .subscribe((res: any) => {
        console.log(res);
        this.tours = res.tours;
      });
  }
  startImageRotation() {
    setInterval(() => {
      this.activeImgIndex = (this.activeImgIndex + 1) % this.imageUrls.length;
      this.startTypingEffect();
    }, 6000); // Change image every 5 seconds
  }
  navigateTourDetails(index) {
    this.router.navigate(['tourDetails'], {
      queryParams: {
        tour_id: this.tours[index].tour_id,
        city: 'varanasi',
      },
    });
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
  getImageUrl(cityName: string): string {
    const url = `https://landing-images-server.harshsriv99.workers.dev/tourcount/${cityName.toLowerCase()}-tourcount.jpg`;
    console.log(url);
    return url;
  }
  getTourImageUrl(city, index = 0) {
    const url = `https://broken-bird-97d8.harshsriv99.workers.dev/${city}/${
      index + 1
    }.jpg`;
    return url;
  }

  navigateToCity(cityName: string) {
    this.router.navigate(['tour'], {
      queryParams: {
        city: cityName.toLowerCase(),
      },
    });
  }
}

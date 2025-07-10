import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from '../types';
import { CommonModule } from '@angular/common';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'tour',
  imports: [CommonModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss',
})
export class TourComponent implements OnInit {
  city: string = '';
  tours: Tour[] = [];
  citySubText: 'Sky is the limit';
  cityDescription = "What's a description?";
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private tourService: TourService = inject(TourService);
  private httpClient = inject(HttpClient);
  ngOnInit(): void {
    this.city = this.route.snapshot.queryParams['city'];
    this.tourService.tours$.subscribe((res) => {
      this.tours = res;
    });
    this.tourService.getTours(this.city).subscribe((cityDetails) => {
      this.citySubText = cityDetails.subText;
      this.cityDescription = cityDetails.shortDesc;
    });
    window.scrollTo(0, 0);
  }
  navigateTourDetails(index) {
    this.router.navigate(['tourDetails'], {
      queryParams: {
        tour_id: this.tours[index].tour_id,
        city: this.city,
      },
    });
  }
  getImageUrl(cityName: string): string {
    const url = `https://landing-images-server.harshsriv99.workers.dev/tourcount/${cityName.toLowerCase()}-tourcount.jpg`;
    console.log(url);
    return url;
  }
  getTourImageUrl(index) {
    const url = `https://broken-bird-97d8.harshsriv99.workers.dev/${
      this.city
    }/${index + 1}.jpg`;
    return url;
  }
}

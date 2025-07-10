import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tour',
  imports: [CommonModule],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.scss',
})
export class TourComponent implements OnInit {
  city: string = '';
  tours: Tour[] = [];
  private route: ActivatedRoute = inject(ActivatedRoute);
  private httpClient = inject(HttpClient);
  ngOnInit(): void {
    this.city = this.route.snapshot.queryParams['city'];

    this.httpClient
      .get(
        'https://yournexttrip-be.onrender.com/api/v1/tour?cityName=' + this.city
      )
      .subscribe((res: any) => {
        console.log(res);
        this.tours = res;
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

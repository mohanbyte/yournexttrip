import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tourdetails',
  imports: [CommonModule],
  templateUrl: './tourdetails.component.html',
  styleUrl: './tourdetails.component.scss',
})
export class TourdetailsComponent {
  tourDetails = {};
  tourID = '';
  city: '';
  route = inject(ActivatedRoute);
  private tourService: TourService = inject(TourService);
  ngOnInit() {
    this.tourID = this.route.snapshot.queryParams['tour_id'];
    this.city = this.route.snapshot.queryParams['city'];
    this.tourService.tours$.subscribe((tours) => {
      if (tours?.length < 1) {
        this.tourService.getTours(this.city).subscribe((res) => {
          this.tourDetails = this.tourService.getTourById(this.tourID);
        });
      } else {
        this.tourDetails = this.tourService.getTourById(this.tourID);
      }
    });

    console.log(this.tourDetails);
  }
}

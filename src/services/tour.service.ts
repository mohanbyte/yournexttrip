import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private tours = new BehaviorSubject<any[]>([]);
  public tours$ = this.tours.asObservable();
  constructor(private httpClient: HttpClient) {}
  getTours(city) {
    return this.httpClient
      .get('https://yournexttrip-be.onrender.com/api/v1/tour?cityName=' + city)
      .pipe(
        map((res: any) => {
          console.log(res);
          this.tours.next(res.tours);
          return { subText: res.subText, shortDesc: res.shortDesc };
        })
      );
  }

  getTourById(id: string) {
    return this.tours.value.find((tour) => tour.tour_id == id);
  }
}

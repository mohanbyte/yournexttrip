import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TourComponent } from '../tour/tour.component';
import { TourdetailsComponent } from './tourdetails/tourdetails.component';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'tour',
    component: TourComponent,
  },
  {
    path: 'tourDetails',
    component: TourdetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

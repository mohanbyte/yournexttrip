import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';
import { Tour, PricingDetail } from '../../types';

@Component({
  selector: 'tourdetails',
  imports: [CommonModule],
  templateUrl: './tourdetails.component.html',
  styleUrl: './tourdetails.component.scss',
})
export class TourdetailsComponent {
  tourDetails: Tour = {
    _id: '',
    tour_id: '',
    city_id: '',
    price: 0,
    title: '',
    description: '',
    detailedDesc: '',
    time: new Date(),
    duration: '',
    tags: [],
    highlights: [],
    overview: '',
    package_inclusions: [],
    package_exclusions: [],
    add_ons: [],
    information: [],
    pricingDetails: [],
    rating: 0,
    maxGroupSize: 0,
  };

  // Selected pricing information
  selectedTravelers: number = 5;
  selectedPricing: PricingDetail = {
    groupSize: 5,
    basePackageTotal: 19995,
    pricePerPerson: 3999,
    vipAddon: 500,
    finalPerPersonWithVIP: 4499,
  };

  tourID = '';
  city: '';
  route = inject(ActivatedRoute);
  private tourService: TourService = inject(TourService);
  ngOnInit() {
    this.tourID = this.route.snapshot.queryParams['tour_id'];
    this.city = this.route.snapshot.queryParams['city'];

    // Set default fallback data
    this.setDefaultTourData();

    this.tourService.tours$.subscribe((tours) => {
      if (tours?.length < 1) {
        this.tourService.getTours(this.city).subscribe((res) => {
          const fetchedTour = this.tourService.getTourById(this.tourID);
          if (fetchedTour) {
            this.tourDetails = fetchedTour;
            this.updateSelectedPricing();
          }
        });
      } else {
        const fetchedTour = this.tourService.getTourById(this.tourID);
        if (fetchedTour) {
          this.tourDetails = fetchedTour;
          this.updateSelectedPricing();
        }
      }
    });

    console.log(this.tourDetails);
  }

  // Method to update pricing based on selected travelers
  onTravelersChange(event: any) {
    const selectedGroupSize = parseInt(event.target.value);
    this.selectedTravelers = selectedGroupSize;

    // Find the pricing for selected group size
    const pricingData = this.tourDetails.pricingDetails.find(
      (pricing) => pricing.groupSize === selectedGroupSize
    );

    if (pricingData) {
      this.selectedPricing = pricingData;
    }
  }
  getImageUrl(cityName: string): string {
    const url = `https://landing-images-server.harshsriv99.workers.dev/tourcount/${cityName.toLowerCase()}-tourcount.jpg`;
    console.log(url);
    return url;
  }

  // Method to update selected pricing when tour data changes
  private updateSelectedPricing() {
    if (
      this.tourDetails.pricingDetails &&
      this.tourDetails.pricingDetails.length > 0
    ) {
      // Try to find pricing for group of 5, otherwise use the first available
      this.selectedPricing = this.tourDetails.pricingDetails[0];
      this.selectedTravelers = this.selectedPricing.groupSize;
    }
  }

  // Method to generate WhatsApp URL
  getWhatsAppUrl(): string {
    return `https://wa.me/918188007557?text=I'm%20interested%20in%20${this.tourDetails.title}%20(%20₹${this.selectedPricing.pricePerPerson}%20per%20person%20for%20${this.selectedTravelers}%20people%20)`;
  }

  private setDefaultTourData() {
    this.tourDetails = {
      _id: '',
      tour_id: '',
      city_id: '',
      price: 3999,
      title: 'Varanasi 1N 2D Spiritual Tour',
      description:
        'Discover the ancient city of Varanasi with sunrise boat rides, Ganga Aarti, and Sarnath excursion.',
      detailedDesc:
        'Explore Varanasi, the spiritual heart of India, through sacred ghats, mesmerizing Ganga Aarti, centuries-old temples, and the historic Sarnath.',
      time: new Date(),
      duration: '1N 2D',
      tags: ['spiritual', 'boat', 'sunrise', 'heritage'],
      highlights: [
        'Kashi Vishwanath Temple visit',
        'Ganga Aarti at Dashashwamedh Ghat',
        'Sunrise boat ride on the Ganges',
        'Historic Sarnath excursion',
        'Walking tour of local markets',
        'Optional shopping for Banarasi silk',
      ],
      overview:
        'Immerse yourself in the spiritual essence of Varanasi with a 2-day guided tour covering key spiritual and cultural sites with seamless transfers and a sunrise boat ride.',
      package_inclusions: [
        'Private motor boat for sunrise ride',
        'Air-conditioned private cab for transfers',
        'Professional tour guide',
        'Hotel pickup and drop',
        'Airport/Railway Station transfers',
      ],
      package_exclusions: [
        'VIP Darshan tickets at Kashi Vishwanath Temple',
        'Monument entry tickets',
        'Accommodation/Hotel',
        'Lunch',
        'Guide and driver tips',
      ],
      add_ons: [
        'VIP Darshan at Kashi Vishwanath Temple',
        'Optional Banarasi silk shopping',
        'Photography',
      ],
      information: [
        'Carry passport or ID card',
        'Alcohol and drugs not allowed',
        'Tour starts at 05:30 AM',
        'Boat ride depends on river conditions',
        'Lunch not included',
        'VIP entry charges to be paid by the client',
      ],
      pricingDetails: [
        {
          groupSize: 2,
          basePackageTotal: 19995,
          pricePerPerson: 9997.5,
          vipAddon: 500,
          finalPerPersonWithVIP: 10497.5,
        },
        {
          groupSize: 3,
          basePackageTotal: 19995,
          pricePerPerson: 6665,
          vipAddon: 500,
          finalPerPersonWithVIP: 7165,
        },
        {
          groupSize: 4,
          basePackageTotal: 19995,
          pricePerPerson: 4998.75,
          vipAddon: 500,
          finalPerPersonWithVIP: 5498.75,
        },
        {
          groupSize: 5,
          basePackageTotal: 19995,
          pricePerPerson: 3999,
          vipAddon: 500,
          finalPerPersonWithVIP: 4499,
        },
        {
          groupSize: 6,
          basePackageTotal: 23495,
          pricePerPerson: 3915.83,
          vipAddon: 500,
          finalPerPersonWithVIP: 4415.83,
        },
        {
          groupSize: 7,
          basePackageTotal: 26995,
          pricePerPerson: 3856.43,
          vipAddon: 500,
          finalPerPersonWithVIP: 4356.43,
        },
        {
          groupSize: 8,
          basePackageTotal: 30495,
          pricePerPerson: 3811.88,
          vipAddon: 500,
          finalPerPersonWithVIP: 4311.88,
        },
        {
          groupSize: 9,
          basePackageTotal: 33995,
          pricePerPerson: 3777.22,
          vipAddon: 500,
          finalPerPersonWithVIP: 4277.22,
        },
        {
          groupSize: 10,
          basePackageTotal: 37495,
          pricePerPerson: 3749.5,
          vipAddon: 500,
          finalPerPersonWithVIP: 4249.5,
        },
      ],
      rating: 4.8,
      maxGroupSize: 10,
    };

    // Set default selected pricing
    this.selectedPricing =
      this.tourDetails.pricingDetails.find((p) => p.groupSize === 5) ||
      this.tourDetails.pricingDetails[0];
    this.selectedTravelers = this.selectedPricing.groupSize;
  }
}

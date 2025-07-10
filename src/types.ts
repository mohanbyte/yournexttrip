export interface PricingDetail {
  groupSize: number;
  basePackageTotal: number;
  pricePerPerson: number;
  vipAddon?: number;
  finalPerPersonWithVIP?: number;
}

export interface Tour {
  _id: string;
  tour_id: string;
  city_id: string;
  price: number;
  title: string;
  description: string;
  detailedDesc: string;
  time: Date;
  duration: string;
  tags: string[];
  highlights: string[];
  overview: string;
  package_inclusions: string[];
  package_exclusions: string[];
  add_ons: string[];
  information: string[];
  pricingDetails: PricingDetail[];
  rating: number;
  maxGroupSize: number;
}

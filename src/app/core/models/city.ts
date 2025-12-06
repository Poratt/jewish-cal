export interface City {
  city: string;
  country: string;
  fullName: string;
  cityHeb: string;
  countryHeb: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
    elevation?: number;
}

export interface GroupedCity {
  countryHeb: string;
  items: City[];
}
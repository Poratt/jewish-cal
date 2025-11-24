export interface City {
  city: string;
  country: string;
  fullName: string;
  cityHeb: string;
  countryHeb: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
}




export interface GroupedCity {
  countryHeb: string;
  items: City[];
}

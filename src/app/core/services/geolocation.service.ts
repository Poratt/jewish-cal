import { Injectable } from '@angular/core';
import { City } from '../models/city';

interface GeolocationResult {
	success: boolean;
	city?: City;
	error?: string;
	errorCode?: number;
}

interface NominatimResponse {
	address?: {
		city?: string;
		town?: string;
		village?: string;
		municipality?: string;
		country?: string;
		country_code?: string;
	};
}

@Injectable({
	providedIn: 'root'
})
export class GeolocationService {

	private readonly NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/reverse';
	private readonly TIMEOUT = 10000;

	private location!: Location;
	

	//  Detects the user's current location.
	public async detectUserLocation(availableCities: City[]): Promise<GeolocationResult> {
		if (!this.isGeolocationSupported()) {
			return {
				success: false,
				error: 'Geolocation is not supported by this browser.'
			};
		}

		try {
			const position = await this.getCurrentPosition();
			const { latitude, longitude } = position.coords;

			const city = await this.findClosestCity(latitude, longitude, availableCities);

			if (city) {
				return { success: true, city };
			} else {
				return { success: false, error: 'No suitable city found in the available list.' };
			}

		} catch (error: any) {
			return this.handleGeolocationError(error);
		}
	}

	//  Gets the current position from the browser's geolocation API.
	private getCurrentPosition(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: this.TIMEOUT,
				maximumAge: 0
			});
		});
	}

	//  Finds the closest city to the user's location.
	private async findClosestCity(lat: number, lon: number, availableCities: City[]): Promise<City | null> {
		try {
			const cityFromAPI = await this.findCityByAPI(lat, lon, availableCities);
			if (cityFromAPI) {
				return cityFromAPI;
			}
		} catch (error) {
			console.warn('Error detecting city via API, falling back to coordinate range method:', error);
		}

		return this.findCityByCoordinateRange(lat, lon, availableCities);
	}

	//  Identifies a city using the Nominatim API.
	private async findCityByAPI(lat: number, lon: number, availableCities: City[]): Promise<City | null> {
		const url = `${this.NOMINATIM_API_URL}?format=json&lat=${lat}&lon=${lon}&accept-language=en`;

		const response = await fetch(url, {
			headers: {
				'User-Agent': 'Hebrew Calendar App'
			}
		});

		if (!response.ok) {
			throw new Error(`API request failed with status: ${response.status}`);
		}

		const data: NominatimResponse = await response.json();
		const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.municipality;
		const countryCode = data.address?.country_code?.toUpperCase();
		const countryName = data.address?.country;

		if (cityName || countryCode || countryName) {
			let match: City | undefined;

			if (cityName) {
				match = availableCities.find(c => c.city.toLowerCase() === cityName.toLowerCase());
				if (!match) {
					match = availableCities.find(c =>
						c.city.toLowerCase().includes(cityName.toLowerCase()) ||
						cityName.toLowerCase().includes(c.city.toLowerCase())
					);
				}
			}

			if (!match && countryName) {
				match = availableCities.find(c => c.country.toLowerCase() === countryName.toLowerCase());
			}

			if (!match && countryCode) {
				match = this.findMainCityByCountry(countryCode, availableCities) || undefined;
			}

			if (match) {
				return match;
			}
		}

		return null;
	}

	//  Finds a major city by country code.
	private findMainCityByCountry(countryCode: string, cities: City[]): City | null {
		const mainCitiesMap: { [key: string]: string } = {
			'IL': 'Tel Aviv', 'US': 'New York', 'GB': 'London', 'FR': 'Paris', 'CA': 'Toronto',
			'AU': 'Sydney', 'DE': 'Berlin', 'IT': 'Rome', 'ES': 'Madrid', 'NL': 'Amsterdam',
			'BE': 'Brussels', 'CH': 'Zurich', 'AT': 'Vienna', 'SE': 'Stockholm', 'NO': 'Oslo',
			'DK': 'Copenhagen', 'FI': 'Helsinki', 'AR': 'Buenos Aires', 'BR': 'São Paulo',
			'MX': 'Mexico City', 'ZA': 'Johannesburg', 'RU': 'Moscow', 'UA': 'Kyiv',
			'TR': 'Istanbul', 'GR': 'Athens', 'PL': 'Warsaw', 'CZ': 'Prague', 'HU': 'Budapest',
			'RO': 'Bucharest', 'JP': 'Tokyo', 'CN': 'Beijing', 'IN': 'Mumbai', 'SG': 'Singapore',
			'HK': 'Hong Kong', 'NZ': 'Auckland', 'IE': 'Dublin', 'PT': 'Lisbon', 'CL': 'Santiago',
			'CO': 'Bogota', 'PE': 'Lima', 'VE': 'Caracas', 'EG': 'Cairo', 'MA': 'Casablanca',
			'KE': 'Nairobi', 'NG': 'Lagos', 'TH': 'Bangkok', 'PH': 'Manila', 'ID': 'Jakarta',
			'MY': 'Kuala Lumpur', 'KR': 'Seoul', 'TW': 'Taipei'
		};

		const mainCityName = mainCitiesMap[countryCode];
		if (mainCityName) {
			const city = cities.find(c => c.city === mainCityName);
			if (city) {
				return city;
			}
		}

		return cities.find(c => c.countryCode === countryCode) || null;
	}

	//  Finds a city by coordinate range as a fallback.
	private findCityByCoordinateRange(lat: number, lon: number, cities: City[]): City | null {
		// Israel
		if (lat >= 29 && lat <= 33.5 && lon >= 34 && lon <= 36) {
			return cities.find(c => c.city === 'Tel Aviv' || c.city === 'Jerusalem') || null;
		}
		// USA East
		if (lat >= 25 && lat <= 49 && lon >= -125 && lon <= -66) {
			return cities.find(c => c.city === 'New York') || null;
		}
		// UK
		if (lat >= 50 && lat <= 59 && lon >= -8 && lon <= 2) {
			return cities.find(c => c.city === 'London') || null;
		}
		// France
		if (lat >= 42 && lat <= 51 && lon >= -5 && lon <= 8) {
			return cities.find(c => c.city === 'Paris') || null;
		}
		// Germany
		if (lat >= 47 && lat <= 55 && lon >= 6 && lon <= 15) {
			return cities.find(c => c.city === 'Berlin') || null;
		}
		// Italy
		if (lat >= 36 && lat <= 47 && lon >= 6 && lon <= 19) {
			return cities.find(c => c.city === 'Rome') || null;
		}
		// Spain
		if (lat >= 36 && lat <= 44 && lon >= -10 && lon <= 5) {
			return cities.find(c => c.city === 'Madrid') || null;
		}
		// Canada
		if (lat >= 42 && lat <= 70 && lon >= -141 && lon <= -52) {
			return cities.find(c => c.city === 'Toronto' || c.city === 'Montreal') || null;
		}
		// Australia
		if (lat >= -44 && lat <= -10 && lon >= 113 && lon <= 154) {
			return cities.find(c => c.city === 'Sydney' || c.city === 'Melbourne') || null;
		}

		console.warn('No suitable city found for coordinates:', lat, lon);
		return null;
	}

	//  Handles geolocation errors.
	private handleGeolocationError(error: any): GeolocationResult {
		let errorMessage: string;
		let errorCode: number | undefined;

		if (error.code) {
			errorCode = error.code;
			switch (error.code) {
				case 1: // PERMISSION_DENIED
					errorMessage = 'User denied the request for Geolocation.';
					break;
				case 2: // POSITION_UNAVAILABLE
					errorMessage = 'Location information is unavailable.';
					break;
				case 3: // TIMEOUT
					errorMessage = 'The request to get user location timed out.';
					break;
				default:
					errorMessage = 'An unknown error occurred.';
			}
		} else {
			errorMessage = error.message || 'An error occurred while detecting location.';
		}

		console.error('Geolocation Error:', errorMessage, error);

		return { success: false, error: errorMessage, errorCode };
	}

	//  Checks if the browser supports geolocation.
	public isGeolocationSupported(): boolean {
		return 'geolocation' in navigator;
	}
}
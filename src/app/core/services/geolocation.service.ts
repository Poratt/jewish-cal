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
    // אם מצאנו עיר ברדיוס הזה (בק"מ), נשתמש בה ולא נשאל את ה-API
    private readonly MATH_MATCH_THRESHOLD_KM = 15; 

	// Detects the user's current location.
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

            console.log(`📍 GPS Detected: Lat: ${latitude}, Lon: ${longitude}`);

			// 1. Priority: Mathematical Calculation (Nearest neighbor)
			const nearestCityData = this.findNearestCity(latitude, longitude, availableCities);

            // אם מצאנו עיר קרובה מאוד מבחינה מתמטית - קח אותה
            if (nearestCityData && nearestCityData.distance < this.MATH_MATCH_THRESHOLD_KM) {
                console.log(`✅ Match by Math: ${nearestCityData.city.cityHeb} (${nearestCityData.distance.toFixed(2)} km)`);
                return { success: true, city: nearestCityData.city };
            }

			// 2. Secondary: Try API if math wasn't close enough (e.g. user is abroad in a new city)
            console.log('Math match too far or failed, trying API...');
			let city = await this.findCityByAPI(latitude, longitude, availableCities);

            // 3. Fallback to the nearest math city even if it's far, if API failed
			if (!city && nearestCityData) {
                 console.log(`⚠️ API failed, falling back to nearest math city: ${nearestCityData.city.cityHeb}`);
				city = nearestCityData.city;
			}

			if (city) {
				return { success: true, city };
			} else {
				return { success: false, error: 'No suitable city found.' };
			}

		} catch (error: any) {
			return this.handleGeolocationError(error);
		}
	}

	private getCurrentPosition(): Promise<GeolocationPosition> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: true,
				timeout: this.TIMEOUT,
				maximumAge: 0
			});
		});
	}

	private async findCityByAPI(lat: number, lon: number, availableCities: City[]): Promise<City | null> {
		try {
			const url = `${this.NOMINATIM_API_URL}?format=json&lat=${lat}&lon=${lon}&accept-language=en`;
			const response = await fetch(url, { headers: { 'User-Agent': 'Hebrew Calendar App' } });

			if (!response.ok) return null;

			const data: NominatimResponse = await response.json();
			const cityName = data.address?.city || data.address?.town || data.address?.village || data.address?.municipality;
            console.log(`🌍 API returned name: ${cityName}`);

			if (cityName) {
				let match = availableCities.find(c => c.city.toLowerCase() === cityName.toLowerCase());
				if (!match) {
					match = availableCities.find(c =>
						c.city.toLowerCase().includes(cityName.toLowerCase()) ||
						cityName.toLowerCase().includes(c.city.toLowerCase())
					);
				}
				return match || null;
			}
		} catch (error) {
			console.warn('API Geolocation failed:', error);
		}
		return null;
	}

	// Returns the closest city AND the distance
	private findNearestCity(lat: number, lon: number, cities: City[]): { city: City, distance: number } | null {
        const distances = cities
            .filter(city => city.latitude && city.longitude)
            .map(city => ({
                city,
                distance: this.calculateDistanceKm(lat, lon, city.latitude!, city.longitude!)
            }))
            .sort((a, b) => a.distance - b.distance);

        // Log top 3 for debugging
        if (distances.length > 0) {
            console.log('🎯 Top 3 nearest cities:', 
                distances.slice(0, 3).map(d => 
                    `${d.city.cityHeb} (${d.distance.toFixed(2)} km)`
                ).join(', ')
            );
        }

        return distances[0] || null;
	}

	// Haversine formula for accurate distance in km
	private calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

	private handleGeolocationError(error: any): GeolocationResult {
		let errorMessage: string;
        let errorCode: number | undefined;

		if (error.code) {
            errorCode = error.code;
			switch (error.code) {
				case 1: errorMessage = 'User denied the request for Geolocation.'; break;
				case 2: errorMessage = 'Location information is unavailable.'; break;
				case 3: errorMessage = 'The request to get user location timed out.'; break;
				default: errorMessage = 'An unknown error occurred.';
			}
		} else {
			errorMessage = error.message || 'An error occurred while detecting location.';
		}
		console.error('Geolocation Error:', errorMessage, error);
		return { success: false, error: errorMessage, errorCode };
	}

	public isGeolocationSupported(): boolean {
		return 'geolocation' in navigator;
	}
}
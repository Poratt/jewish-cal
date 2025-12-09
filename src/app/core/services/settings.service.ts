import { DOCUMENT } from '@angular/common';
import { Injectable, signal, effect, WritableSignal, inject, Signal, computed } from '@angular/core';
import { getLocationNames, groupCitiesByCountry } from './hebcal-helpers';
import { GeolocationService } from './geolocation.service';
import { City, GroupedCity } from '../models/city';
import { ContentSettings, ContentSettingsDefault } from '../models/content-settings';
import { ZmanimMethodType } from '../models/zmanim-methods';
import { AppSettings, ViewSettings } from '../models/app-settings';
import { NotificationService } from './notification.service';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private geoService = inject(GeolocationService);
	private document = inject(DOCUMENT);
	private notificationService = inject(NotificationService);

	// This is the single name we use to save all settings in the browser's local storage.
	private readonly SETTINGS_KEY = 'hebrew_calendar_app_settings';

	// This is our main signal that holds all the app's settings in one object.
	private settingsSource: WritableSignal<AppSettings>;

	// These are read-only signals that components can use to get specific settings.
	public readonly contentSettingsSignal: Signal<ContentSettings>;
	public readonly selectedLocationSignal: Signal<City | null>;
	public readonly borderBrightnessSignal: Signal<number>;
	public readonly themeColorSignal: Signal<string>;
	public readonly selectedFontSignal: Signal<string>;
	public readonly themeOpacitySignal: Signal<number>;
	public readonly zmanimMethodSignal: Signal<ZmanimMethodType>;
	
	// These signals are for temporary data and are not saved.
	public readonly userCurrentLocationSignal: Signal<City | null>;
	public readonly groupedCitiesSignal: Signal<GroupedCity[]>;
	public readonly printRequestSignal: Signal<{ startDate: Date, endDate: Date, sets: number } | null>;

	private userCurrentLocationSource: WritableSignal<City | null> = signal(null); 
	private groupedCitiesSource: WritableSignal<GroupedCity[]> = signal([]);
	private printRequestSource: WritableSignal<{ startDate: Date, endDate: Date, sets: number } | null> = signal(null);

	constructor() {
		this.settingsSource = signal(this.loadSettings());

		// Create read-only signals from our main settings object.
		this.contentSettingsSignal = computed(() => this.settingsSource().content);
		this.selectedLocationSignal = computed(() => this.settingsSource().location);
		this.borderBrightnessSignal = computed(() => this.settingsSource().view.borderBrightness);
		this.themeColorSignal = computed(() => this.settingsSource().view.themeColor);
		this.selectedFontSignal = computed(() => this.settingsSource().view.font);
		this.themeOpacitySignal = computed(() => this.settingsSource().view.themeOpacity);
		this.zmanimMethodSignal = computed(() => this.settingsSource().zmanimMethod);

		this.userCurrentLocationSignal = this.userCurrentLocationSource.asReadonly();
		this.groupedCitiesSignal = this.groupedCitiesSource.asReadonly();
		this.printRequestSignal = this.printRequestSource.asReadonly();

		this.initializeCitiesAndLocation();
		this.setupPersistenceEffect();
		this.setupFontEffect();
	}

	// --- Public Methods for Components to Update Settings ---

	public updateContentSettings(newSettings: ContentSettings): void {
		this.settingsSource.update(current => ({ ...current, content: newSettings }));
	}

	public updateViewSetting(key: keyof ViewSettings, value: any): void {
		this.settingsSource.update(current => ({
			...current,
			view: { ...current.view, [key]: value }
		}));
	}

	public updateLocation(location: City | null): void {
		this.settingsSource.update(current => ({ ...current, location }));
	}

	// Gra || Mra
	public updateZmanimMethod(method: ZmanimMethodType): void {
		this.settingsSource.update(current => ({ ...current, zmanimMethod: method }));
	}
	
    public triggerPrint(data: { startDate: Date, endDate: Date, sets: number }): void {	
		this.printRequestSource.set(data);
	}

	public resetPrintRequest(): void {
		this.printRequestSource.set(null);
	}

    public async setCurrentLocation(): Promise<void> {
		const allLocations = getLocationNames();
		const userLocationResult = await this.geoService.detectUserLocation(allLocations);
		
		if (userLocationResult.success && userLocationResult.city) {
			this.updateLocation(userLocationResult.city);
      this.userCurrentLocationSource.set(userLocationResult.city);
			this.notificationService.toast({
				severity: 'success',
				summary: 'מיקום עודכן',
				detail: `המיקום שלך עודכן ל${userLocationResult.city.cityHeb}`,
				life: 3000
			});
		} else {
			console.warn('Could not detect current location:', userLocationResult.error);
			this.notificationService.toast({
				severity: 'error',
				summary: 'זיהוי מיקום נכשל',
				detail: 'יש לאפשר שירותי מיקום כדי להשתמש באפשרות זו.',
				life: 5000
			});
		}
	}

	// --- Setup Methods ---

	private async initializeCitiesAndLocation(): Promise<void> {
		const allLocations = getLocationNames();
		this.groupedCitiesSource.set(groupCitiesByCountry(allLocations));

		// Try to find user's location automatically.
        this.geoService.detectUserLocation(allLocations).then(result => {
            if (result.success && result.city) {
                this.userCurrentLocationSource.set(result.city);
                
                // If no location is saved, use the one we found.
                if (!this.selectedLocationSignal()) {
                    this.updateLocation(result.city);
                }
            }
        });

		// If we still don't have a location, use Tel Aviv as a default.
		if (!this.selectedLocationSignal()) {
			const telAviv = allLocations.find(c => c.city === 'Tel Aviv');
			if (telAviv) {
				this.updateLocation(telAviv);
			}
		}
	}

	private setupPersistenceEffect(): void {
		// This `effect` automatically saves all settings to the browser's memory
		// whenever the main `settingsSource` signal changes.
		effect(() => {
			const settings = this.settingsSource();
			localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
		});
	}

	private setupFontEffect(): void {
		// This `effect` watches for font changes and updates the website's style accordingly.
		effect(() => {
			const font = this.selectedFontSignal();
			this.document.documentElement.style.setProperty('--selected-font-family', font);
		});
	}

	// --- Loading and Saving Logic ---

	private loadSettings(): AppSettings {
		const savedItem = localStorage.getItem(this.SETTINGS_KEY);
		
		if (savedItem) {
			try {
				// Simply parse and return the saved settings.
				const parsedSettings = JSON.parse(savedItem);
				return parsedSettings;
			} catch (e) {
				console.error("Could not read saved settings. Using defaults.", e);
			}
		}

		// If nothing is saved or parsing failed, return default settings.
		return this.getDefaultSettings();
	}

	private getDefaultSettings(): AppSettings {
		return {
			view: {
				borderBrightness: 85,
				themeColor: '#3b82f6',
				themeOpacity: 4,
				font: "'Fredoka', sans-serif",
			},
			content: JSON.parse(JSON.stringify(ContentSettingsDefault)),
			location: null,
			zmanimMethod: ZmanimMethodType.Gra,
		};
	}
}
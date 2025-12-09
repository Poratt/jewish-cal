import { DOCUMENT } from '@angular/common';
import { Injectable, signal, effect, WritableSignal, inject, Signal } from '@angular/core';
import { getLocationNames, groupCitiesByCountry } from './hebcal-helpers';
import { GeolocationService } from './geolocation.service';
import { City, GroupedCity } from '../models/city';
import { ContentSettings, ContentSettingsDefault, ViewSettingType } from '../models/content-settings';
import { DailyLearningVisibility } from '../models/learning';
import { ZmanimVisibility } from '../models/zman';
import { ZmanimMethodType } from '../models/zmanim-methods';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {

	private geoService = inject(GeolocationService);
	private document = inject(DOCUMENT);

	private readonly DEFAULT_FONT = "'Fredoka', sans-serif";
	private readonly BORDER_OPACITY = 'border_brightness';
	private readonly THEME = 'theme_color';
	private readonly CONTENT_SETTINGS = 'content_settings';
	private readonly SELECTED_FONT = 'selected-font';
	private readonly LOCATION = 'location';
	private readonly BG_OPACITY = 'bg_opacity';
	private readonly ZMANIM_METHOD = 'zmanim_method';

	private contentSettingsSource: WritableSignal<ContentSettings>;
	private selectedLocationSource: WritableSignal<City | null>;
	private userCurrentLocationSource: WritableSignal<City | null> = signal(null); 
	private groupedCitiesSource: WritableSignal<GroupedCity[]>;
	private borderBrightnessSource: WritableSignal<number>;
	private themeColorSource: WritableSignal<string>;
	private themeOpacitySource: WritableSignal<number>;
	private selectedFontSource: WritableSignal<string>;
	private zmanimMethodSource: WritableSignal<ZmanimMethodType>;
	private printRequestSource: WritableSignal<{ startDate: Date, endDate: Date, sets: number } | null>;

	public readonly contentSettingsSignal: Signal<ContentSettings>;
	public readonly selectedLocationSignal: Signal<City | null>;
	public readonly userCurrentLocationSignal: Signal<City | null>;
	public readonly groupedCitiesSignal: Signal<GroupedCity[]>;
	public readonly borderBrightnessSignal: Signal<number>;
	public readonly themeColorSignal: Signal<string>;
	public readonly selectedFontSignal: Signal<string>;
	public readonly themeOpacitySignal: Signal<number>;
	public readonly zmanimMethodSignal: Signal<ZmanimMethodType>;
	public readonly printRequestSignal: Signal<{ startDate: Date, endDate: Date, sets: number } | null>;

	constructor() {
		this.contentSettingsSource = signal(this.loadContentSettings());
		this.selectedLocationSource = signal(this.loadSelectedLocation());
		this.groupedCitiesSource = signal<GroupedCity[]>([]);
		this.borderBrightnessSource = signal(this.loadFromStorage(this.BORDER_OPACITY, 85));
		this.themeColorSource = signal(this.loadFromStorage(this.THEME, '#3b82f6'));
		this.selectedFontSource = signal(this.loadFromStorage(this.SELECTED_FONT, this.DEFAULT_FONT));
		this.themeOpacitySource = signal(this.loadFromStorage(this.BG_OPACITY, 4));
		this.zmanimMethodSource = signal(this.loadFromStorage(this.ZMANIM_METHOD, ZmanimMethodType.Gra));
		this.printRequestSource = signal(null);

		this.contentSettingsSignal = this.contentSettingsSource.asReadonly();
		this.selectedLocationSignal = this.selectedLocationSource.asReadonly();
        this.userCurrentLocationSignal = this.userCurrentLocationSource.asReadonly();
		this.groupedCitiesSignal = this.groupedCitiesSource.asReadonly();
		this.borderBrightnessSignal = this.borderBrightnessSource.asReadonly();
		this.themeColorSignal = this.themeColorSource.asReadonly();
		this.selectedFontSignal = this.selectedFontSource.asReadonly();
		this.themeOpacitySignal = this.themeOpacitySource.asReadonly();
		this.zmanimMethodSignal = this.zmanimMethodSource.asReadonly();
		this.printRequestSignal = this.printRequestSource.asReadonly();

		this.initializeCitiesAndLocation();
		this.setupPersistenceEffects();
		this.setupFontEffect();
	}

	public updateContentSettings(newSettings: ContentSettings): void {
		this.contentSettingsSource.set(newSettings);
	}

	public updateSettings(type: ViewSettingType, value: any): void {
		switch (type) {
			case 'location': this.selectedLocationSource.set(value); break;
			case 'borderBrightness': this.borderBrightnessSource.set(value); break;
			case 'shabbatColor': this.themeColorSource.set(value); break;
			case 'shabbatOpacity': this.themeOpacitySource.set(value); break;
			case 'font': this.selectedFontSource.set(value); break;
			default: console.warn('Unknown setting type:', type); break;
		}
	}

	public updateZmanimMethod(method: ZmanimMethodType): void {
		this.zmanimMethodSource.set(method);
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
			this.selectedLocationSource.set(userLocationResult.city);
            this.userCurrentLocationSource.set(userLocationResult.city);
		} else {
			console.warn('Could not detect current location');
		}
	}

	private async initializeCitiesAndLocation(): Promise<void> {
		const allLocations = getLocationNames();
		this.groupedCitiesSource.set(groupCitiesByCountry(allLocations));

        this.geoService.detectUserLocation(allLocations).then(result => {
            if (result.success && result.city) {
                this.userCurrentLocationSource.set(result.city);
                
                if (!this.selectedLocationSource()) {
                    this.selectedLocationSource.set(result.city);
                }
            }
        });

		if (!this.selectedLocationSource()) {
			const telAviv = allLocations.find(c => c.city === 'Tel Aviv');
			if (telAviv) {
				this.selectedLocationSource.set(telAviv);
			}
		}
	}

	private setupPersistenceEffects(): void {
		effect(() => this.saveToStorage(this.CONTENT_SETTINGS, this.contentSettingsSource()));
		effect(() => this.saveToStorage(this.LOCATION, this.selectedLocationSource()));
		effect(() => this.saveToStorage(this.BORDER_OPACITY, this.borderBrightnessSource()));
		effect(() => this.saveToStorage(this.THEME, this.themeColorSource()));
		effect(() => this.saveToStorage(this.SELECTED_FONT, this.selectedFontSource()));
		effect(() => this.saveToStorage(this.BG_OPACITY, this.themeOpacitySource()));
		effect(() => this.saveToStorage(this.ZMANIM_METHOD, this.zmanimMethodSource()));
	}

	private setupFontEffect(): void {
		effect(() => {
			const font = this.selectedFontSource();
			this.document.documentElement.style.setProperty('--selected-font-family', font);
		});
	}

	private loadContentSettings(): ContentSettings {
		const saved = localStorage.getItem(this.CONTENT_SETTINGS);
		const defaultSettings = this.getDefaultContentSettings();

		if (!saved) {
			return defaultSettings;
		}

		try {
			const loadedSettings = JSON.parse(saved);
			const mergedSettings = { ...defaultSettings, ...loadedSettings };


			mergedSettings.dailyLearningVisibility = this.mergeVisibility(
				defaultSettings.dailyLearningVisibility,
				loadedSettings.dailyLearningVisibility || {}
			);

			mergedSettings.zmanimVisibility = this.mergeVisibility(
				defaultSettings.zmanimVisibility,
				loadedSettings.zmanimVisibility || {}
			);

			return mergedSettings;
		} catch (e) {
			console.error("Failed to parse content settings from localStorage, returning default.", e);
			return defaultSettings;
		}
	}

	private mergeVisibility<T extends ZmanimVisibility | DailyLearningVisibility>(defaultVis: T, loadedVis: Partial<T>): T {
		const result: T = { ...defaultVis };
		for (const key of Object.keys(defaultVis)) {
			if (key in loadedVis && typeof (loadedVis as any)[key] === 'boolean') {
				(result as any)[key] = (loadedVis as any)[key];
			}
		}
		return result;
	}

	private loadSelectedLocation(): City | null {
		return this.loadFromStorage<City | null>(this.LOCATION, null);
	}

	private loadFromStorage<T>(key: string, defaultValue: T): T {
		const item = localStorage.getItem(key);
		if (item === null) return defaultValue;
		try {
			const parsed = JSON.parse(item);
			// Handle case where saved value is just a string, not JSON
			return typeof parsed === 'string' && typeof defaultValue !== 'string' ? JSON.parse(parsed) : parsed;
		} catch(e) {
			// If JSON.parse fails, it might be a raw string value.
			return item as unknown as T;
		}
	}

	private saveToStorage<T>(key: string, value: T): void {
		if (value !== null && value !== undefined) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}

	private getDefaultContentSettings(): ContentSettings {
		return JSON.parse(JSON.stringify(ContentSettingsDefault));
	}
}
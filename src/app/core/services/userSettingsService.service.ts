import { DOCUMENT } from '@angular/common';
import { Injectable, signal, effect, WritableSignal, inject, Signal } from '@angular/core';
import { getLocationNames, groupCitiesByCountry } from './hebcal-helpers';
import { GeolocationService } from './geolocation.service';
import { City, GroupedCity } from '../models/city';
import { ContentSettings, ContentSettingsDefault, ViewSettingType } from '../models/content-settings';
import { DailyLearningVisibility, LearningEnumData } from '../models/learning';
import { ZmanimVisibility, ZmanimEnumData } from '../models/zman';

@Injectable({
	providedIn: 'root'
})
export class UserSettingsService {

	private geoService = inject(GeolocationService);
	private document = inject(DOCUMENT);


	private readonly APP_FONT_FAMILY = "'Fredoka', sans-serif";
	private readonly BORDER_BRIGHTNESS_KEY = 'calendar_border_brightness';
	private readonly SHABBAT_HOLIDAY_COLOR_KEY = 'calendar_shabbat_holiday_color';
	private readonly CONTENT_SETTINGS_KEY = 'calendar_content_settings';
	private readonly FONT_KEY = 'calendar_font';
	private readonly LOCATION_KEY = 'calendar_location';
	private readonly SHABBAT_BG_OPACITY_KEY = 'calendar_shabbat_bg_opacity';


	private contentSettingsSource: WritableSignal<ContentSettings>;
	private selectedLocationSource: WritableSignal<City | null>;
	private groupedCitiesSource: WritableSignal<GroupedCity[]>;
	private borderBrightnessSource: WritableSignal<number>;
	private shabbatHolidayColorSource: WritableSignal<string>;
	private selectedFontSource: WritableSignal<string>;
	private shabbatBackgroundOpacitySource: WritableSignal<number>;
	private printRequestSource: WritableSignal<{ startDate: Date, endDate: Date, sets: number } | null>;


	public readonly contentSettingsSignal: Signal<ContentSettings>;
	public readonly selectedLocationSignal: Signal<City | null>;
	public readonly groupedCitiesSignal: Signal<GroupedCity[]>;
	public readonly borderBrightnessSignal: Signal<number>;
	public readonly shabbatHolidayColorSignal: Signal<string>;
	public readonly selectedFontSignal: Signal<string>;
	public readonly shabbatBackgroundOpacitySignal: Signal<number>;
	public readonly printRequestSignal: Signal<{ startDate: Date, endDate: Date, sets: number } | null>;

	constructor() {

		this.contentSettingsSource = signal(this.loadContentSettings());
		this.selectedLocationSource = signal(this.loadSelectedLocation());
		this.groupedCitiesSource = signal<GroupedCity[]>([]);
		this.borderBrightnessSource = signal(this.loadFromStorage(this.BORDER_BRIGHTNESS_KEY, 85));
		this.shabbatHolidayColorSource = signal(this.loadFromStorage(this.SHABBAT_HOLIDAY_COLOR_KEY, '#3b82f6'));
		this.selectedFontSource = signal(this.loadFromStorage(this.FONT_KEY, this.APP_FONT_FAMILY));
		this.shabbatBackgroundOpacitySource = signal(this.loadFromStorage(this.SHABBAT_BG_OPACITY_KEY, 0.04));
		this.printRequestSource = signal(null);


		this.contentSettingsSignal = this.contentSettingsSource.asReadonly();
		this.selectedLocationSignal = this.selectedLocationSource.asReadonly();
		this.groupedCitiesSignal = this.groupedCitiesSource.asReadonly();
		this.borderBrightnessSignal = this.borderBrightnessSource.asReadonly();
		this.shabbatHolidayColorSignal = this.shabbatHolidayColorSource.asReadonly();
		this.selectedFontSignal = this.selectedFontSource.asReadonly();
		this.shabbatBackgroundOpacitySignal = this.shabbatBackgroundOpacitySource.asReadonly();
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
			case 'shabbatColor': this.shabbatHolidayColorSource.set(value); break;
			case 'shabbatOpacity': this.shabbatBackgroundOpacitySource.set(value); break;
			case 'font': this.selectedFontSource.set(value); break;
			default: console.warn('Unknown setting type:', type); break;
		}
	}
	public triggerPrint(data: { startDate: Date, endDate: Date, sets: number }): void {	
		this.printRequestSource.set(data);
	}

	public resetPrintRequest(): void {
		this.printRequestSource.set(null);
	}


	private async initializeCitiesAndLocation(): Promise<void> {
		const allLocations = getLocationNames();
		this.groupedCitiesSource.set(groupCitiesByCountry(allLocations));

		if (!this.selectedLocationSource()) {
			const userLocationResult = await this.geoService.detectUserLocation(allLocations);
			if (userLocationResult.success && userLocationResult.city) {
				this.selectedLocationSource.set(userLocationResult.city);
			} else {
				const telAviv = allLocations.find(c => c.city === 'Tel Aviv');
				if (telAviv) {
					this.selectedLocationSource.set(telAviv);
				}
			}
		}
	}


	private setupPersistenceEffects(): void {
		effect(() => this.saveToStorage(this.CONTENT_SETTINGS_KEY, this.contentSettingsSource()));
		effect(() => this.saveToStorage(this.LOCATION_KEY, this.selectedLocationSource()));
		effect(() => this.saveToStorage(this.BORDER_BRIGHTNESS_KEY, this.borderBrightnessSource()));
		effect(() => this.saveToStorage(this.SHABBAT_HOLIDAY_COLOR_KEY, this.shabbatHolidayColorSource()));
		effect(() => this.saveToStorage(this.FONT_KEY, this.selectedFontSource()));
		effect(() => this.saveToStorage(this.SHABBAT_BG_OPACITY_KEY, this.shabbatBackgroundOpacitySource()));
	}

	private setupFontEffect(): void {
		effect(() => {
			const font = this.selectedFontSource();
			this.document.documentElement.style.setProperty('--selected-font-family', font);
		});
	}

	private loadContentSettings(): ContentSettings {
		const saved = localStorage.getItem(this.CONTENT_SETTINGS_KEY);
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
		return this.loadFromStorage<City | null>(this.LOCATION_KEY, null);
	}

	private loadFromStorage<T>(key: string, defaultValue: T): T {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue;
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
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, LowerCasePipe } from '@angular/common';

import { slideDown } from '../../core/constants/animations';
import { Colors } from '../../core/models/colors';
import { FontOptions } from '../../core/constants/font-options';
import { City } from '../../core/models/city';
import { ViewSettings } from '../../core/models/app-settings';
import { ZmanimEnumData } from '../../core/models/zman';
import { LearningEnumData } from '../../core/models/learning';
import { EnumData } from '../../core/models/enumData';
import { ContentSettings, ContentSettingsEnumData, ContentSettingsSections } from '../../core/models/content-settings';
import { SettingsService } from '../../core/services/settings.service';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ColorPickerComponent } from "../shared/color-picker/color-picker.component";

type ExpansionSection = 'events' | 'learning' | 'zmanim' | '';

export interface FontOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-drawer',
  standalone: true,
  templateUrl: './settings-drawer.component.html',
  styleUrls: ['./settings-drawer.component.scss'],
  imports: [
    CommonModule, FormsModule, CheckboxModule, ButtonModule, SelectModule,
    SliderModule, DatePickerModule, InputNumberModule, TooltipModule, LowerCasePipe,
    ColorPickerComponent
],
  animations: [slideDown]
})
export class SettingsDrawerComponent {

  public readonly settingsService = inject(SettingsService);

  public contentSettings = this.settingsService.contentSettingsSignal;
  public selectedLocation = this.settingsService.selectedLocationSignal;
  public userCurrentLocation = this.settingsService.userCurrentLocationSignal;
  public groupedCities = this.settingsService.groupedCitiesSignal;
  public borderBrightness = this.settingsService.borderBrightnessSignal;
  public themeColor = this.settingsService.themeColorSignal;
  public selectedFont = this.settingsService.selectedFontSignal;
  public themeOpacity = this.settingsService.themeOpacitySignal;

  public expandedSection = signal<ExpansionSection>('events')
  public isLocating = signal<boolean>(false);

  public printRangeError = signal<string | null>(null);
  public printSets = signal<number>(1);
  public printStartDate = signal<Date>(new Date());
  public printEndDate = signal<Date>(new Date());

  
  public readonly fontOptions = signal<FontOption[]>(FontOptions);
  public readonly colors = signal<string[]>(Colors);
  public readonly ZmanimEnumData = signal<EnumData[]>(ZmanimEnumData);
  public readonly LearningEnumData = signal<EnumData[]>(LearningEnumData);
  public readonly ContentSettingsEnumData = signal<EnumData[]>(ContentSettingsEnumData);

  public readonly maxLearningToShow = signal<number>(3);
  public learningCheckedCount = computed(() => {
    const visibility = this.contentSettings()?.dailyLearningVisibility;
    return visibility ? Object.values(visibility).filter(Boolean).length : 0;
  });

  public readonly maxZmanimToShow = signal<number>(3);
  public zmanimCheckedCount = computed(() => {
    const visibility = this.contentSettings()?.zmanimVisibility;
    return visibility ? Object.values(visibility).filter(Boolean).length : 0;
  });

  public showLocationResetButton = computed(() => {
    const current = this.selectedLocation();
    const detected = this.userCurrentLocation();

    if (!detected) return true;

    if (current && detected) {
      return current.city !== detected.city;
    }

    return true;
  });

  constructor() {
    const today = new Date();
    this.printStartDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
    this.printEndDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  public toggleExpansion(section: ExpansionSection): void {
      this.expandedSection.set(section)
    
  }

  public onContentSettingChange(currentValue: boolean, settingKey: string, group: ContentSettingsSections): void {
    const newValue = !currentValue;
    const currentSettings = this.contentSettings();
    if (!currentSettings) return;

    let newSettings: ContentSettings;

    switch (group) {
      case 'general':
        newSettings = { ...currentSettings, [settingKey]: newValue };
        break;
      case 'dailyLearning':
        const newLearningVisibility = { ...currentSettings.dailyLearningVisibility, [settingKey]: newValue };
        newSettings = { ...currentSettings, dailyLearningVisibility: newLearningVisibility };
        break;
      case 'zmanim':
        const newZmanimVisibility = { ...currentSettings.zmanimVisibility, [settingKey]: newValue };
        newSettings = { ...currentSettings, zmanimVisibility: newZmanimVisibility };
        break;
      default:
        console.warn('Unknown content setting group:', group);
        return;
    }
    this.settingsService.updateContentSettings(newSettings);
  }

  public onSettingUpdate(type: 'location' | keyof ViewSettings, value: any): void {
    if (type === 'location') {
      this.settingsService.updateLocation(value as City);
    } else {
      this.settingsService.updateViewSetting(type, value);
    }
  }
  
   public async setCurrentLocation(): Promise<void> {
    this.isLocating.set(true);
    try {
        await this.settingsService.setCurrentLocation();
    } finally {
        this.isLocating.set(false);
    }
  }

  public prepareAndPrint(): void {
    this.printRangeError.set(null);
    const sets = this.printSets();
    if (sets < 1) {
      this.printSets.set(1);
    }

    const startDate = new Date(this.printStartDate().getFullYear(), this.printStartDate().getMonth(), 1);
    const endDate = new Date(this.printEndDate().getFullYear(), this.printEndDate().getMonth(), 1);

    if (startDate > endDate) {
      this.printRangeError.set('תאריך ההתחלה חייב להיות לפני תאריך הסיום');
      return;
    }

    this.settingsService.triggerPrint({ startDate, endDate, sets: this.printSets() });
  }
}
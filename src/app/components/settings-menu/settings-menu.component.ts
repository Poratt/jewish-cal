import { Component, signal, effect, inject, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button'; // Ensure ButtonModule is imported
import { TooltipModule } from 'primeng/tooltip'; // Ensure TooltipModule is imported
import { slideDown } from '../../core/constants/animations';
import { ContentSettingsEnumData, ContentSettings, ViewSettingType, ContentSettingsSections } from '../../core/models/content-settings';
import { EnumData } from '../../core/models/enumData';
import { LearningEnumData } from '../../core/models/learning';
import { ZmanimEnumData } from '../../core/models/zman';
import { SettingsService } from '../../core/services/settings.service';
import { FontOptions } from '../../core/constants/font-options';
import { Colors } from '../../core/models/colors';

interface FontOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTabsModule, CheckboxModule, DatePickerModule,
    InputNumberModule, SelectModule, SliderModule, ButtonModule, TooltipModule
  ],
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  animations: [slideDown]
})
export class SettingsMenuComponent {

  private settingsService = inject(SettingsService);

  public contentSettings = this.settingsService.contentSettingsSignal;
  public selectedLocation = this.settingsService.selectedLocationSignal;
  // New signal for the detected location
  public userCurrentLocation = this.settingsService.userCurrentLocationSignal; 
  
  public groupedCities = this.settingsService.groupedCitiesSignal;
  public borderBrightness = this.settingsService.borderBrightnessSignal;
  public shabbatHolidayColor = this.settingsService.shabbatHolidayColorSignal;
  public selectedFont = this.settingsService.selectedFontSignal;
  public shabbatBackgroundOpacity = this.settingsService.shabbatBackgroundOpacitySignal;

  public printRangeError = signal<string | null>(null);
  public printSets = signal<number>(1);
  public printStartDate = signal<Date>(new Date());
  public printEndDate = signal<Date>(new Date());

  public readonly fontOptions = signal<FontOption[]>(FontOptions);
  public readonly colors = signal<string[]>(Colors);
  public readonly ZmanimEnumData = signal<EnumData[]>(ZmanimEnumData);
  public readonly LearningEnumData = signal<EnumData[]>(LearningEnumData);
  public readonly ContentSettingsEnumData = signal<EnumData[]>(ContentSettingsEnumData);

  public reversedBorderBrightness = computed(() => 100 - this.borderBrightness());

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
    
    // If we haven't detected a location yet, show the button so user can try to trigger detection
    if (!detected) return true;
    
    // If we have both, show only if they are different (by city name)
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

  public onContentSettingChange(newValue: boolean, settingKey: string, group: ContentSettingsSections): void {
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

  public onSettingUpdate(type: ViewSettingType, value: any): void {
    this.settingsService.updateSettings(type, value)
  }

  public setCurrentLocation(): void {
      this.settingsService.setCurrentLocation();
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
// src/app/components/settings-menu/settings-menu.component.ts

import { Component, signal, effect, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { slideDown } from '../../core/constants/animations';
import { City } from '../../core/models/city';
import { ContentSettingsEnumData, ContentSettings } from '../../core/models/content-settings';
import { EnumMetadata } from '../../core/models/enumData';
import { LearningEnumData, DailyLearningVisibility } from '../../core/models/learning';
import { ZmanimEnumData, ZmanimVisibility } from '../../core/models/zman';
import { UserSettingsService } from '../../core/services/userSettingsService.service';

interface FontOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTabsModule, CheckboxModule, DatePickerModule,
    InputNumberModule, SelectModule, SliderModule, SelectButtonModule, ColorPickerModule
  ],
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css'],
  animations: [slideDown]
})
export class SettingsMenuComponent {
  private userSettingsService = inject(UserSettingsService);

  // Read signals directly from the service
  public contentSettings = this.userSettingsService.contentSettingsSignal;
  public selectedLocation = this.userSettingsService.selectedLocationSignal;
  public groupedCities = this.userSettingsService.groupedCitiesSignal;
  public borderBrightness = this.userSettingsService.borderBrightnessSignal;
  public shabbatHolidayColor = this.userSettingsService.shabbatHolidayColorSignal;
  public selectedFont = this.userSettingsService.selectedFontSignal;
  public shabbatBackgroundOpacity = this.userSettingsService.shabbatBackgroundOpacitySignal;

  // Local signals for form values
  public printRangeError = signal<string | null>(null);
  public printSets = signal<number>(1);
  public printStartDate = signal<Date>(new Date());
  public printEndDate = signal<Date>(new Date());
  
  // Learning limit
  public readonly maxLearningToShow = 3;
  public learningCheckedCount = computed(() => {
    const visibility = this.contentSettings()?.dailyLearningVisibility;
    if (!visibility) {
      return 0;
    }
    const checkedItems = Object.entries(visibility).filter(([key, value]) => value === true);
    const count = checkedItems.length;
    return count;
  });

  public learningSelectionError = computed(() => {
    if (this.learningCheckedCount() >= this.maxLearningToShow) {
      return `ניתן לבחור עד ${this.maxLearningToShow} נושאי לימוד`;
    }
    return null;
  });
  
  // Zmanim limit
  public readonly maxZmanimToShow = 3;
  public zmanimCheckedCount = computed(() => {
    const visibility = this.contentSettings()?.zmanimVisibility;
    if (!visibility) {
      return 0;
    }
    return Object.values(visibility).filter(Boolean).length;
  });

  public zmanimSelectionError = computed(() => {
    if (this.zmanimCheckedCount() >= this.maxZmanimToShow) {
      return `ניתן לבחור עד ${this.maxZmanimToShow} זמנים`;
    }
    return null;
  });



  public readonly fontOptions: FontOption[] = [
    { name: 'פרדוקה (ברירת מחדל)', value: "'Fredoka', sans-serif" },
    { name: 'היבו', value: "'Heebo', sans-serif" },
    { name: 'אַרִימוֹ', value: "'Arimo', sans-serif" },
    { name: 'אסיסטנט', value: "'Assistant', sans-serif" },
    { name: 'פרנק רוהל', value: "'Frank Ruhl Libre', serif" },
    { name: 'רוביק', value: "'Rubik', sans-serif" },
    { name: 'דוד ליברה', value: "'David Libre', serif" },
    { name: 'טינוס', value: "'Tinos', serif" },
  ];
  public readonly shabbatHolidayColorOptions: string[] = ['#38bdf8', '#818cf8', '#d946ef', '#f472b6', '#243c5a', '#10b981', '#facc15', '#fb923c',];
  public readonly ZmanimEnumData: EnumMetadata[] = ZmanimEnumData;
  public readonly LearningEnumData: EnumMetadata[] = LearningEnumData;
  public readonly ContentSettingsEnumData: EnumMetadata[] = ContentSettingsEnumData.filter(
    item => item.key !== 'zmanimVisibility' && item.key !== 'dailyLearningVisibility'
  );

  constructor() {
    const today = new Date();
    this.printStartDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
    this.printEndDate.set(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  public onContentSettingChange(newVal: boolean, settingKey: keyof ContentSettings): void {
    const currentSettings = this.contentSettings();
    if (!currentSettings) return;
    const newSettings = { ...currentSettings, [settingKey]: newVal };
    this.userSettingsService.updateContentSettings(newSettings);
  }

  public onDailyLearningVisibilityChange(newVal: boolean, learnKey: keyof DailyLearningVisibility): void {
    const currentSettings = this.contentSettings();
    if (!currentSettings) return;

    // --- DEBUG LOG START ---
    console.log(`%c[USER ACTION] Changing '${learnKey}' to ${newVal}`, 'color: blue; font-weight: bold;');
    // --- DEBUG LOG END ---

    const newVisibility = { ...currentSettings.dailyLearningVisibility, [learnKey]: newVal };
    const newSettings = { ...currentSettings, dailyLearningVisibility: newVisibility };
    this.userSettingsService.updateContentSettings(newSettings);
  }

  public onZmanimVisibilityChange(newVal: boolean, zmanKey: keyof ZmanimVisibility): void {
    const currentSettings = this.contentSettings();
    if (!currentSettings) {
      return;
    }
  
    const currentVisibility = { ...currentSettings.zmanimVisibility };
    currentVisibility[zmanKey] = newVal;
    
    const newSettings = { ...currentSettings, zmanimVisibility: currentVisibility };
    this.userSettingsService.updateContentSettings(newSettings);
  }

  public onLocationUpdated(city: City): void {
    this.userSettingsService.updateSelectedLocation(city);
  }

  public onBorderBrightnessUpdated(event: any): void {
    this.userSettingsService.updateBorderBrightness(event.value);
  }

  public onShabbatHolidayColorUpdated(color: string): void {
    this.userSettingsService.updateShabbatHolidayColor(color);
  }
  
  public onShabbatBackgroundOpacityUpdated(event: any): void {
    this.userSettingsService.updateShabbatBackgroundOpacity(event.value);
  }

  public onFontUpdated(font: string): void {
    this.userSettingsService.updateSelectedFont(font);
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

    this.userSettingsService.triggerPrint({ startDate, endDate, sets: this.printSets() });
  }
}
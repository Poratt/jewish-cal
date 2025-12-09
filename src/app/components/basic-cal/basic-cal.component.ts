import { Component, HostListener, inject, OnDestroy, OnInit, Renderer2, effect, signal, WritableSignal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { slideDown } from '../../core/constants/animations';
import { DialogConfigWide } from '../../core/constants/dialog-config';
import { getHebYear } from '../../core/services/hebcal-helpers';
import { HebcalService } from '../../core/services/hebcal.service';
import { DayDetailsComponent } from '../day-details/day-details.component';
import { SettingsMenuComponent } from '../settings-menu/settings-menu.component';
import { LearningEnumData, Learning } from '../../core/models/learning';
import { ZmanimEnumData, Zman } from '../../core/models/zman';
import { DialogNavigationService } from '../../core/services/dialog-navigation.service';
import { SettingsService } from '../../core/services/settings.service';
import { EnumData } from '../../core/models/enumData';
import { daysNames, monthsNames, HEBREW_LOCALE } from '../../core/constants/namesInfo';
import { DayObject } from '../../core/models/day-object';
import { PrintMonthData } from '../../core/models/print';
import { HolidayFlags } from '../../core/constants/holiday-flags';
import { DrawerModule } from 'primeng/drawer';
import { SettingsDrawerComponent } from "../settings-drawer/settings-drawer.component";


@Component({
  selector: 'app-basic-cal',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicDialogModule, SettingsMenuComponent, ButtonModule, TooltipModule, DrawerModule, SettingsDrawerComponent],
  templateUrl: './basic-cal.component.html',
  styleUrls: ['./basic-cal.component.scss'],
  providers: [DialogService],
  animations: [slideDown]
})
export class BasicCalComponent implements OnInit, OnDestroy {

  private hebcalService = inject(HebcalService);
  private primengConfig = inject(PrimeNG);
  private renderer = inject(Renderer2);
  private dialogService = inject(DialogService);
  private dialogNavService = inject(DialogNavigationService);
  private settingsService = inject(SettingsService);

  private ref: DynamicDialogRef | undefined;

  public readonly daysNames = daysNames;
  public readonly monthsNames = monthsNames;

  public readonly LearningEnumData: EnumData[] = LearningEnumData;
  public readonly ZmanimEnumData: EnumData[] = ZmanimEnumData;

  public contentSettings = this.settingsService.contentSettingsSignal;
  public selectedLocation = this.settingsService.selectedLocationSignal;
  public groupedCities = this.settingsService.groupedCitiesSignal;
  public borderBrightness = this.settingsService.borderBrightnessSignal;
  public themeColor = this.settingsService.themeColorSignal;
  public themeOpacity = this.settingsService.themeOpacitySignal;
  public currentFont = this.settingsService.selectedFontSignal;

  public currentDate = new Date();
  public calenderDate = new Date();

  public hebrewMonthRange: string = '';
  public displayedDays: DayObject[][] = [];
  private currentDayIndex: number = -1;

  private dialogCloseSubscription: Subscription | undefined;
  private dayObj: WritableSignal<DayObject | null> = signal(null);

  public isPrintingMode = signal<boolean>(false);
  public printMonthsData: PrintMonthData[] = [];

  public isSettingsVisible = signal<boolean>(false)

  constructor() {
    effect(() => {
      if (this.dialogNavService.nextDaySignal() > 0 && this.ref) {
        this.navigateToNextDay();
      }
    });
    effect(() => {
      if (this.dialogNavService.prevDaySignal() > 0 && this.ref) {
        this.navigateToPrevDay();
      }
    });
    effect(() => {
      if (this.dialogNavService.goToTodaySignal() > 0 && this.ref) {
          this.goToToday(); // Set calendar is on the current month
          const todayObj = this.createDayObject(new Date());
          this.dayObj.set(todayObj); // Update the signal passed to the dialog
          
          // Update the index for correct prev/next navigation
          this.currentDayIndex = this.displayedDays[0].findIndex(d => this.isToday(d));
      }
    });
    effect(() => {
      const location = this.selectedLocation();
      const settings = this.contentSettings();
      if (location && settings) {
        this.hebcalService.setLocation(location);
        this.hebcalService.generateEvents(this.calenderDate.getFullYear(), settings);
        this.genCal();
      }
    });

    effect(() => {
      const request = this.settingsService.printRequestSignal();
      if (request) {
        this.prepareAndPrint(request);
        this.settingsService.resetPrintRequest();
      }
    });
  }

  ngOnInit() {
    this.primengConfig.setTranslation(HEBREW_LOCALE);
  }

  ngOnDestroy(): void {
    this.dialogCloseSubscription?.unsubscribe();
    if (this.ref) {
      this.ref.close();
    }
  }

  


  isCurrentMonth(): boolean {
    const today = this.currentDate;
    return this.calenderDate.getFullYear() === today.getFullYear() &&
      this.calenderDate.getMonth() === today.getMonth();
  }

  isToday(dayObj: DayObject): boolean {
    const today = this.currentDate;
    return dayObj.ge.date === today.getDate() &&
      dayObj.ge.month === today.getMonth() &&
      dayObj.ge.year === today.getFullYear();
  }

  goToToday(): void {
    if (this.isCurrentMonth()) return;
    this.calenderDate = new Date();
    this.hebcalService.generateEvents(this.calenderDate.getFullYear(), this.contentSettings());
    this.genCal();
  }

  prepareAndPrint(printData: { startDate: Date, endDate: Date, sets: number }): void {
    this.isPrintingMode.set(true);
    this.printMonthsData = [];
    const singleSetData: PrintMonthData[] = [];
    let loopDate = new Date(printData.startDate);

    while (loopDate <= printData.endDate) {
      this.hebcalService.generateEvents(loopDate.getFullYear(), this.contentSettings());
      singleSetData.push(this.generateMonthDataForPrint(loopDate));
      loopDate.setMonth(loopDate.getMonth() + 1);
    }
    for (let i = 0; i < printData.sets; i++) {
      this.printMonthsData.push(...singleSetData);
    }
    this.renderer.addClass(document.body, 'is-printing');
    setTimeout(() => window.print(), 0);
  }

  @HostListener('window:afterprint')
  onafterprint() {
    this.isPrintingMode.set(false);
    this.printMonthsData = [];
    this.renderer.removeClass(document.body, 'is-printing');
  }

  generateMonthDataForPrint(date: Date): PrintMonthData {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = this.generateDaysForMonth(date);
    const firstDay = days.find(d => d.ge.month === month) || days[0];
    const lastDay = [...days].reverse().find(d => d.ge.month === month) || days[days.length - 1];
    const firstHebMonth = firstDay.he.month;
    const lastHebMonth = lastDay.he.month;
    const hebrewHeader = firstHebMonth === lastHebMonth ? firstHebMonth : `${firstHebMonth} - ${lastHebMonth}`;
    return {
      gregorianHeader: `${this.monthsNames[month].he} ${year}`,
      hebrewHeader,
      hebrewYear: this.getHebYear(date),
      days, month, year
    };
  }

  generateDaysForMonth(date: Date): DayObject[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const monthDays: DayObject[] = [];

    for (let i = firstDayOfWeek; i > 0; i--) {
      monthDays.push(this.createDayObject(new Date(year, month, 1 - i)));
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      monthDays.push(this.createDayObject(new Date(year, month, i)));
    }
    const totalDays = monthDays.length;
    const remainingDays = totalDays > 35 ? 42 - totalDays : 35 - totalDays;
    for (let i = 1; i <= remainingDays; i++) {
      monthDays.push(this.createDayObject(new Date(year, month + 1, i)));
    }
    return monthDays;
  }

  getHebYear(fullDate: Date): string {
    return getHebYear(fullDate);
  }

  sliceHebDate(hebDate: string): string {
    return hebDate.split(' ')[0];
  }

  isRoshHodesh(hebDate: string): boolean {
    const date = hebDate.split(' ')[0];
    return date.startsWith('א') || date.startsWith('ל');
  }

  isHoliday(day: DayObject): boolean {
    return day.events?.some(e => (e.flags & HolidayFlags.CHAG)) ?? false;
  }

  isHolidayEve(day: DayObject): boolean {
    return day.events?.some(e => (e.flags & HolidayFlags.EREV)) ?? false;
  }

  isCholHamoed(day: DayObject): boolean {
    return day.events?.some(e => (e.flags & HolidayFlags.CHOL_HAMOED)) ?? false;
  }

  genCal(): void {
    const allMonthDays = this.generateDaysForMonth(this.calenderDate);
    this.displayedDays = [allMonthDays];
    this.updateHebrewMonthRange(allMonthDays);
  }

  updateHebrewMonthRange(allDays: DayObject[]): void {
    if (!allDays || allDays.length === 0) {
      this.hebrewMonthRange = '';
      return;
    }
    const firstDay = allDays.find(d => d.ge.month === this.calenderDate.getMonth()) || allDays[0];
    const lastDay = [...allDays].reverse().find(d => d.ge.month === this.calenderDate.getMonth()) || allDays[allDays.length - 1];
    const firstHebMonth = firstDay.he.month;
    const lastHebMonth = lastDay.he.month;
    this.hebrewMonthRange = firstHebMonth === lastHebMonth ? firstHebMonth : `${firstHebMonth} - ${lastHebMonth}`;
  }

  createDayObject(fullDate: Date): DayObject {
    const dayObj = this.hebcalService.createDayObject(fullDate, this.contentSettings());
    dayObj.ge.fullDate = fullDate;
    return dayObj;
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent): void {
    if (this.isPrintingMode() || this.ref) return;

    const target = event.target as HTMLElement;

    // Check if the wheel event occurred inside the settings menu or a PrimeNG overlay
    const isInsideSettings = target.closest('.settings-menu-wrapper');
    const isInsideOverlay = target.closest('.p-select-overlay, .p-datepicker-mask, .custom-datepicker-panel');

    if (isInsideSettings || isInsideOverlay) {
      // Don't scroll the calendar when mouse in settings menu or an overlay
      return;
    }

    this.changeMonth(event.deltaY > 0 ? 1 : -1);
  }

  changeMonth(offset: number): void {
    const newDate = new Date(this.calenderDate);
    newDate.setMonth(newDate.getMonth() + offset, 1);

    if (newDate.getFullYear() !== this.calenderDate.getFullYear()) {
      this.hebcalService.generateEvents(newDate.getFullYear(), this.contentSettings());
    }

    this.calenderDate = newDate;
    this.genCal();
  }

  onDayClick(dayObj: DayObject): void {
    console.log(dayObj);
    this.currentDayIndex = this.displayedDays[0].findIndex(d => d.ge.fullDate.getTime() === dayObj.ge.fullDate.getTime());
    this.dayObj.set(dayObj);
    this.dialogCloseSubscription?.unsubscribe();

    const dialogRef = this.dialogService.open(DayDetailsComponent, {
      ...DialogConfigWide,
      
      data: { dayObj: this.dayObj.asReadonly() }
    });

    if (dialogRef) {
      this.ref = dialogRef;
      this.dialogCloseSubscription = this.ref.onClose.subscribe(() => {
        this.ref = undefined;
      });
    }
  }

  private navigateToNextDay(): void {
    if (this.currentDayIndex === -1) return;
    const currentDayObj = this.displayedDays[0][this.currentDayIndex];
    this.currentDayIndex++;
    if (this.currentDayIndex >= this.displayedDays[0].length) {
      const nextDate = new Date(currentDayObj.ge.fullDate);
      nextDate.setDate(nextDate.getDate() + 1);
      this.changeMonth(1);
      this.currentDayIndex = this.displayedDays[0].findIndex(d => d.ge.fullDate.getTime() === nextDate.getTime());
      if (this.currentDayIndex === -1) this.currentDayIndex = this.displayedDays[0].findIndex(d => d.ge.month === this.calenderDate.getMonth());
    } else {
      const nextDayObj = this.displayedDays[0][this.currentDayIndex];
      const currentMonth = this.calenderDate.getMonth();
      const currentYear = this.calenderDate.getFullYear();
      if (nextDayObj.ge.month !== currentMonth || nextDayObj.ge.year !== currentYear) {
        this.calenderDate = new Date(nextDayObj.ge.fullDate);
        if (nextDayObj.ge.year !== currentYear) {
          this.hebcalService.generateEvents(this.calenderDate.getFullYear(), this.contentSettings());
        }
        this.genCal();
        this.currentDayIndex = this.displayedDays[0].findIndex(d => d.ge.fullDate.getTime() === nextDayObj.ge.fullDate.getTime());
      }
    }
    this.updateDialogDay();
  }

  private navigateToPrevDay(): void {
    if (this.currentDayIndex === -1) return;
    const currentDayObj = this.displayedDays[0][this.currentDayIndex];
    this.currentDayIndex--;
    if (this.currentDayIndex < 0) {
      const prevDate = new Date(currentDayObj.ge.fullDate);
      prevDate.setDate(prevDate.getDate() - 1);
      this.changeMonth(-1);
      this.currentDayIndex = this.displayedDays[0].findIndex(d => d.ge.fullDate.getTime() === prevDate.getTime());
      if (this.currentDayIndex === -1) {
        for (let i = this.displayedDays[0].length - 1; i >= 0; i--) {
          if (this.displayedDays[0][i].ge.month === this.calenderDate.getMonth()) {
            this.currentDayIndex = i;
            break;
          }
        }
      }
    } else {
      const prevDayObj = this.displayedDays[0][this.currentDayIndex];
      const currentMonth = this.calenderDate.getMonth();
      const currentYear = this.calenderDate.getFullYear();
      if (prevDayObj.ge.month !== currentMonth || prevDayObj.ge.year !== currentYear) {
        this.calenderDate = new Date(prevDayObj.ge.fullDate);
        if (prevDayObj.ge.year !== currentYear) {
          this.hebcalService.generateEvents(this.calenderDate.getFullYear(), this.contentSettings());
        }
        this.genCal();
        this.currentDayIndex = this.displayedDays[0].findIndex(d => d.ge.fullDate.getTime() === prevDayObj.ge.fullDate.getTime());
      }
    }
    this.updateDialogDay();
  }

  private updateDialogDay(): void {
    if (this.currentDayIndex > -1 && this.currentDayIndex < this.displayedDays[0].length) {
      const newDayObj = this.displayedDays[0][this.currentDayIndex];
      this.dayObj.set(newDayObj);
    }
  }

  public getZman(day: DayObject, key: string | number): Zman | undefined {
    if (!day.zmanim) {
      return undefined;
    }

    const allZmanim: Zman[] = [
      ...day.zmanim.morning.items,
      ...day.zmanim.afternoon.items,
      ...day.zmanim.evening.items,
    ];

    return allZmanim.find((z: Zman) => z.key === key);
  }

  public getLearning(day: DayObject, key: string | number): any {
    if (!day.learn) return undefined;
    const stringKey = String(key) as keyof Learning;
    return (day.learn as Learning)[stringKey];
  }

  extractMoladTime(moladText: string, short: boolean = false): string {
    const monthMatch = moladText.match(/מוֹלָד הָלְּבָנָה\s+(\S+)/);
    const month = monthMatch ? monthMatch[1] : '';

    const hourMatch = moladText.match(/בְּשָׁעָה\s+(\d+)/);
    const hour = hourMatch ? hourMatch[1].padStart(2, '0') : '00';

    const minuteMatch = moladText.match(/ו-(\d+)\s+דַּקּוֹת/);
    const minutes = minuteMatch ? minuteMatch[1].padStart(2, '0') : '00';

    const chalakimMatch = moladText.match(/ו-(\d+)\s+חֲלָקִים/);
    const chalakim = chalakimMatch ? chalakimMatch[1] : '0';

    const seconds = Math.round((parseInt(chalakim) * 10) / 3);
    const timeStr = `${hour}:${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (short) {
      return timeStr;
    }

    return `מוֹלָד הָלְּבָנָה ${timeStr}`;
  }
}
import { Component, inject, Signal, effect } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LeyningWeekday, LeyningShabbatHoliday } from '@hebcal/leyning';
import { TooltipModule } from "primeng/tooltip";
import { ButtonModule } from 'primeng/button';
import { DayObject } from '../../core/models/day-object';
import { EnumData } from '../../core/models/enumData';
import { EventInfo } from '../../core/models/event-info';
import { LearningEnumData, Learning } from '../../core/models/learning';
import { aliyotMap } from '../../core/models/leyning';
import { Zman } from '../../core/models/zman';
import { DialogNavigationService } from '../../core/services/dialog-navigation.service';
import { translate, getHaftaraBook, getHaftaraVerses, formatAliyahVerses } from '../../core/services/hebcal-helpers';
import { HebcalService } from '../../core/services/hebcal.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
	selector: 'app-day-details',
	standalone: true,
	imports: [
    CommonModule,
    DividerModule,
    KeyValuePipe,
    TooltipModule,
	ButtonModule
],
	templateUrl: './day-details.component.html',
	styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent {

	public readonly ref = inject(DynamicDialogRef);
	public readonly config = inject(DynamicDialogConfig);
	public readonly hebcalService = inject(HebcalService);
	private readonly dialogNavService = inject(DialogNavigationService);
	public readonly userSettingsService = inject(SettingsService);


	public readonly LearningEnumData: EnumData[] = LearningEnumData;
	public readonly translate = translate;
	public readonly getHaftaraBook = getHaftaraBook
	public readonly getHaftaraVerses = getHaftaraVerses
	public readonly formatAliyahVerses = formatAliyahVerses

	public readonly dayObj: Signal<DayObject | null>;
	public readonly aliyotMap: Record<number | string, string> = aliyotMap;

	public fastDayInfo: { name: string, start?: EventInfo, end?: EventInfo } | null = null;

	constructor() {
		this.dayObj = this.config.data.dayObj;

		// Re-run logic whenever the day object signal changes
		effect(() => {
			this.prepareFastDayInfo();
		});
	}

	private prepareFastDayInfo(): void {
		const day = this.dayObj();
		if (!day || !day.events) {
			this.fastDayInfo = null;
			return;
		}
	
		// Find the main fast event (like Yom Kippur Katan)
		const mainFastEvent = day.events.find(e => 
			e.categories.includes('fast') && 
			!e.desc.includes('Fast begins') && 
			!e.desc.includes('Fast ends')
		);
	
		const fastStart = day.events.find(e => e.desc.includes('Fast begins'));
		const fastEnd = day.events.find(e => e.desc.includes('Fast ends'));
	
		if (mainFastEvent || fastStart || fastEnd) {
			// Prefer the name from the main event if it exists
			const fastName = mainFastEvent?.hebName || 
						   fastStart?.hebName.replace('תחילת הצום:', '').trim() ||
						   fastEnd?.hebName.replace('סוף צום:', '').trim() || 
						   'צום';
	
			this.fastDayInfo = {
				name: fastName,
				start: fastStart,
				end: fastEnd,
			};
		} else {
			this.fastDayInfo = null;
		}
	}

	public hasLearningContent(): boolean {
		const learn = this.dayObj()?.learn;
		return learn ? Object.values(learn).some(Boolean) : false;
	}

	public isZman(value: any): value is Zman {
		return value && typeof value === 'object' && 'hebName' in value && 'time' in value;
	}

	public isLeyningWithFullKriyah(leyning: any): leyning is LeyningShabbatHoliday {
		return !!leyning && typeof leyning.fullkriyah !== 'undefined';
	}

	public isLeyningWithWeekday(leyning: any): leyning is LeyningWeekday {
		return !!leyning && typeof leyning.weekday !== 'undefined';
	}

	public getLearning(day: DayObject, key: string | number): any {
		if (!day.learn) return undefined;
		const stringKey = String(key) as keyof Learning;
		return (day.learn as Learning)[stringKey];
	}

	public onPrevDay(): void {
		this.dialogNavService.triggerPrevDay();
	}

	public onNextDay(): void {
		this.dialogNavService.triggerNextDay();
	}
}
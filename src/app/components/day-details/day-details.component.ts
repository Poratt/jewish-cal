import { ZmanimMethod, ZmanimMethodsData, ZmanimMethodType } from './../../core/models/zmanim-methods';
import { Component, inject, Signal, effect, computed, signal } from '@angular/core';
import { CommonModule, KeyValuePipe, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LeyningWeekday, LeyningShabbatHoliday } from '@hebcal/leyning';
import { TooltipModule } from "primeng/tooltip";
import { ButtonModule } from 'primeng/button';
import { CalEvent, DayObject } from '../../core/models/day-object';
import { EnumData } from '../../core/models/enumData';
import { LearningEnumData, Learning } from '../../core/models/learning';
import { aliyotMap } from '../../core/models/leyning';
import { Zman, ZmanimEnumData, GroupedZmanim, ZmanimVisibility } from '../../core/models/zman';
import { DialogNavigationService } from '../../core/services/dialog-navigation.service';
import { translate, getHaftaraBook, getHaftaraVerses, formatAliyahVerses, prepareFastDayInfo } from '../../core/services/hebcal-helpers';
import { HebcalService } from '../../core/services/hebcal.service';
import { SettingsService } from '../../core/services/settings.service';
import { ParenthesesStylePipe } from "../../core/pipes/parentheses-style.pipe";
import { slideDown } from '../../core/constants/animations';

@Component({
	selector: 'app-day-details',
	standalone: true,
	imports: [
		CommonModule,
		DividerModule,
		KeyValuePipe,
		TooltipModule,
		ButtonModule,
		DatePipe,
		ParenthesesStylePipe
	],
	templateUrl: './day-details.component.html',
	styleUrls: ['./day-details.component.scss'],
	animations: [slideDown]
})
export class DayDetailsComponent {

	public readonly ref = inject(DynamicDialogRef);
	public readonly config = inject(DynamicDialogConfig);
	public readonly hebcalService = inject(HebcalService);
	private readonly dialogNavService = inject(DialogNavigationService);
	public settingsService = inject(SettingsService);

	public readonly ZmanimEnumData: EnumData[] = ZmanimEnumData;
	public readonly LearningEnumData: EnumData[] = LearningEnumData;
	public readonly aliyotMap: Record<number | string, string> = aliyotMap;


	public readonly translate = translate;
	public readonly getHaftaraBook = getHaftaraBook;
	public readonly getHaftaraVerses = getHaftaraVerses;
	public readonly formatAliyahVerses = formatAliyahVerses;
	public readonly prepareFastDayInfo = prepareFastDayInfo;

	public readonly dayObj: Signal<DayObject | null>;
	public fastDayInfo: { name: string, start?: CalEvent, end?: CalEvent } | null = null;
	public currentTime = signal(new Date());

	public ZmanimMethodsData: ZmanimMethod[] = ZmanimMethodsData;
	public ZmanimMethodType = ZmanimMethodType;
	public defaultZmanimMethod: Signal<ZmanimMethodType>;

	public isToday = computed(() => this.checkIfToday(this.dayObj()));
	public nextZmanKey: Signal<keyof ZmanimVisibility | null>;
	public filteredGroupedZmanim: Signal<GroupedZmanim | null>;


	constructor() {
		this.dayObj = this.config.data.dayObj;
		this.defaultZmanimMethod = this.settingsService.zmanimMethodSignal;


		console.log(this.dayObj())
		effect((onCleanup) => {
			if (this.isToday()) {
				const intervalId = window.setInterval(() => {
					this.currentTime.set(new Date());
				}, 60000);

				onCleanup(() => {
					clearInterval(intervalId);
				});
			}
		});

		effect(() => {
			this.fastDayInfo = prepareFastDayInfo(this.dayObj());
		});

		this.filteredGroupedZmanim = computed(() => {
			const grouped = this.dayObj()?.zmanim;
			const selectedMethod = this.defaultZmanimMethod();

			if (!grouped) {
				return null;
			}

			const filterItems = (items: Zman[]): Zman[] => {
				return items.filter(zman => {
					const key = zman.key;
					if (key.endsWith('MGA')) {
						return selectedMethod === ZmanimMethodType.Mga;
					}
					if (key.endsWith('GRA')) {
						return selectedMethod === ZmanimMethodType.Gra;
					}
					return true;
				});
			};

			return {
				morning: {
					...grouped.morning,
					items: filterItems(grouped.morning.items),
				},
				afternoon: {
					...grouped.afternoon,
					items: filterItems(grouped.afternoon.items),
				},
				evening: {
					...grouped.evening,
					items: filterItems(grouped.evening.items),
				}
			};
		});

		this.nextZmanKey = computed(() => {
			if (!this.isToday()) {
				return null;
			}

			const filteredGroups = this.filteredGroupedZmanim();
			if (!filteredGroups) {
				return null;
			}

			const allFilteredZmanim = [
				...filteredGroups.morning.items,
				...filteredGroups.afternoon.items,
				...filteredGroups.evening.items
			];

			const now = this.currentTime();
			const futureZmanim = allFilteredZmanim
				.map(zman => ({
					...zman,
					date: this.parseZmanTime(zman.time as string)
				}))
				.filter(zman => zman.date > now)
				.sort((a, b) => a.date.getTime() - b.date.getTime());

			return futureZmanim.length > 0 ? futureZmanim[0].key : null;
		});
	}

	private checkIfToday(day: DayObject | null): boolean {
		if (!day) {
			return false;
		}
		const today = new Date();
		const dayDate = day.ge.fullDate;
		return today.getFullYear() === dayDate.getFullYear() &&
			today.getMonth() === dayDate.getMonth() &&
			today.getDate() === dayDate.getDate();
	}

	public goToToday(): void {
		this.dialogNavService.triggerGoToToday();
	}

	private parseZmanTime(timeStr: string): Date {
		const [hours, minutes] = timeStr.split(':').map(Number);
		const date = new Date();
		date.setHours(hours, minutes, 0, 0);
		return date;
	}

	public getZmanStatus(zman: Zman): string | null {
		if (!this.isToday()) {
			return null;
		}

		if (zman.key === this.nextZmanKey()) {
			return 'next';
		}

		const zmanTime = this.parseZmanTime(zman.time as string);
		if (zmanTime < this.currentTime()) {
			return 'past';
		}

		return null;
	}

	toggleZmanimMethod(method: ZmanimMethodType) {
		const newMethod = method === ZmanimMethodType.Gra ? ZmanimMethodType.Mga : ZmanimMethodType.Gra;
		this.settingsService.updateZmanimMethod(newMethod);
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

	public getZmanDescription(key: string | number): string | undefined {
		const zmanData = this.ZmanimEnumData.find(z => z.key === key);
		return zmanData?.desc;
	}

	public onPrevDay(): void {
		this.dialogNavService.triggerPrevDay();
	}

	public onNextDay(): void {
		this.dialogNavService.triggerNextDay();
	}
}
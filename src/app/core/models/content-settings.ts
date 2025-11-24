// src/app/common/models/content-settings.ts

import { YerushalmiYomiConfig } from "@hebcal/learning";
import { EnumMetadata } from "./enumData";
import { DailyLearningVisibility } from "./learning";
import { ZmanimVisibility } from "./zman";

export type YerushalmiYomiEdition = 'vilna' | 'schottenstein';

export interface ContentSettings {
	[key: string]: any;
	showOmer: boolean;
	showMolad: boolean;
	showMevarchim: boolean;
	showYizkor: boolean;
	showYomKippurKatan: boolean;
	showHallel: boolean;
	includeModernHolidays: boolean;
	includeMinorFasts: boolean;
	includeRoshChodesh: boolean;
	includeHolidays: boolean;
	showShabbatBackgrounds: boolean;
	zmanimVisibility: ZmanimVisibility;
	dailyLearningVisibility: DailyLearningVisibility;
}

export enum ContentSettingsEnum {
	ShowOmer = 1,
	ShowMolad,
	ShowMevarchim,
	ShowYizkor,
	ShowYomKippurKatan,
	ShowHallel,
	IncludeModernHolidays,
	IncludeMinorFasts,
	IncludeRoshChodesh,
	IncludeHolidays,
	ZmanimVisibility,
	DailyLearningVisibility,
}

export const ContentSettingsEnumData: EnumMetadata[] = [
	{ enumValue: ContentSettingsEnum.ShowOmer, key: 'showOmer', hebName: 'ספירת העומר', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowMolad, key: 'showMolad', hebName: 'מולד', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowMevarchim, key: 'showMevarchim', hebName: 'שבת מברכים', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowYizkor, key: 'showYizkor', hebName: 'יזכור', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowYomKippurKatan, key: 'showYomKippurKatan', hebName: 'יום כיפור קטן', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowHallel, key: 'showHallel', hebName: 'הלל', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeModernHolidays, key: 'includeModernHolidays', hebName: 'מועדים מודרניים', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeMinorFasts, key: 'includeMinorFasts', hebName: 'תעניות קטנות', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeRoshChodesh, key: 'includeRoshChodesh', hebName: 'ראש חודש', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeHolidays, key: 'includeHolidays', hebName: 'חגים ומועדים', visibility: true },
	{ enumValue: ContentSettingsEnum.ZmanimVisibility, key: 'zmanimVisibility', hebName: 'זמני היום', visibility: true },
	{ enumValue: ContentSettingsEnum.DailyLearningVisibility, key: 'dailyLearningVisibility', hebName: 'לימוד יומי', visibility: true },
];

export const ContentSettingsDefault: ContentSettings = {
    showOmer: true,
    showMolad: true,
    showMevarchim: true,
    showYizkor: true,
    showYomKippurKatan: true,
    showHallel: true,
    includeModernHolidays: false,
    includeMinorFasts: true,
    includeRoshChodesh: true,
    includeHolidays: true,
    showShabbatBackgrounds: true,

    yerushalmiYomiType: 'vilna',

    zmanimVisibility: {
      chatzotNightTime: false,
      alotHaShachar: true,
      misheyakir: false,
      misheyakirMachmir: false,
      dawn: false,
      neitzHaChama: true,
      sunrise: false,
      sofZmanShma: true,
      sofZmanTfilla: false,
      chatzot: false,
      minchaGedola: true,
      minchaKetana: false,
      plagHaMincha: false,
      shkiah: true,
      dusk: false,
      tzeitHaKochavim: false,
      eveningTime: false
    },
    dailyLearningVisibility: {
      dafYomi: true,
      mishnaYomi: true,
      nachYomi: false,
      chofetzChaim: false,
      dailyRambam1: false,
      shemiratHaLashon: false,
      dailyPsalms: false,
      dafWeekly: false,

      // New visibility flags
      perekYomi: true,
      pirkeiAvot: true,
      dailyRambam3: true,
      arukhHaShulchanYomi: true,
      seferHaMitzvot: true,
      kitzurShulchanAruch: true,
      yerushalmiYomiV: true,
      yerushalmiYomiS: true,
    }
}
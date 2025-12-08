import { EnumData } from "./enumData";
import { DailyLearningVisibility } from "./learning";
import { ZmanimVisibility } from "./zman";

export type YerushalmiYomiEdition = 'vilna' | 'schottenstein';
export type ViewSettingType = 'location' | 'borderBrightness' | 'shabbatColor' | 'shabbatOpacity' | 'font';
export type ContentSettingsSections = 'general' | 'dailyLearning' | 'zmanim';


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
	// ZmanimVisibility,
	// DailyLearningVisibility,
}

export const ContentSettingsEnumData: EnumData[] = [
	{ enumValue: ContentSettingsEnum.ShowOmer, key: 'showOmer', hebName: 'ספירת העומר', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowMolad, key: 'showMolad', hebName: 'מולד הלבנה', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowMevarchim, key: 'showMevarchim', hebName: 'שבת מברכים', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowYizkor, key: 'showYizkor', hebName: 'יזכור', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowYomKippurKatan, key: 'showYomKippurKatan', hebName: 'יום כיפור קטן', visibility: true },
	{ enumValue: ContentSettingsEnum.ShowHallel, key: 'showHallel', hebName: 'הלל', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeModernHolidays, key: 'includeModernHolidays', hebName: 'מועדים מודרניים', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeMinorFasts, key: 'includeMinorFasts', hebName: 'תעניות קטנות', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeRoshChodesh, key: 'includeRoshChodesh', hebName: 'ראש חודש', visibility: true },
	{ enumValue: ContentSettingsEnum.IncludeHolidays, key: 'includeHolidays', hebName: 'חגים ומועדים', visibility: true },
	// { enumValue: ContentSettingsEnum.ZmanimVisibility, key: 'zmanimVisibility', hebName: 'זמני היום', },
	// { enumValue: ContentSettingsEnum.DailyLearningVisibility, key: 'dailyLearningVisibility', hebName: 'לימוד יומי', },
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

    zmanimVisibility: {
    alotHaShachar: false,
    misheyakir: false,
    misheyakirMachmir: false,
    dawn: false,
    neitzHaChama: false,
    sunrise: false,
    sofZmanShma: false,
    sofZmanTfilla: false,
    sofZmanShmaMGA: false,
    sofZmanTfillaMGA: false,
    chatzot: false,
    minchaGedola: false,
    minchaKetana: false,
    minchaGedolaMGA: false,
    minchaKetanaMGA: false,
    plagHaMincha: false,
    shkiah: false,
    eveningTime: false,
    dusk: false,
    tzeitHaKochavim: false,
    chatzotNightTime: false,
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
      perekYomi: false,
      pirkeiAvot: false,
      dailyRambam3: false,
      arukhHaShulchanYomi: false,
      seferHaMitzvot: false,
      kitzurShulchanAruch: false,
      yerushalmiYomiV: false,
      yerushalmiYomiS: false,
    }
}
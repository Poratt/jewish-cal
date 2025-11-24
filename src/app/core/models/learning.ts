import {
	AhSYomiReading,
	ChofetzChaimReading,
	DafPage,
	KitzurShulchanAruchReading,
	MishnaYomi,
	NachYomi,
	RambamReading,
	SeferHaMitzvotReading,
	ShemiratHaLashonReading,
	YerushalmiReading
} from '@hebcal/learning';
import { EnumMetadata } from "./enumData";
import { PerekYomi } from '@hebcal/learning/perekYomiBase';

export interface Learning {
	dafYomi?: DafPage;
	mishnaYomi?: MishnaYomi[];
	nachYomi?: NachYomi;
	chofetzChaim?: ChofetzChaimReading;
	dailyRambam1?: RambamReading;
	shemiratHaLashon?: ShemiratHaLashonReading;
	dailyPsalms?: number[];
	dafWeekly?: DafPage;
	perekYomi?: PerekYomi;
	pirkeiAvot?: number[] | null;
	dailyRambam3?: RambamReading[];
	arukhHaShulchanYomi?: AhSYomiReading;
	seferHaMitzvot?: SeferHaMitzvotReading;
	kitzurShulchanAruch?: KitzurShulchanAruchReading;
	yerushalmiYomiV?: YerushalmiReading;
	yerushalmiYomiS?: YerushalmiReading;
}

export interface DailyLearningVisibility {
	[key: string]: boolean;
	dafYomi: boolean;
	mishnaYomi: boolean;
	nachYomi: boolean;
	chofetzChaim: boolean;
	dailyRambam1: boolean;
	shemiratHaLashon: boolean;
	dailyPsalms: boolean;
	dafWeekly: boolean;
	perekYomi: boolean;
	pirkeiAvot: boolean;
	dailyRambam3: boolean;
	yerushalmiYomiV: boolean;
	yerushalmiYomiS: boolean;
	arukhHaShulchanYomi: boolean;
	seferHaMitzvot: boolean;
	kitzurShulchanAruch: boolean;
}

export enum DailyLearningEnum {
	DafYomi = 1,
	MishnaYomi,
	NachYomi,
	ChofetzChaim,
	DailyRambam1,
	ShemiratHaLashon,
	DailyPsalms,
	DafWeekly,
	PerekYomi,
	PirkeiAvot,
	DailyRambam3,
	ArukhHaShulchanYomi,
	SeferHaMitzvot,
	KitzurShulchanAruch,
	YerushalmiYomiV,
	YerushalmiYomiS,
}

export const LearningEnumData: EnumMetadata[] = [
	{ enumValue: DailyLearningEnum.DafYomi, key: 'dafYomi', hebName: 'דף יומי', visibility: true, desc: 'לימוד דף אחד ביום במסכת הש"ס לפי מחזור הדף היומי' },
	{ enumValue: DailyLearningEnum.MishnaYomi, key: 'mishnaYomi', hebName: 'משנה יומית', visibility: true, desc: 'לימוד שתי משניות ביום, לפי סדר מסודר עד סיום שישה סדרי משנה' },
	{ enumValue: DailyLearningEnum.NachYomi, key: 'nachYomi', hebName: 'נ"ך יומי', visibility: true, desc: 'לימוד יומי בנביאים וכתובים, לסיום התנ"ך במחזוריות קבועה' },
	{ enumValue: DailyLearningEnum.ChofetzChaim, key: 'chofetzChaim', hebName: 'חפץ חיים', visibility: true, desc: 'לימוד הלכות לשון הרע והרכילות מתוך ספר חפץ חיים' },
	{ enumValue: DailyLearningEnum.ShemiratHaLashon, key: 'shemiratHaLashon', hebName: 'שמירת הלשון', visibility: true, desc: 'לימוד מוסר בענייני שמירת הלשון מתוך ספר שמירת הלשון' },
	{ enumValue: DailyLearningEnum.DailyPsalms, key: 'dailyPsalms', hebName: 'תהילים יומי', visibility: true, desc: 'חלוקת ספר תהילים לימי החודש – סיום פעם בחודש' },
	{ enumValue: DailyLearningEnum.DafWeekly, key: 'dafWeekly', hebName: 'דף השבוע', visibility: true, desc: 'לימוד דף גמרא אחד בכל שבוע, בקצב איטי ומעמיק' },
	{ enumValue: DailyLearningEnum.DailyRambam1, key: 'dailyRambam1', hebName: 'רמב"ם (פרק אחד)', visibility: true, desc: 'לימוד פרק אחד ביום בהלכות הרמב"ם, לסיום בשנה אחת' },
	{ enumValue: DailyLearningEnum.DailyRambam3, key: 'dailyRambam3', hebName: 'רמב"ם (3 פרקים)', visibility: true, desc: 'לימוד שלושה פרקים ביום, לסיום משנה תורה בכחצי שנה' },
	{ enumValue: DailyLearningEnum.PerekYomi, key: 'perekYomi', hebName: 'פרק יומי', visibility: true, desc: 'לימוד פרק משנה אחד ביום לפי סדר רציף' },
	{ enumValue: DailyLearningEnum.PirkeiAvot, key: 'pirkeiAvot', hebName: 'פרקי אבות', visibility: true, desc: 'לימוד מסכת אבות במחזוריות, לרוב בשבתות בין פסח לשבועות' },
	{ enumValue: DailyLearningEnum.ArukhHaShulchanYomi, key: 'arukhHaShulchanYomi', hebName: 'ערוך השולחן יומי', visibility: true, desc: 'לימוד יומי בספר ערוך השולחן על סדר שולחן ערוך' },
	{ enumValue: DailyLearningEnum.SeferHaMitzvot, key: 'seferHaMitzvot', hebName: 'ספר המצוות', visibility: true, desc: 'לימוד מצוות התורה לפי מניין הרמב"ם' },
	{ enumValue: DailyLearningEnum.KitzurShulchanAruch, key: 'kitzurShulchanAruch', hebName: 'קיצור שולחן ערוך', visibility: true, desc: 'לימוד הלכות יומי בהתאם לקיצור שולחן ערוך' },
	{ enumValue: DailyLearningEnum.YerushalmiYomiV, key: 'yerushalmiYomiV', hebName: 'ירושלמי יומי - וילנא', visibility: true, desc: 'לימוד דף יומי בתלמוד ירושלמי (מהדורת וילנא), במחזור של כ-4.25 שנים.' },
	{ enumValue: DailyLearningEnum.YerushalmiYomiS, key: 'yerushalmiYomiS', hebName: 'ירושלמי יומי - שוטנשטיין', visibility: true, desc: 'לימוד דף יומי בתלמוד ירושלמי (מהדורת שוטנשטיין), במחזור של כ-6 שנים.' },
];
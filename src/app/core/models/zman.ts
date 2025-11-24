
export interface Zman {
    key: keyof ZmanimVisibility;
    name: string;
    hebName: string;
    time: string | Date;
}

export type ZmanimModel = Zman[];


export interface ZmanimVisibility {
    [key: string]: boolean;
    alotHaShachar: boolean,
    misheyakir: boolean,
    misheyakirMachmir: boolean,
    dawn: boolean,
    neitzHaChama: boolean,
    sunrise: boolean,
    sofZmanShma: boolean,
    sofZmanTfilla: boolean,
    chatzot: boolean,
    minchaGedola: boolean,
    minchaKetana: boolean,
    plagHaMincha: boolean,
    shkiah: boolean,
    eveningTime: boolean,
    dusk: boolean,
    tzeitHaKochavim: boolean,
    chatzotNightTime: boolean,
}


export const ZMANIM: HebKeyLabel<ZmanimVisibility>[] = [
    { key: 'chatzotNightTime', hebName: 'חצות הלילה' },
    { key: 'alotHaShachar', hebName: 'עלות השחר' },
    { key: 'misheyakir', hebName: 'משיכיר' },
    { key: 'misheyakirMachmir', hebName: 'משיכיר מחמיר' },
    { key: 'dawn', hebName: 'אור ראשון' },
    { key: 'neitzHaChama', hebName: 'נץ החמה' },
    { key: 'sunrise', hebName: 'זריחה' },
    { key: 'sofZmanShma', hebName: 'סו״ז ק״ש' },
    { key: 'sofZmanTfilla', hebName: 'סו״ז תפילה' },
    { key: 'chatzot', hebName: 'חצות היום' },
    { key: 'minchaGedola', hebName: 'מנחה גדולה' },
    { key: 'minchaKetana', hebName: 'מנחה קטנה' },
    { key: 'plagHaMincha', hebName: 'פלג המנחה' },
    { key: 'shkiah', hebName: 'שקיעה' },
    { key: 'dusk', hebName: 'צאת הכוכבים' },
    { key: 'tzeitHaKochavim', hebName: 'דמדומי חמה' },
    { key: 'eveningTime', hebName: 'זמן ערב' },
];



import { EnumData } from "./enumData";
import { HebKeyLabel } from "./hebrew-key-label";

export interface Zman {
    key: keyof ZmanimVisibility; // for easier filtering and tracking
    name: string;
    hebName: string;
    time: string | Date;
}



export enum ZmanimEnum {
	ChatzotNightTime = 1,
	AlotHaShachar,
	Misheyakir,
	MisheyakirMachmir,
	Dawn,
	NeitzHaChama,
	Sunrise,
	SofZmanShma,
	SofZmanTfilla,
	Chatzot,
	MinchaGedola,
	MinchaKetana,
	PlagHaMincha,
	Shkiah,
	Dusk,
	TzeitHaKochavim,
	EveningTime
}


export const ZmanimEnumData: EnumData[] = [
	{ enumValue: ZmanimEnum.ChatzotNightTime, key: 'chatzotNightTime', hebName: 'חצות הלילה', visibility: true },
	{ enumValue: ZmanimEnum.AlotHaShachar, key: 'alotHaShachar', hebName: 'עלות השחר', visibility: true },
	{ enumValue: ZmanimEnum.Misheyakir, key: 'misheyakir', hebName: 'משיכיר', visibility: true },
	{ enumValue: ZmanimEnum.MisheyakirMachmir, key: 'misheyakirMachmir', hebName: 'משיכיר מחמיר', visibility: true },
	{ enumValue: ZmanimEnum.Dawn, key: 'dawn', hebName: 'אור ראשון', visibility: true },
	{ enumValue: ZmanimEnum.NeitzHaChama, key: 'neitzHaChama', hebName: 'נץ החמה', visibility: true },
	{ enumValue: ZmanimEnum.Sunrise, key: 'sunrise', hebName: 'זריחה', visibility: true },
	{ enumValue: ZmanimEnum.SofZmanShma, key: 'sofZmanShma', hebName: 'סו״ז ק״ש', visibility: true },
	{ enumValue: ZmanimEnum.SofZmanTfilla, key: 'sofZmanTfilla', hebName: 'סו״ז תפילה', visibility: true },
	{ enumValue: ZmanimEnum.Chatzot, key: 'chatzot', hebName: 'חצות היום', visibility: true },
	{ enumValue: ZmanimEnum.MinchaGedola, key: 'minchaGedola', hebName: 'מנחה גדולה', visibility: true },
	{ enumValue: ZmanimEnum.MinchaKetana, key: 'minchaKetana', hebName: 'מנחה קטנה', visibility: true },
	{ enumValue: ZmanimEnum.PlagHaMincha, key: 'plagHaMincha', hebName: 'פלג המנחה', visibility: true },
	{ enumValue: ZmanimEnum.Shkiah, key: 'shkiah', hebName: 'שקיעה', visibility: true },
	{ enumValue: ZmanimEnum.Dusk, key: 'dusk', hebName: 'צאת הכוכבים', visibility: true },
	{ enumValue: ZmanimEnum.TzeitHaKochavim, key: 'tzeitHaKochavim', hebName: 'דמדומי חמה', visibility: true },
	{ enumValue: ZmanimEnum.EveningTime, key: 'eveningTime', hebName: 'זמן ערב', visibility: true },
];

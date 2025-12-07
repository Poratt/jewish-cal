import { EnumData } from "./enumData";

export interface Zman {
    key: keyof ZmanimVisibility; // for easier filtering and tracking
    name: string;
    hebName: string;
    time: string | Date;
}

export type ZmanimModel = Zman[];

export interface ZmanimVisibility {
    [key: string]: boolean;
    alotHaShachar: boolean;
    misheyakir: boolean;
    misheyakirMachmir: boolean;
    dawn: boolean;
    neitzHaChama: boolean;
    sunrise: boolean;
    sofZmanShma: boolean;
    sofZmanTfilla: boolean;
    chatzot: boolean;
    minchaGedola: boolean;
    minchaKetana: boolean;
    plagHaMincha: boolean;
    shkiah: boolean;
    eveningTime: boolean;
    dusk: boolean;
    tzeitHaKochavim: boolean;
    chatzotNightTime: boolean;
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
	{ 
        enumValue: ZmanimEnum.ChatzotNightTime, 
        key: 'chatzotNightTime', 
        hebName: 'חצות הלילה', 
        visibility: true,
        desc: 'נקודת אמצע הלילה, 6 שעות יחסיות לאחר השקיעה.'
    },
	{ 
        enumValue: ZmanimEnum.AlotHaShachar, 
        key: 'alotHaShachar', 
        hebName: 'עלות השחר', 
        visibility: true,
        desc: 'תחילת האור הראשון בבוקר, כשהשמש עדיין מתחת לאופק.'
    },
	{ 
        enumValue: ZmanimEnum.Misheyakir, 
        key: 'misheyakir', 
        hebName: 'משיכיר', 
        visibility: true,
        desc: 'הזמן המוקדם ביותר להנחת טלית ותפילין, כשיש מספיק אור להבחין בין תכלת ללבן.'
    },
	{ 
        enumValue: ZmanimEnum.MisheyakirMachmir, 
        key: 'misheyakirMachmir', 
        hebName: 'משיכיר (מחמיר)', 
        visibility: true,
        desc: 'זמן "משיכיר" לפי שיטה מחמירה יותר, עם רמת אור גבוהה יותר.'
    },
	{ 
        enumValue: ZmanimEnum.Dawn, 
        key: 'dawn', 
        hebName: 'אור ראשון', 
        visibility: true,
        desc: 'זמן תחילת הדמדומים של הבוקר, לפני הזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.NeitzHaChama, 
        key: 'neitzHaChama', 
        hebName: 'נץ החמה', 
        visibility: true,
        desc: 'הרגע המדויק שבו קצה השמש מתחיל להיראות באופק. זהו שם נרדף לזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.Sunrise, 
        key: 'sunrise', 
        hebName: 'זריחה', 
        visibility: true,
        desc: 'הזמן שבו הקצה העליון של השמש נראה מעל האופק.'
    },
	{ 
        enumValue: ZmanimEnum.SofZmanShma, 
        key: 'sofZmanShma', 
        hebName: 'סו״ז ק״ש', 
        visibility: true,
        desc: 'השעה האחרונה שבה ניתן לקרוא קריאת שמע, 3 שעות יחסיות לאחר הזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.SofZmanTfilla, 
        key: 'sofZmanTfilla', 
        hebName: 'סו״ז תפילה', 
        visibility: true,
        desc: 'השעה האחרונה שבה ניתן להתפלל שחרית, 4 שעות יחסיות לאחר הזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.Chatzot, 
        key: 'chatzot', 
        hebName: 'חצות היום', 
        visibility: true,
        desc: 'אמצע היום, הנקודה שבין הזריחה לשקיעה.'
    },
	{ 
        enumValue: ZmanimEnum.MinchaGedola, 
        key: 'minchaGedola', 
        hebName: 'מנחה גדולה', 
        visibility: true,
        desc: 'הזמן המוקדם ביותר שבו ניתן להתפלל מנחה, 6.5 שעות יחסיות לאחר הזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.MinchaKetana, 
        key: 'minchaKetana', 
        hebName: 'מנחה קטנה', 
        visibility: true,
        desc: 'הזמן המועדף לתחילת תפילת מנחה, 9.5 שעות יחסיות לאחר הזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.PlagHaMincha, 
        key: 'plagHaMincha', 
        hebName: 'פלג המנחה', 
        visibility: true,
        desc: 'נקודת זמן הנמצאת באמצע בין מנחה קטנה לסוף היום, 10.75 שעות יחסיות לאחר הזריחה.'
    },
	{ 
        enumValue: ZmanimEnum.Shkiah, 
        key: 'shkiah', 
        hebName: 'שקיעה', 
        visibility: true,
        desc: 'הזמן שבו הקצה העליון של השמש נעלם מתחת לאופק.'
    },
	{ 
        enumValue: ZmanimEnum.Dusk, 
        key: 'dusk', 
        hebName: 'בין השמשות', 
        visibility: true,
        desc: 'זמן הדמדומים בערב, בין השקיעה לצאת הכוכבים.'
    },
	{ 
        enumValue: ZmanimEnum.TzeitHaKochavim, 
        key: 'tzeitHaKochavim', 
        hebName: 'צאת הכוכבים', 
        visibility: true,
        desc: 'הזמן שבו נראים שלושה כוכבים בינוניים, המציין את תחילת הלילה.'
    },
	{ 
        enumValue: ZmanimEnum.EveningTime, 
        key: 'eveningTime', 
        hebName: 'זמן ערב', 
        visibility: true,
        desc: 'מציין את שעת השקיעה של היום הקודם.'
    },
];

export interface GroupedZmanim {
    morning: Zman[];
    afternoon: Zman[];
    evening: Zman[];
}

export function groupZmanimByCategory(zmanim: ZmanimModel): GroupedZmanim | null {
    if (!zmanim || zmanim.length === 0) {
        return null;
    }

    const afternoonZmanimKeys: string[] = ['chatzot', 'minchaGedola', 'minchaKetana', 'plagHaMincha'];
    const eveningZmanimKeys: string[] = ['shkiah', 'eveningTime', 'dusk', 'tzeitHaKochavim', 'chatzotNightTime'];

    const result: GroupedZmanim = {
        morning: [],
        afternoon: [],
        evening: []
    };

    zmanim.forEach(zman => {
        if (afternoonZmanimKeys.includes(zman.key as string)) {
            result.afternoon.push(zman);
        } else if (eveningZmanimKeys.includes(zman.key as string)) {
            result.evening.push(zman);
        } else {
            // All other zmanim fall into the 'morning' category by default
            result.morning.push(zman);
        }
    });

    return result;
}
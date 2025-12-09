import { EnumData } from "./enumData";

export interface Zman {
    key: string;
    hebName: string;
    desc?: string;
    time: string | Date;
}

export interface GroupedZmanim {
    morning: {
        items: Zman[];
        data: EnumData;
    }
    afternoon: {
        items: Zman[];
        data: EnumData;
    }
    evening: {
        items: Zman[];
        data: EnumData;
    }
}

// Interface for managing which zmanim are visible in the UI.
export interface ZmanimVisibility {
    [key: string]: boolean;
    alotHaShachar: boolean;
    misheyakir: boolean;
    misheyakirMachmir: boolean;
    dawn: boolean;
    neitzHaChama: boolean;
    sunrise: boolean;
    sofZmanShmaGRA: boolean;
    sofZmanTfillaGRA: boolean;
    sofZmanShmaMGA: boolean;
    sofZmanTfillaMGA: boolean;
    chatzot: boolean;
    minchaGedolaGRA: boolean;
    minchaKetanaGRA: boolean;
    minchaGedolaMGA: boolean;
    minchaKetanaMGA: boolean;
    plagHaMincha: boolean;
    shkiah: boolean;
    eveningTime: boolean;
    dusk: boolean;
    tzeitHaKochavim: boolean;
    chatzotNightTime: boolean;
}

// --- Single Source of Truth ---
export const ZmanimEnumData: EnumData[] = [
  // Morning Times
  { key: 'alotHaShachar', hebName: 'עלות השחר', desc: 'תחילת האור הראשון בבוקר, כשהשמש עדיין מתחת לאופק.', category: 'morning' },
  { key: 'misheyakir', hebName: 'משיכיר', desc: 'הזמן המוקדם ביותר להנחת טלית ותפילין, כשיש מספיק אור להבחין בין תכלת ללבן.', category: 'morning' },
  { key: 'misheyakirMachmir', hebName: 'משיכיר (מחמיר)', desc: 'זמן "משיכיר" לפי שיטה מחמירה יותר, עם רמת אור גבוהה יותר.', category: 'morning' },
  { key: 'dawn', hebName: 'אור ראשון', desc: 'זמן תחילת הדמדומים של הבוקר, לפני הזריחה.', category: 'morning' },
  { key: 'neitzHaChama', hebName: 'נץ החמה', desc: 'הרגע המדויק שבו קצה השמש מתחיל להיראות באופק. זהו שם נרדף לזריחה.', category: 'morning' },
  { key: 'sunrise', hebName: 'זריחה', desc: 'הזמן שבו הקצה העליון של השמש נראה מעל האופק.', category: 'morning' },
  { key: 'sofZmanShmaGRA', hebName: 'סו״ז ק״ש (גר"א)', desc: 'השעה האחרונה לקריאת שמע לפי שיטת הגר"א, 3 שעות זמניות לאחר הזריחה.', category: 'morning' },
  { key: 'sofZmanTfillaGRA', hebName: 'סו״ז תפילה (גר"א)', desc: 'השעה האחרונה לתפילת שחרית לפי שיטת הגר"א, 4 שעות זמניות לאחר הזריחה.', category: 'morning' },
  { key: 'sofZmanShmaMGA', hebName: 'סו״ז ק״ש (מג"א)', desc: 'השעה האחרונה לקריאת שמע לפי שיטת המגן אברהם.', category: 'morning' },
  { key: 'sofZmanTfillaMGA', hebName: 'סו״ז תפילה (מג"א)', desc: 'השעה האחרונה לתפילת שחרית לפי שיטת המגן אברהם.', category: 'morning' },

  // Afternoon Times
  { key: 'chatzot', hebName: 'חצות היום', desc: 'אמצע היום, הנקודה שבין הזריחה לשקיעה.', category: 'afternoon' },
  { key: 'minchaGedolaGRA', hebName: 'מנחה גדולה (גר"א)', desc: 'הזמן המוקדם ביותר לתפילת מנחה לפי הגר"א.', category: 'afternoon' },
  { key: 'minchaKetanaGRA', hebName: 'מנחה קטנה (גר"א)', desc: 'הזמן המועדף לתחילת תפילת מנחה, 9.5 שעות יחסיות לאחר הזריחה.', category: 'afternoon' },
  { key: 'minchaGedolaMGA', hebName: 'מנחה גדולה (מג"א)', desc: 'הזמן המוקדם ביותר לתפילת מנחה לפי המגן אברהם.', category: 'afternoon' },
  { key: 'minchaKetanaMGA', hebName: 'מנחה קטנה (מג"א)', desc: 'הזמן המועדף לתחילת תפילת מנחה לפי המגן אברהם.', category: 'afternoon' },
  { key: 'plagHaMincha', hebName: 'פלג המנחה', desc: 'נקודת זמן באמצע בין מנחה קטנה לסוף היום, 10.75 שעות יחסיות לאחר הזריחה.', category: 'afternoon' },

  // Evening Times
  { key: 'shkiah', hebName: 'שקיעה', desc: 'הזמן שבו השמש נעלמת מתחת לאופק.', category: 'evening' },
  { key: 'eveningTime', hebName: 'זמן ערב', desc: 'מציין את שעת השקיעה של היום הקודם.', category: 'evening' },
  { key: 'dusk', hebName: 'בין השמשות', desc: 'זמן הדמדומים בערב, בין השקיעה לצאת הכוכבים.', category: 'evening' },
  { key: 'tzeitHaKochavim', hebName: 'צאת הכוכבים', desc: 'הזמן שבו נראים שלושה כוכבים בינוניים, המציין את תחילת הלילה.', category: 'evening' },
  { key: 'chatzotNightTime', hebName: 'חצות הלילה', desc: 'נקודת אמצע הלילה, 6 שעות יחסיות לאחר השקיעה.', category: 'evening' }
];

export function groupZmanimByCategory(zmanim: Zman[]): GroupedZmanim | null {
    if (!zmanim || zmanim.length === 0) {
        return null;
    }

    const groups: GroupedZmanim = {
        morning: {
            items: [],
            data: { key: 'morning', hebName: 'זמני בוקר', icon: 'pi pi-sun' }
        },
        afternoon: {
            items: [],
            data: { key: 'afternoon', hebName: 'זמני צהריים', icon: 'pi pi-bolt' }
        },
        evening: {
            items: [],
            data: { key: 'evening', hebName: 'זמני ערב ולילה', icon: 'pi pi-moon' }
        }
    };

    for (const zman of zmanim) {
        const definition = ZmanimEnumData.find(def => def.key === zman.key);
        if (definition && definition.category) {
            const category = definition.category as keyof GroupedZmanim;
            if (groups[category]) {
                groups[category].items.push(zman);
            }
        }
    }

    return groups;
}
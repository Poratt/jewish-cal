import { Injectable } from '@angular/core';
import { Location, Zmanim } from '@hebcal/core';
import { Zman } from '../models/zman';

@Injectable({
	providedIn: 'root'
})
export class HebcalZmanimService {

	public getZmanim(date: Date = new Date(), location: Location): Zman[] {
		const dateTimeFormat = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
		const zmanimInstance = new Zmanim(location, date, true);
		const zmanim: Zman[] = [
			// Morning
			{ key: 'alotHaShachar', hebName: 'עלות השחר', time: Zmanim.formatTime(zmanimInstance.alotHaShachar(), dateTimeFormat) },
			{ key: 'misheyakir', hebName: 'מִשֶּׁיַּכִּיר', time: Zmanim.formatTime(zmanimInstance.misheyakir(), dateTimeFormat) },
			{ key: 'misheyakirMachmir', hebName: 'מִשֶּׁיַּכִּיר  מחמיר', time: Zmanim.formatTime(zmanimInstance.misheyakirMachmir(), dateTimeFormat) },
			{ key: 'dawn', hebName: 'אור ראשון', time: Zmanim.formatTime(zmanimInstance.dawn(), dateTimeFormat) },
			{ key: 'neitzHaChama', hebName: 'נץ החמה', time: Zmanim.formatTime(zmanimInstance.neitzHaChama(), dateTimeFormat) },
			{ key: 'sunrise', hebName: 'זריחה', time: Zmanim.formatTime(zmanimInstance.sunrise(), dateTimeFormat) },
			{ key: 'sofZmanShma', hebName: 'סו״ז ק״ש (גר"א)', time: Zmanim.formatTime(zmanimInstance.sofZmanShma(), dateTimeFormat) },
			{ key: 'sofZmanTfilla', hebName: 'סו״ז תפילה (גר"א)', time: Zmanim.formatTime(zmanimInstance.sofZmanTfilla(), dateTimeFormat) },
			{ key: 'sofZmanShmaMGA', hebName: 'סו״ז ק״ש (מג"א)', time: Zmanim.formatTime(zmanimInstance.sofZmanShmaMGA(), dateTimeFormat) },
			{ key: 'sofZmanTfillaMGA', hebName: 'סו״ז תפילה (מג"א)', time: Zmanim.formatTime(zmanimInstance.sofZmanTfillaMGA(), dateTimeFormat) },

			// Afternoon
			{ key: 'chatzot', hebName: 'חצות היום', time: Zmanim.formatTime(zmanimInstance.chatzot(), dateTimeFormat) },
			{ key: 'minchaGedola', hebName: 'מנחה גדולה (גר"א)', time: Zmanim.formatTime(zmanimInstance.minchaGedola(), dateTimeFormat) },
			{ key: 'minchaKetana', hebName: 'מנחה קטנה', time: Zmanim.formatTime(zmanimInstance.minchaKetana(), dateTimeFormat) },
			{ key: 'minchaGedolaMGA', hebName: 'מנחה גדולה (מג"א)', time: Zmanim.formatTime(zmanimInstance.minchaGedolaMGA(), dateTimeFormat) },
			{ key: 'minchaKetanaMGA', hebName: 'מנחה קטנה (מג"א)', time: Zmanim.formatTime(zmanimInstance.minchaKetanaMGA(), dateTimeFormat) },
			{ key: 'plagHaMincha', hebName: 'פלג המנחה', time: Zmanim.formatTime(zmanimInstance.plagHaMincha(), dateTimeFormat) },

			// Evening
			{ key: 'shkiah', hebName: 'שקיעה', time: Zmanim.formatTime(zmanimInstance.shkiah(), dateTimeFormat) },
			{ key: 'eveningTime', hebName: 'זמן ערב', time: Zmanim.formatTime(zmanimInstance.gregEve(), dateTimeFormat) },
			{ key: 'dusk', hebName: 'בין השמשות', time: Zmanim.formatTime(zmanimInstance.dusk(), dateTimeFormat) },
			{ key: 'tzeitHaKochavim', hebName: 'צאת הכוכבים', time: Zmanim.formatTime(zmanimInstance.tzeit(), dateTimeFormat) },
			{ key: 'chatzotNightTime', hebName: 'חצות הלילה', time: Zmanim.formatTime(zmanimInstance.chatzotNight(), dateTimeFormat) },
		];

		const validZmanim = zmanim.filter(z => (z.time instanceof Date && !isNaN(z.time.getTime())) || (typeof z.time === 'string' && z.time));

		return validZmanim.sort((a, b) => String(a.time).localeCompare(String(b.time)));
	}
}
import { Injectable } from '@angular/core';
import { Location, Zmanim } from '@hebcal/core';
import { ZmanimModel, Zman } from '../models/zman';


@Injectable({
	providedIn: 'root'
})
export class HebcalZmanimService {

	public getZmanim(date: Date = new Date(), location: Location): ZmanimModel {
		const dateTimeFormat = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
		const zmanimInstance = new Zmanim(location, date, false);
		const zmanim: Zman[] = [
			{ key: 'alotHaShachar', name: 'Alot HaShachar', hebName: 'עלות השחר', time: Zmanim.formatTime(zmanimInstance.alotHaShachar(), dateTimeFormat) },
			{ key: 'misheyakir', name: 'Misheyakir', hebName: 'מִשֶּׁיַּכִּיר', time: Zmanim.formatTime(zmanimInstance.misheyakir(), dateTimeFormat) },
			{ key: 'misheyakirMachmir', name: 'Misheyakir Machmir', hebName: 'מִשֶּׁיַּכִּיר  מחמיר', time: Zmanim.formatTime(zmanimInstance.misheyakirMachmir(), dateTimeFormat) },
			{ key: 'dawn', name: 'Dawn', hebName: 'אפלולית', time: Zmanim.formatTime(zmanimInstance.dawn(), dateTimeFormat) },
			{ key: 'neitzHaChama', name: 'Neitz HaChama', hebName: 'נץ החמה', time: Zmanim.formatTime(zmanimInstance.neitzHaChama(), dateTimeFormat) },
			{ key: 'sunrise', name: 'Sunrise', hebName: 'זריחה', time: Zmanim.formatTime(zmanimInstance.sunrise(), dateTimeFormat) },
			{ key: 'sofZmanShma', name: 'Sof Zman Shma', hebName: 'סוף זמן קריאת שמע', time: Zmanim.formatTime(zmanimInstance.sofZmanShma(), dateTimeFormat) },
			{ key: 'sofZmanTfilla', name: 'Sof Zman Tfilla', hebName: 'סוף זמן תפילה', time: Zmanim.formatTime(zmanimInstance.sofZmanTfilla(), dateTimeFormat) },
			{ key: 'chatzot', name: 'Chatzot', hebName: 'חצות היום', time: Zmanim.formatTime(zmanimInstance.chatzot(), dateTimeFormat) },
			{ key: 'minchaGedola', name: 'Mincha Gedola', hebName: 'מנחה גדולה', time: Zmanim.formatTime(zmanimInstance.minchaGedola(), dateTimeFormat) },
			{ key: 'minchaKetana', name: 'Mincha Ketana', hebName: 'מנחה קטנה', time: Zmanim.formatTime(zmanimInstance.minchaKetana(), dateTimeFormat) },
			{ key: 'plagHaMincha', name: 'Plag HaMincha', hebName: 'פלג המנחה', time: Zmanim.formatTime(zmanimInstance.plagHaMincha(), dateTimeFormat) },
			{ key: 'shkiah', name: 'Shkiah', hebName: 'שקיעה', time: Zmanim.formatTime(zmanimInstance.shkiah(), dateTimeFormat) },
			{ key: 'eveningTime', name: 'Evening Time', hebName: 'זמן הערב', time: Zmanim.formatTime(zmanimInstance.gregEve(), dateTimeFormat) },
			{ key: 'dusk', name: 'Dusk', hebName: 'השקפת החמה', time: Zmanim.formatTime(zmanimInstance.dusk(), dateTimeFormat) },
			{ key: 'tzeitHaKochavim', name: 'Tzeit HaKochavim', hebName: 'צאת הכוכבים', time: Zmanim.formatTime(zmanimInstance.tzeit(), dateTimeFormat) },
			{ key: 'chatzotNightTime', name: 'Chatzot Night Time', hebName: 'חצות הלילה', time: Zmanim.formatTime(zmanimInstance.chatzotNight(), dateTimeFormat) },
		];
		return zmanim.sort((a, b) => String(a.time).localeCompare(String(b.time)));
	}

}
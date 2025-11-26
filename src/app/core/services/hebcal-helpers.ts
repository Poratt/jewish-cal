import { gematriya, HDate, HebrewCalendar, Locale } from '@hebcal/core';
import { Aliyah } from "@hebcal/leyning";
import { HebrewMonths } from '../constants/namesInfo';
import { ARUKH_HASHULCHAN, ArukhHaShulchanEnum } from '../data/dictionaries/arukhHaShulchan';
import { BAVLI, MasechetBavli } from '../data/dictionaries/bavli';
import { BIBLE, BibleBook } from '../data/dictionaries/bible';
import { CHOFETZ_HAIM_HALACHOT, ChofetzHaimHalacha } from '../data/dictionaries/chofetz-haim-books';
import { MISHNAH, MishnahTractate } from '../data/dictionaries/mishnah';
import { RAMBAM_HALACHA_MAP, RAMBAM_HALACHA } from '../data/dictionaries/rambam';
import { SHMIRAT_HALASHON, ShmiratHalashonEnum } from '../data/dictionaries/shmirat-halashon';
import { City } from '../models/city';

export function toGematriya(n: number | string): string {
	if (n === null || n === undefined) return '';
	const num = typeof n === 'string' ? parseInt(n, 10) : n;
	return isNaN(num) ? String(n) : gematriya(num).replace(/'/g, '״');
}

export function translate(str: string, locale: string = 'he'): string {
	if (locale !== 'he') {
		return Locale.lookupTranslation(str, locale) || str;
	}

	switch (true) {
		case !!BIBLE[str as BibleBook]: return BIBLE[str as BibleBook];
		case !!BAVLI[str as MasechetBavli]: return BAVLI[str as MasechetBavli];
		case !!RAMBAM_HALACHA_MAP[str] && !!RAMBAM_HALACHA[RAMBAM_HALACHA_MAP[str]]: return RAMBAM_HALACHA[RAMBAM_HALACHA_MAP[str]];
		case !!CHOFETZ_HAIM_HALACHOT[str as ChofetzHaimHalacha]: return CHOFETZ_HAIM_HALACHOT[str as ChofetzHaimHalacha];
		case !!SHMIRAT_HALASHON[str as ShmiratHalashonEnum ]: return SHMIRAT_HALASHON[str as ShmiratHalashonEnum ];
		case !!MISHNAH[str as MishnahTractate]: return MISHNAH[str as MishnahTractate];
		case !!ARUKH_HASHULCHAN[str as ArukhHaShulchanEnum ]: return ARUKH_HASHULCHAN[str as ArukhHaShulchanEnum ];
		default: return Locale.lookupTranslation(str, locale) || str;
	}
}

export function getHallelStatus(hDate: HDate): string | undefined {
	const hallel = HebrewCalendar.hallel(hDate, true);
	if (hallel === 1) return 'חצי הלל';
	if (hallel === 2) return 'הלל שלם';
	return undefined;
}

export function getHaftaraBook(haftara: string): string {
	if (!haftara) return '';
	const match = haftara.match(/\d/);
	if (!match || typeof match.index === 'undefined') return translate(haftara);
	return translate(haftara.substring(0, match.index).trim());
}

export function getHaftaraVerses(haftara: string): string {
	if (!haftara) return '';
	const match = haftara.match(/\d/);
	return (match && typeof match.index !== 'undefined') ? formatVerses(haftara.substring(match.index)) : '';
}

export function formatAliyahVerses(aliyah: Aliyah): string {
	return formatVersesFromParts(aliyah.b, aliyah.e);
}

function formatVersesFromParts(start: string, end: string): string {
	if (!start) return '';
	
	const [startChapter, startVerse] = start.split(':');
	let result = `פרק ${toGematriya(startChapter)} פסוק ${toGematriya(startVerse)}`;

	if (start !== end && end) {
		if (end.includes(':')) {
			const [endChapter, endVerse] = end.split(':');
			if (startChapter === endChapter) {
				// Same chapter, just add the end verse
				result += ` - ${toGematriya(endVerse)}`;
			} else {
				// Different chapters, add the full end part
				result += ` - פרק ${toGematriya(endChapter)} פסוק ${toGematriya(endVerse)}`;
			}
		} else {
			// End is just a verse number in the same chapter
			result += ` - ${toGematriya(end)}`;
		}
	}

	return result.replace(/'/g, '״');
}

function formatVerses(verses: string): string {
	return verses.split(',')
		.map(part => {
			const trimmedPart = part.trim();
			const [start, end] = trimmedPart.replace('–', '-').split('-');
			return formatVersesFromParts(start, end || start);
		})
		.join(', ');
}

export function groupCitiesByCountry(cities: City[]): {countryHeb: string; items: City[] }[] {
		const groups: { [key: string]: City[] } = {};
		for (const city of cities) {
			const country = city.countryHeb;
			if (!groups[country]) {
				groups[country] = [];
			}
			groups[country].push(city);
		}
		const grouped = Object.keys(groups)
			.sort((a, b) => a.localeCompare(b, 'he'))
			.map(countryHeb => ({
				countryHeb,
				items: groups[countryHeb].sort((a, b) => a.cityHeb.localeCompare(b.cityHeb, 'he'))
			}));
		return grouped;
	}

export function getHebrewDate(year: number, month: number, day: number): string {
	return new HDate(new Date(year, month, day)).renderGematriya();
}

export function getHebMonth(year: number, month: number, day: number): string {
	return new HDate(new Date(year, month, day)).render('he', false);
}

export function getMonthName(month: number): string {
	return HebrewMonths[month];
}

export function getHebYear(fullDate: Date): string {
	return gematriya(new HDate(fullDate).getFullYear());
}
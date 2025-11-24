import { Pipe, PipeTransform } from "@angular/core";

export enum ArukhHaShulchanEnum {
	OrachChaim = "Orach Chaim",
	YorehDeah = "Yoreh De'ah",
	ChoshenMishpat = "Choshen Mishpat",
	EvenHaEzer = "Even HaEzer",
	Unknown = "x"
}

export const ARUKH_HASHULCHAN: Record<ArukhHaShulchanEnum, string> = {
	[ArukhHaShulchanEnum.OrachChaim]: "אוֹרַח חַיִּים",
	[ArukhHaShulchanEnum.YorehDeah]: "יוֹרֶה דֵעָה",
	[ArukhHaShulchanEnum.ChoshenMishpat]: "חוֹשֶׁן מִשְׁפָּט",
	[ArukhHaShulchanEnum.EvenHaEzer]: "אֶבֶן הָעֵזֶר",
	[ArukhHaShulchanEnum.Unknown]: "חלק לא מזוהה"
};

// Create a normalized map for robust, case-insensitive translation
export const ARUKH_HASHULCHAN_NORMALIZED_MAP: Record<string, string> = Object.entries(ARUKH_HASHULCHAN).reduce((acc, [key, value]) => {
	const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
	acc[normalizedKey] = value;
	return acc;
}, {} as Record<string, string>);

@Pipe({
	name: "arukhHaShulchanName",
	standalone: true
})
export class ArukhHaShulchanNamePipe implements PipeTransform {
	transform(value: string | ArukhHaShulchanEnum): string {
		const key = value as ArukhHaShulchanEnum;
		return ARUKH_HASHULCHAN[key] ?? ARUKH_HASHULCHAN[ArukhHaShulchanEnum.Unknown];
	}
}
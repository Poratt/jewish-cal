import { Pipe, PipeTransform } from "@angular/core";

export enum ShmiratHalashonEnum {
  Hakdamah = "Hakdamah",
  SharHazechira = "Shar Hazechira",
  SharHatvuna = "Shar Hatvuna",
  SharHatorah = "Shar Hatorah",
  ChasimasHasefer = "Chasimas Hasefer",
  Unknown = "x"
}

export const SHMIRAT_HALASHON: Record<ShmiratHalashonEnum, string> = {
  [ShmiratHalashonEnum.Hakdamah]: "הַקְדָּמָה",
  [ShmiratHalashonEnum.SharHazechira]: "שַׁעַר הַזְּכִירָה",
  [ShmiratHalashonEnum.SharHatvuna]: "שַׁעַר הַתְּבוּנָה",
  [ShmiratHalashonEnum.SharHatorah]: "שַׁעַר הַתּוֹרָה",
  [ShmiratHalashonEnum.ChasimasHasefer]: "חֲתִימַת הַסֵּפֶר",
  [ShmiratHalashonEnum.Unknown]: "חלק לא מזוהה"
};

// Create a normalized map for robust, case-insensitive translation
export const SHMIRAT_HALASHON_NORMALIZED_MAP: Record<string, string> = Object.entries(SHMIRAT_HALASHON).reduce((acc, [key, value]) => {
  // Normalize the key: lowercase and remove special characters/spaces
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  acc[normalizedKey] = value;
  return acc;
}, {} as Record<string, string>);


@Pipe({
  name: "shmiratHalashonName",
  standalone: true
})
export class ShmiratHalashonNamePipe implements PipeTransform {
  transform(value: string | ShmiratHalashonEnum): string {
    const key = value as ShmiratHalashonEnum;
    return SHMIRAT_HALASHON[key] ?? SHMIRAT_HALASHON[ShmiratHalashonEnum.Unknown];
  }
}
// src/app/common/dictionaries/mishnah.ts

import { Pipe, PipeTransform } from "@angular/core";

export enum MishnahTractate {
  // Zeraim
  Berakhot = "Berakhot",
  Peah = "Peah",
  Demai = "Demai",
  Kilayim = "Kilayim",
  Sheviit = "Sheviit",
  Terumot = "Terumot",
  Maaserot = "Maaserot",
  Maasrot = "Maasrot", // Alias
  MaaserSheni = "Maaser Sheni",
  Challah = "Challah",
  Orlah = "Orlah",
  Bikkurim = "Bikkurim",

  // Moed
  Shabbat = "Shabbat",
  Eruvin = "Eruvin",
  Pesachim = "Pesachim",
  Shekalim = "Shekalim",
  Yoma = "Yoma",
  Sukkah = "Sukkah",
  Beitzah = "Beitzah",
  RoshHashanah = "Rosh Hashanah",
  Taanit = "Taanit",
  Megillah = "Megillah",
  MoedKatan = "Moed Katan",
  Chagigah = "Chagigah",

  // Nashim
  Yevamot = "Yevamot",
  Ketubot = "Ketubot",
  Nedarim = "Nedarim",
  Nazir = "Nazir",
  Sotah = "Sotah",
  Gittin = "Gittin",
  Gitin = "Gitin", // Alias
  Kiddushin = "Kiddushin",

  // Nezikin
  BavaKamma = "Bava Kamma",
  BavaMetzia = "Bava Metzia",
  BavaBatra = "Bava Batra",
  Sanhedrin = "Sanhedrin",
  Makkot = "Makkot",
  Shevuot = "Shevuot",
  Eduyot = "Eduyot",
  AvodahZarah = "Avodah Zarah",
  Avot = "Avot",
  Horayot = "Horayot",

  // Kodashim
  Zevachim = "Zevachim",
  Menachot = "Menachot",
  Chullin = "Chullin",
  Bechorot = "Bechorot",
  Arachin = "Arachin",
  Arakhin = "Arakhin", // Alias
  Temurah = "Temurah",
  Keritot = "Keritot",
  Meilah = "Meilah",
  Tamid = "Tamid",
  Middot = "Middot",
  Kinnim = "Kinnim",

  // Tahorot
  Kelim = "Kelim",
  Oholot = "Oholot",
  Negaim = "Negaim",
  Parah = "Parah",
  Tahorot = "Tahorot",
  Mikvaot = "Mikvaot",
  Niddah = "Niddah",
  Machshirin = "Machshirin",
  Makhshirin = "Makhshirin", // Alias
  Zavim = "Zavim",
  TevulYom = "Tevul Yom",
  Yadayim = "Yadayim",
  Uktzin = "Uktzin",
  Oktzin = "Oktzin", // Alias

  Unknown = "x"
}

export const MISHNAH: Record<MishnahTractate, string> = {
  // Zeraim
  [MishnahTractate.Berakhot]: "בְּרָכוֹת",
  [MishnahTractate.Peah]: "פֵּאָה",
  [MishnahTractate.Demai]: "דְּמַאי",
  [MishnahTractate.Kilayim]: "כִּלְאַיִם",
  [MishnahTractate.Sheviit]: "שְׁבִיעִית",
  [MishnahTractate.Terumot]: "תְּרוּמוֹת",
  [MishnahTractate.Maaserot]: "מַעַשְׂרוֹת",
  [MishnahTractate.Maasrot]: "מַעַשְׂרוֹת",
  [MishnahTractate.MaaserSheni]: "מַעֲשֵׂר שֵׁנִי",
  [MishnahTractate.Challah]: "חַלָּה",
  [MishnahTractate.Orlah]: "עָרְלָה",
  [MishnahTractate.Bikkurim]: "בִּכּוּרִים",

  // Moed
  [MishnahTractate.Shabbat]: "שַׁבָּת",
  [MishnahTractate.Eruvin]: "עֵרוּבִין",
  [MishnahTractate.Pesachim]: "פְּסָחִים",
  [MishnahTractate.Shekalim]: "שְׁקָלִים",
  [MishnahTractate.Yoma]: "יוֹמָא",
  [MishnahTractate.Sukkah]: "סֻכָּה",
  [MishnahTractate.Beitzah]: "בֵּיצָה",
  [MishnahTractate.RoshHashanah]: "רֹאשׁ הַשָּׁנָה",
  [MishnahTractate.Taanit]: "תַּעֲנִית",
  [MishnahTractate.Megillah]: "מְגִלָּה",
  [MishnahTractate.MoedKatan]: "מוֹעֵד קָטָן",
  [MishnahTractate.Chagigah]: "חֲגִיגָה",

  // Nashim
  [MishnahTractate.Yevamot]: "יְבָמוֹת",
  [MishnahTractate.Ketubot]: "כְּתוּבּוֹת",
  [MishnahTractate.Nedarim]: "נְדָרִים",
  [MishnahTractate.Nazir]: "נָזִיר",
  [MishnahTractate.Sotah]: "סוֹטָה",
  [MishnahTractate.Gittin]: "גִּטִּין",
  [MishnahTractate.Gitin]: "גִּטִּין",
  [MishnahTractate.Kiddushin]: "קִדּוּשִׁין",

  // Nezikin
  [MishnahTractate.BavaKamma]: "בָּבָא קַמָּא",
  [MishnahTractate.BavaMetzia]: "בָּבָא מְצִיעָא",
  [MishnahTractate.BavaBatra]: "בָּבָא בַּתְרָא",
  [MishnahTractate.Sanhedrin]: "סַנְהֶדְרִין",
  [MishnahTractate.Makkot]: "מַכּוֹת",
  [MishnahTractate.Shevuot]: "שְּׁבוּעוֹת",
  [MishnahTractate.Eduyot]: "עֵדֻיּוֹת",
  [MishnahTractate.AvodahZarah]: "עֲבוֹדָה זָרָה",
  [MishnahTractate.Avot]: "אָבוֹת",
  [MishnahTractate.Horayot]: "הוֹרָיוֹת",

  // Kodashim
  [MishnahTractate.Zevachim]: "זְבָחִים",
  [MishnahTractate.Menachot]: "מְנָחוֹת",
  [MishnahTractate.Chullin]: "חֻלִּין",
  [MishnahTractate.Bechorot]: "בְּכוֹרוֹת",
  [MishnahTractate.Arachin]: "עֲרָכִין",
  [MishnahTractate.Arakhin]: "עֲרָכִין",
  [MishnahTractate.Temurah]: "תְּמוּרָה",
  [MishnahTractate.Keritot]: "כְּרִיתוֹת",
  [MishnahTractate.Meilah]: "מְעִילָה",
  [MishnahTractate.Tamid]: "תָּמִיד",
  [MishnahTractate.Middot]: "מִדּוֹת",
  [MishnahTractate.Kinnim]: "קִנִּים",

  // Tahorot
  [MishnahTractate.Kelim]: "כֵּלִים",
  [MishnahTractate.Oholot]: "אֹהָלוֹת",
  [MishnahTractate.Negaim]: "נְגָעִים",
  [MishnahTractate.Parah]: "פָּרָה",
  [MishnahTractate.Tahorot]: "טָהֳרוֹת",
  [MishnahTractate.Mikvaot]: "מִקְוָאוֹת",
  [MishnahTractate.Niddah]: "נִדָּה",
  [MishnahTractate.Machshirin]: "מַכְשִׁירִין",
  [MishnahTractate.Makhshirin]: "מַכְשִׁירִין",
  [MishnahTractate.Zavim]: "זָבִים",
  [MishnahTractate.TevulYom]: "טְבוּל יוֹם",
  [MishnahTractate.Yadayim]: "יָדַיִם",
  [MishnahTractate.Uktzin]: "עֻקְצִין",
  [MishnahTractate.Oktzin]: "עֻקְצִין",

  [MishnahTractate.Unknown]: "חלק לא מזוהה"
};

export const MISHNAH_NORMALIZED_MAP: Record<string, string> = Object.entries(MISHNAH).reduce((acc, [key, value]) => {
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  acc[normalizedKey] = value;
  return acc;
}, {} as Record<string, string>);

@Pipe({
  name: "mishnahName",
  standalone: true
})
export class MishnahNamePipe implements PipeTransform {
  transform(value: string | MishnahTractate): string {
    const key = value as MishnahTractate;
    return MISHNAH[key] ?? MISHNAH[MishnahTractate.Unknown];
  }
}
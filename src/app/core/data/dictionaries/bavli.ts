import { Pipe, PipeTransform } from "@angular/core";

export enum MasechetBavli {
	Berakhot = "Berakhot",
	Shabbat = "Shabbat",
	Eruvin = "Eruvin",
	Pesachim = "Pesachim",
	Shekalim = "Shekalim",
	Yoma = "Yoma",
	Sukkah = "Sukkah",
	Beitzah = "Beitzah",
	RoshHashanah = "RoshHashanah",
	Taanit = "Taanit",
	Megillah = "Megillah",
	MoedKatan = "MoedKatan",
	Chagigah = "Chagigah",

	Yevamot = "Yevamot",
	Ketubot = "Ketubot",
	Nedarim = "Nedarim",
	Nazir = "Nazir",
	Sotah = "Sotah",
	Gittin = "Gittin",
	Kiddushin = "Kiddushin",

	BavaKamma = "BavaKamma",
	BavaMetzia = "BavaMetzia",
	BavaBatra = "BavaBatra",
	Sanhedrin = "Sanhedrin",
	Makkot = "Makkot",
	Shevuot = "Shevuot",
	AvodahZarah = "AvodahZarah",
	Horayot = "Horayot",

	Zevachim = "Zevachim",
	Menachot = "Menachot",
	Chullin = "Chullin",
	Bekhorot = "Bekhorot",
	Arachin = "Arachin",
	Temurah = "Temurah",
	Keritot = "Keritot",
	Meilah = "Meilah",
	Tamid = "Tamid",
	Middot = "Middot",
	Niddah = "Niddah",
}

export const BAVLI: Record<MasechetBavli, string> = {
	[MasechetBavli.Berakhot]: "בְּרָכוֹת",
	[MasechetBavli.Shabbat]: "שַׁבָּת",
	[MasechetBavli.Eruvin]: "עֵירוּבִין",
	[MasechetBavli.Pesachim]: "פְּסָחִים",
	[MasechetBavli.Shekalim]: "שְׁקָלִים",
	[MasechetBavli.Yoma]: "יוֹמָא",
	[MasechetBavli.Sukkah]: "סֻכָּה",
	[MasechetBavli.Beitzah]: "בֵּיצָה",
	[MasechetBavli.RoshHashanah]: "רֹאשׁ הַשָּׁנָה",
	[MasechetBavli.Taanit]: "תַּעֲנִית",
	[MasechetBavli.Megillah]: "מְגִלָּה",
	[MasechetBavli.MoedKatan]: "מוֹעֵד קָטָן",
	[MasechetBavli.Chagigah]: "חֲגִיגָה",

	[MasechetBavli.Yevamot]: "יְבָמוֹת",
	[MasechetBavli.Ketubot]: "כְּתוּבּוֹת",
	[MasechetBavli.Nedarim]: "נְדָרִים",
	[MasechetBavli.Nazir]: "נָזִיר",
	[MasechetBavli.Sotah]: "סוֹטָה",
	[MasechetBavli.Gittin]: "גִּיטִּין",
	[MasechetBavli.Kiddushin]: "קִדּוּשִׁין",

	[MasechetBavli.BavaKamma]: "בָּבָא קַמָּא",
	[MasechetBavli.BavaMetzia]: "בָּבָא מְצִיעָא",
	[MasechetBavli.BavaBatra]: "בָּבָא בַּתְרָא",
	[MasechetBavli.Sanhedrin]: "סַנְהֶדְרִין",
	[MasechetBavli.Makkot]: "מַכּוֹת",
	[MasechetBavli.Shevuot]: "שְׁבוּעוֹת",
	[MasechetBavli.AvodahZarah]: "עֲבוֹדָה זָרָה",
	[MasechetBavli.Horayot]: "הוֹרָיוֹת",

	[MasechetBavli.Zevachim]: "זְבָחִים",
	[MasechetBavli.Menachot]: "מְנָחוֹת",
	[MasechetBavli.Chullin]: "חֻלִּין",
	[MasechetBavli.Bekhorot]: "בְּכוֹרוֹת",
	[MasechetBavli.Arachin]: "עֲרָכִין",
	[MasechetBavli.Temurah]: "תְּמוּרָה",
	[MasechetBavli.Keritot]: "כְּרִיתוֹת",
	[MasechetBavli.Meilah]: "מְעִילָה",
	[MasechetBavli.Tamid]: "תָּמִיד",
	[MasechetBavli.Middot]: "מִדּוֹת",
	[MasechetBavli.Niddah]: "נִדָּה",
};

// Create a normalized map for robust, case-insensitive translation
export const BAVLI_NORMALIZED_MAP: { [key: string]: string } = Object.entries(BAVLI).reduce((acc, [key, value]) => {
    // Normalize the key: lowercase and remove special characters/spaces
    // e.g., "Bava Kamma" -> "bavakamma"
    const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
    acc[normalizedKey] = value;
    return acc;
}, {} as { [key: string]: string });


@Pipe({
	name: "masechetName",
	standalone: true
})
export class MasechetNamePipe implements PipeTransform {
	transform(value: MasechetBavli): string {
		return BAVLI[value] ?? value;
	}
}




  // public readonly yerushalmiOptions: YerushalmiOption[] = [
  //   { name: 'וילנא', value: 'vilna' },
  //   { name: 'שוטנשטיין', value: 'schottenstein' }
  // ];
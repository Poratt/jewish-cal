
// --- Single Source of Truth for all Tractate Names ---
const ALL_TRACTATES: Record<string, string> = {
    // Shared between Mishnah and Bavli
    "Berakhot": "בְּרָכוֹת",
    "Shabbat": "שַׁבָּת",
    "Eruvin": "עֵרוּבִין",
    "Pesachim": "פְּסָחִים",
    "Shekalim": "שְׁקָלִים",
    "Yoma": "יוֹמָא",
    "Sukkah": "סֻכָּה",
    "Beitzah": "בֵּיצָה",
    "Rosh Hashanah": "רֹאשׁ הַשָּׁנָה",
    "Taanit": "תַּעֲנִית",
    "Megillah": "מְגִלָּה",
    "Moed Katan": "מוֹעֵד קָטָן",
    "Chagigah": "חֲגִיגָה",
    "Yevamot": "יְבָמוֹת",
    "Ketubot": "כְּתוּבּוֹת",
    "Nedarim": "נְדָרִים",
    "Nazir": "נָזִיר",
    "Sotah": "סוֹטָה",
    "Gittin": "גִּטִּין",
    "Kiddushin": "קִדּוּשִׁין",
    "Bava Kamma": "בָּבָא קַמָּא",
    "Bava Metzia": "בָּבָא מְצִיעָא",
    "Bava Batra": "בָּבָא בַּתְרָא",
    "Sanhedrin": "סַנְהֶדְרִין",
    "Makkot": "מַכּוֹת",
    "Shevuot": "שְׁבוּעוֹת",
    "Avodah Zarah": "עֲבוֹדָה זָרָה",
    "Horayot": "הוֹרָיוֹת",
    "Zevachim": "זְבָחִים",
    "Menachot": "מְנָחוֹת",
    "Chullin": "חֻלִּין",
    "Bechorot": "בְּכוֹרוֹת",
    "Arachin": "עֲרָכִין",
    "Temurah": "תְּמוּרָה",
    "Keritot": "כְּרִיתוֹת",
    "Meilah": "מְעִילָה",
    "Tamid": "תָּמִיד",
    "Middot": "מִדּוֹת",
    "Niddah": "נִדָּה",

    // Mishna-only tractates
    "Peah": "פֵּאָה",
    "Demai": "דְּמַאי",
    "Kilayim": "כִּלְאַיִם",
    "Sheviit": "שְׁבִיעִית",
    "Terumot": "תְּרוּמוֹת",
    "Maaserot": "מַעַשְׂרוֹת",
    "Maaser Sheni": "מַעֲשֵׂר שֵׁנִי",
    "Challah": "חַלָּה",
    "Orlah": "עָרְלָה",
    "Bikkurim": "בִּכּוּרִים",
    "Eduyot": "עֵדֻיּוֹת",
    "Avot": "אָבוֹת",
    "Kinnim": "קִנִּים",
    "Kelim": "כֵּלִים",
    "Oholot": "אֹהָלוֹת",
    "Negaim": "נְגָעִים",
    "Parah": "פָּרָה",
    "Taharot": "טָהֳרוֹת",
    "Mikvaot": "מִקְוָאוֹת",
    "Machshirin": "מַכְשִׁירִין",
    "Zavim": "זָבִים",
    "Tevul Yom": "טְבוּל יוֹם",
    "Yadayim": "יָדַיִם",
    "Uktzin": "עֻקְצִין",
};

// --- MISHNAH EXPORTS ---
export const MISHNAH = ALL_TRACTATES;
export const MISHNAH_NORMALIZED_MAP: Record<string, string> = Object.entries(MISHNAH).reduce((acc, [key, value]) => {
    const normalizedKey = key.toLowerCase().replace(/[^a-z\s]/g, '');
    acc[normalizedKey] = value;
    return acc;
}, {} as Record<string, string>);


// --- BAVLI EXPORTS ---
export enum MasechetBavli {
	Berakhot = "Berakhot", Shabbat = "Shabbat", Eruvin = "Eruvin", Pesachim = "Pesachim", Shekalim = "Shekalim", Yoma = "Yoma", Sukkah = "Sukkah",
	Beitzah = "Beitzah", RoshHashanah = "Rosh Hashanah", Taanit = "Taanit", Megillah = "Megillah", MoedKatan = "Moed Katan", Chagigah = "Chagigah",
	Yevamot = "Yevamot", Ketubot = "Ketubot", Nedarim = "Nedarim", Nazir = "Nazir", Sotah = "Sotah", Gittin = "Gittin", Kiddushin = "Kiddushin",
	BavaKamma = "Bava Kamma", BavaMetzia = "Bava Metzia", BavaBatra = "Bava Batra", Sanhedrin = "Sanhedrin", Makkot = "Makkot", Shevuot = "Shevuot",
	AvodahZarah = "Avodah Zarah", Horayot = "Horayot", Zevachim = "Zevachim", Menachot = "Menachot", Chullin = "Chullin", Bechorot = "Bechorot",
	Arachin = "Arachin", Temurah = "Temurah", Keritot = "Keritot", Meilah = "Meilah", Tamid = "Tamid", Middot = "Middot", Niddah = "Niddah",
}

export const BAVLI: Record<MasechetBavli, string> = {
    [MasechetBavli.Berakhot]: ALL_TRACTATES["Berakhot"],
    [MasechetBavli.Shabbat]: ALL_TRACTATES["Shabbat"],
    [MasechetBavli.Eruvin]: ALL_TRACTATES["Eruvin"],
    [MasechetBavli.Pesachim]: ALL_TRACTATES["Pesachim"],
    [MasechetBavli.Shekalim]: ALL_TRACTATES["Shekalim"],
    [MasechetBavli.Yoma]: ALL_TRACTATES["Yoma"],
    [MasechetBavli.Sukkah]: ALL_TRACTATES["Sukkah"],
    [MasechetBavli.Beitzah]: ALL_TRACTATES["Beitzah"],
    [MasechetBavli.RoshHashanah]: ALL_TRACTATES["Rosh Hashanah"],
    [MasechetBavli.Taanit]: ALL_TRACTATES["Taanit"],
    [MasechetBavli.Megillah]: ALL_TRACTATES["Megillah"],
    [MasechetBavli.MoedKatan]: ALL_TRACTATES["Moed Katan"],
    [MasechetBavli.Chagigah]: ALL_TRACTATES["Chagigah"],
    [MasechetBavli.Yevamot]: ALL_TRACTATES["Yevamot"],
    [MasechetBavli.Ketubot]: ALL_TRACTATES["Ketubot"],
    [MasechetBavli.Nedarim]: ALL_TRACTATES["Nedarim"],
    [MasechetBavli.Nazir]: ALL_TRACTATES["Nazir"],
    [MasechetBavli.Sotah]: ALL_TRACTATES["Sotah"],
    [MasechetBavli.Gittin]: ALL_TRACTATES["Gittin"],
    [MasechetBavli.Kiddushin]: ALL_TRACTATES["Kiddushin"],
    [MasechetBavli.BavaKamma]: ALL_TRACTATES["Bava Kamma"],
    [MasechetBavli.BavaMetzia]: ALL_TRACTATES["Bava Metzia"],
    [MasechetBavli.BavaBatra]: ALL_TRACTATES["Bava Batra"],
    [MasechetBavli.Sanhedrin]: ALL_TRACTATES["Sanhedrin"],
    [MasechetBavli.Makkot]: ALL_TRACTATES["Makkot"],
    [MasechetBavli.Shevuot]: ALL_TRACTATES["Shevuot"],
    [MasechetBavli.AvodahZarah]: ALL_TRACTATES["Avodah Zarah"],
    [MasechetBavli.Horayot]: ALL_TRACTATES["Horayot"],
    [MasechetBavli.Zevachim]: ALL_TRACTATES["Zevachim"],
    [MasechetBavli.Menachot]: ALL_TRACTATES["Menachot"],
    [MasechetBavli.Chullin]: ALL_TRACTATES["Chullin"],
    [MasechetBavli.Bechorot]: ALL_TRACTATES["Bechorot"],
    [MasechetBavli.Arachin]: ALL_TRACTATES["Arachin"],
    [MasechetBavli.Temurah]: ALL_TRACTATES["Temurah"],
    [MasechetBavli.Keritot]: ALL_TRACTATES["Keritot"],
    [MasechetBavli.Meilah]: ALL_TRACTATES["Meilah"],
    [MasechetBavli.Tamid]: ALL_TRACTATES["Tamid"],
    [MasechetBavli.Middot]: ALL_TRACTATES["Middot"],
    [MasechetBavli.Niddah]: ALL_TRACTATES["Niddah"],
};

export const BAVLI_NORMALIZED_MAP: Record<string, string> = Object.entries(BAVLI).reduce((acc, [key, value]) => {
    const normalizedKey = key.toLowerCase().replace(/[^a-z\s]/g, '');
    acc[normalizedKey] = value;
    return acc;
}, {} as Record<string, string>);


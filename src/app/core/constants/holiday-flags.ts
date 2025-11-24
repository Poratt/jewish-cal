export const HolidayFlags = { 
  EVENT_AS_BADGE: 0x10000000,     // Custom flag - Not a real Hebcal flag, used for custom logic */
  
  CHAG: 0x000001,                 /** Chag, yontiff, yom tov */
  LIGHT_CANDLES: 0x000002,        /** Light candles 18 minutes before sundown */
  YOM_TOV_ENDS: 0x000004,         /** End of holiday (end of Yom Tov)  */
  CHUL_ONLY: 0x000008,            /** Observed only in the Diaspora (chutz l'aretz)  */
  IL_ONLY: 0x000010,              /** Observed only in Israel */
  LIGHT_CANDLES_TZEIS: 0x000020,  /** Light candles in the evening at Tzeit time (3 small stars) */
  CHANUKAH_CANDLES: 0x000040,     /** Candle-lighting for Chanukah */
  ROSH_CHODESH: 0x000080,         /** Rosh Chodesh, beginning of a new Hebrew month */
  MINOR_FAST: 0x000100,           /** Minor fasts like Tzom Tammuz, Ta'anit Esther, ... */
  SPECIAL_SHABBAT: 0x000200,      /** Shabbat Shekalim, Zachor, ... */
  PARSHA_HASHAVUA: 0x000400,      /** Weekly sedrot on Saturdays */
  DAF_YOMI: 0x000800,             /** Daily page of Talmud (Bavli) */
  OMER_COUNT: 0x001000,           /** Days of the Omer */
  MODERN_HOLIDAY: 0x002000,       /** Yom HaShoah, Yom HaAtzma'ut, ... */
  MAJOR_FAST: 0x004000,           /** Yom Kippur and Tish'a B'Av */
  SHABBAT_MEVARCHIM: 0x008000,    /** On the Saturday before Rosh Chodesh */
  MOLAD: 0x010000,                /** Molad */
  USER_EVENT: 0x020000,           /** Yahrzeit or Hebrew Anniversary */
  HEBREW_DATE: 0x040000,          /** Daily Hebrew date ("11th of Sivan, 5780") */
  MINOR_HOLIDAY: 0x080000,        /** A holiday that's not major, modern, rosh chodesh, or a fast day */
  EREV: 0x100000,                 /** Evening before a major or minor holiday */
  CHOL_HAMOED: 0x200000,          /** Chol haMoed, intermediate days of Pesach or Sukkot */
  MISHNA_YOMI: 0x400000,          /** Mishna Yomi */
  YOM_KIPPUR_KATAN: 0x800000,     /** Yom Kippur Katan, minor day of atonement on the day preceeding each Rosh Chodesh */
  YERUSHALMI_YOMI: 0x1000000,     /** Daily page of Jerusalem Talmud (Yerushalmi) */
  NACH_YOMI: 0x2000000,           /** Nach Yomi */
  DAILY_LEARNING: 0x4000000,      /** Daily Learning */
  YIZKOR: 0x8000000,              /** Yizkor */
} as const;


export const flagToCategory = [
  [HolidayFlags.MAJOR_FAST, 'holiday', 'major', 'fast'],
  [HolidayFlags.CHANUKAH_CANDLES, 'holiday', 'major'],
  [HolidayFlags.HEBREW_DATE, 'hebdate'],
  [HolidayFlags.MINOR_FAST, 'holiday', 'fast'],
  [HolidayFlags.MINOR_HOLIDAY, 'holiday', 'minor'],
  [HolidayFlags.MODERN_HOLIDAY, 'holiday', 'modern'],
  [HolidayFlags.MOLAD, 'molad'],
  [HolidayFlags.OMER_COUNT, 'omer'],
  [HolidayFlags.PARSHA_HASHAVUA, 'parashat'], // backwards-compat
  [HolidayFlags.ROSH_CHODESH, 'roshchodesh'],
  [HolidayFlags.SHABBAT_MEVARCHIM, 'mevarchim'],
  [HolidayFlags.SPECIAL_SHABBAT, 'holiday', 'shabbat'],
  [HolidayFlags.USER_EVENT, 'user'],
  [HolidayFlags.YIZKOR, 'yizkor'],
] as const;
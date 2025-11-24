export enum ChofetzHaimHalacha {
	Psichah = "Psichah",                // פתיחה
	Hakdamah = "Hakdamah",              // הקדמה
	Asin = "Asin",                      // מצוות עשה
	Lavin = "Lavin",                    // מצוות לא תעשה
	HilchosLH = "HilchosLH",            // הלכות לשון הרע
	HilchosRechilus = "HilchosRechilus",// הלכות רכילות
	Beurim = "Beurim",                  // ביאורים (באר מים חיים)
    Tziyurim = "Tziyurim"               // ציורים והערות
}

export const CHOFETZ_HAIM_HALACHOT: Record<ChofetzHaimHalacha, string> = {
	[ChofetzHaimHalacha.Psichah]: "פתיחה",
	[ChofetzHaimHalacha.Hakdamah]: "הקדמה",
	[ChofetzHaimHalacha.Asin]: "מצוות עשה",
	[ChofetzHaimHalacha.Lavin]: "מצוות לא תעשה",
	[ChofetzHaimHalacha.HilchosLH]: "הלכות לשון הרע",
	[ChofetzHaimHalacha.HilchosRechilus]: "הלכות רכילות",
	[ChofetzHaimHalacha.Beurim]: "ביאורים (באר מים חיים)",
    [ChofetzHaimHalacha.Tziyurim]: "ציורים והערות"
};

export const CHOFETZ_HAIM_HALACHOT_NORMALIZED_MAP: Record<string, string> = Object.entries(CHOFETZ_HAIM_HALACHOT).reduce((acc, [key, value]) => {
  // Normalize the key: lowercase and remove special characters/spaces
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  acc[normalizedKey] = value;
  return acc;
}, {} as Record<string, string>);
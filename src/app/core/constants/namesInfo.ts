export enum HebrewMonths {
  Nisan = 1,
  Iyyar = 2,
  Sivan = 3,
  Tamuz = 4,
  Av = 5,
  Elul = 6,
  Tishrei = 7,
  Cheshvan = 8,
  Kislev = 9,
  Tevet = 10,
  Shvat = 11,
  AdarI = 12,
  AdarII = 13
}

export interface NameInfo {
  index: number;
  name: string;
  he: string;
  letter?: string;
  short?: string;
}

export const daysNames: NameInfo[] = [
  { index: 0, name: "Sunday", he: "ראשון", letter: 'א׳' },
  { index: 1, name: "Monday", he: "שני", letter: 'ב׳' },
  { index: 2, name: "Tuesday", he: "שלישי", letter: 'ג׳' },
  { index: 3, name: "Wednesday", he: "רביעי", letter: 'ד׳' },
  { index: 4, name: "Thursday", he: "חמישי", letter: 'ה׳' },
  { index: 5, name: "Friday", he: "שישי", letter: 'ו׳' },
  { index: 6, name: "Saturday", he: "שבת", letter: 'ש׳' }
];

export const monthsNames: NameInfo[] = [
  { index: 0, name: "January", short: "Jan", he: "ינואר" },
  { index: 1, name: "February", short: "Feb", he: "פברואר" },
  { index: 2, name: "March", short: "Mar", he: "מרץ" },
  { index: 3, name: "April", short: "Apr", he: "אפריל" },
  { index: 4, name: "May", short: "May", he: "מאי" },
  { index: 5, name: "June", short: "Jun", he: "יוני" },
  { index: 6, name: "July", short: "Jul", he: "יולי" },
  { index: 7, name: "August", short: "Aug", he: "אוגוסט" },
  { index: 8, name: "September", short: "Sep", he: "ספטמבר" },
  { index: 9, name: "October", short: "Oct", he: "אוקטובר" },
  { index: 10, name: "November", short: "Nov", he: "נובמבר" },
  { index: 11, name: "December", short: "Dec", he: "דצמבר" }
];


// Use this array to map Hebrew months to their names
export const hebrewMonthsNamesLeap: NameInfo[] = [
  { index: HebrewMonths.Nisan, name: "Nisan", he: "נִיסָן" },
  { index: HebrewMonths.Iyyar, name: "Iyyar", he: "אִיָיר" },
  { index: HebrewMonths.Sivan, name: "Sivan", he: "סִיוָן" },
  { index: HebrewMonths.Tamuz, name: "Tamuz", he: "תַּמּוּז" },
  { index: HebrewMonths.Av, name: "Av", he: "אָב" },
  { index: HebrewMonths.Elul, name: "Elul", he: "אֱלוּל" },
  { index: HebrewMonths.Tishrei, name: "Tishrei", he: "תִּשְׁרֵי" },
  { index: HebrewMonths.Cheshvan, name: "Cheshvan", he: "חֶשְׁוָן" },
  { index: HebrewMonths.Kislev, name: "Kislev", he: "כִּסְלֵו " },
  { index: HebrewMonths.Tevet, name: "Tevet", he: "טֵבֵת" },
  { index: HebrewMonths.Shvat, name: "Sh'vat", he: "שְׁבָט" },
  { index: HebrewMonths.AdarI, name: "Adar", he: "אַדָר א׳" },
  { index: HebrewMonths.AdarII, name: "Adar II", he: "אַדָר ב׳" }
];

// Use this array to map Hebrew months to their names
export const hebrewMonthsNamesNoLeap: NameInfo[] = [
  { index: HebrewMonths.Nisan, name: "Nisan", he: "נִיסָן" },
  { index: HebrewMonths.Iyyar, name: "Iyyar", he: "אִיָיר" },
  { index: HebrewMonths.Sivan, name: "Sivan", he: "סִיוָן" },
  { index: HebrewMonths.Tamuz, name: "Tamuz", he: "תַּמּוּז" },
  { index: HebrewMonths.Av, name: "Av", he: "אָב" },
  { index: HebrewMonths.Elul, name: "Elul", he: "אֱלוּל" },
  { index: HebrewMonths.Tishrei, name: "Tishrei", he: "תִּשְׁרֵי" },
  { index: HebrewMonths.Cheshvan, name: "Cheshvan", he: "חֶשְׁוָן" },
  { index: HebrewMonths.Kislev, name: "Kislev", he: "כִּסְלֵו " },
  { index: HebrewMonths.Tevet, name: "Tevet", he: "טֵבֵת" },
  { index: HebrewMonths.Shvat, name: "Sh'vat", he: "שְׁבָט" },
  { index: HebrewMonths.AdarI, name: "Adar", he: "אַדָר" },
];

export const HEBREW_LOCALE = {
  firstDayOfWeek: 0,
  dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
  dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"],
  dayNamesMin: ["א", "ב", "ג", "ד", "ה", "ו", "ש"],
  monthNames: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
  monthNamesShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יוני", "יולי", "אוג", "ספט", "אוק", "נוב", "דצמ"],
  today: 'היום',
  clear: 'נקה',
  weekHeader: 'שבוע'
};
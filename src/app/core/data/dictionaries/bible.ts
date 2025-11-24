import { Pipe, PipeTransform } from "@angular/core";

export enum BibleBook {
  Genesis = "Genesis",
  Exodus = "Exodus",
  Leviticus = "Leviticus",
  Numbers = "Numbers",
  Deuteronomy = "Deuteronomy",

  Joshua = "Joshua",
  Judges = "Judges",
  ISamuel = "I Samuel",
  IISamuel = "II Samuel",
  IKings = "I Kings",
  IIKings = "II Kings",
  Isaiah = "Isaiah",
  Jeremiah = "Jeremiah",
  Ezekiel = "Ezekiel",
  Hosea = "Hosea",
  Joel = "Joel",
  Amos = "Amos",
  Obadiah = "Obadiah",
  Jonah = "Jonah",
  Micah = "Micah",
  Nachum = "Nachum",
  Habakkuk = "Habakkuk",
  Zephaniah = "Zephaniah",
  Haggai = "Haggai",
  Zechariah = "Zechariah",
  Malachi = "Malachi",

  Psalms = "Psalms",
  Proverbs = "Proverbs",
  Job = "Job",
  SongOfSongs = "Song of Songs",
  Ruth = "Ruth",
  Lamentations = "Lamentations",
  Ecclesiastes = "Ecclesiastes",
  Esther = "Esther",
  Daniel = "Daniel",
  Ezra = "Ezra",
  Nehemiah = "Nehemiah",
  IChronicles = "I Chronicles",
  IIChronicles = "II Chronicles"
}

export const BIBLE: Record<BibleBook, string> = {
  [BibleBook.Genesis]: "בְּרֵאשִׁית",
  [BibleBook.Exodus]: "שְׁמוֹת",
  [BibleBook.Leviticus]: "וַיִּקְרָא",
  [BibleBook.Numbers]: "בְּמִדְבַּר",
  [BibleBook.Deuteronomy]: "דְּבָרִים",

  [BibleBook.Joshua]: "יְהוֹשֻׁעַ",
  [BibleBook.Judges]: "שׁוֹפְטִים",
  [BibleBook.ISamuel]: "שְׁמוּאֵל א",
  [BibleBook.IISamuel]: "שְׁמוּאֵל ב",
  [BibleBook.IKings]: "מְלָכִים א",
  [BibleBook.IIKings]: "מְלָכִים ב",
  [BibleBook.Isaiah]: "יְשַׁעְיָהוּ",
  [BibleBook.Jeremiah]: "יִרְמְיָהוּ",
  [BibleBook.Ezekiel]: "יְחֶזְקֵאל",
  [BibleBook.Hosea]: "הוֹשֵׁעַ",
  [BibleBook.Joel]: "יוֹאֵל",
  [BibleBook.Amos]: "עָמוֹס",
  [BibleBook.Obadiah]: "עוֹבַדְיָה",
  [BibleBook.Jonah]: "יוֹנָה",
  [BibleBook.Micah]: "מִיכָה",
  [BibleBook.Nachum]: "נַחוּם",
  [BibleBook.Habakkuk]: "חֲבַקּוּק",
  [BibleBook.Zephaniah]: "צְפַנְיָה",
  [BibleBook.Haggai]: "חַגַּי",
  [BibleBook.Zechariah]: "זְכַרְיָה",
  [BibleBook.Malachi]: "מַלְאָכִי",

  [BibleBook.Psalms]: "תְּהִלִּים",
  [BibleBook.Proverbs]: "מִשְׁלֵי",
  [BibleBook.Job]: "אִיּוֹב",
  [BibleBook.SongOfSongs]: "שִׁיר הַשִּׁירִים",
  [BibleBook.Ruth]: "רוּת",
  [BibleBook.Lamentations]: "אֵיכָה",
  [BibleBook.Ecclesiastes]: "קֹהֶלֶת",
  [BibleBook.Esther]: "אֶסְתֵּר",
  [BibleBook.Daniel]: "דָּנִיֵּאל",
  [BibleBook.Ezra]: "עֶזְרָא",
  [BibleBook.Nehemiah]: "נְחֶמְיָה",
  [BibleBook.IChronicles]: "דִּבְרֵי הַיָּמִים א",
  [BibleBook.IIChronicles]: "דִּבְרֵי הַיָּמִים ב"
};

// Create a normalized map for robust, case-insensitive translation
export const BIBLE_NORMALIZED_MAP: Record<string, string> = Object.entries(BIBLE).reduce((acc, [key, value]) => {
  // Normalize the key: lowercase and remove special characters/spaces
  // e.g., "I Samuel" -> "isamuel", "Song of Songs" -> "songofsongs"
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  acc[normalizedKey] = value;
  return acc;
}, {} as Record<string, string>);

export function translateBook(book: BibleBook): string {
  return BIBLE[book];
}

@Pipe({
  name: 'bookName',
  standalone: true
})
export class BookNamePipe implements PipeTransform {
  transform(value: BibleBook): string {
    return BIBLE[value] ?? value;
  }
}
import { Injectable } from '@angular/core';
import { HDate } from '@hebcal/core';
import {
  AhSYomiReading,
  arukhHaShulchanYomi,
  chofetzChaim,
  ChofetzChaimReading,
  DafPage,
  dafWeekly,
  DafYomi,
  dailyPsalms,
  dailyRambam1,
  dailyRambam3,
  kitzurShulchanAruch,
  KitzurShulchanAruchReading,
  MishnaYomiEvent,
  MishnaYomiIndex,
  NachYomiEvent,
  NachYomiIndex,
  perekYomi,
  pirkeiAvot,
  RambamReading,
  schottenstein,
  seferHaMitzvot,
  SeferHaMitzvotReading,
  shemiratHaLashon,
  ShemiratHaLashonReading,
  vilna,
  YerushalmiReading,
  yerushalmiYomi
} from '@hebcal/learning';

import { toGematriya, translate } from './hebcal-helpers';
import { PerekYomi } from '@hebcal/learning/perekYomiBase';
import { SEFER_HAMITZVOT, SeferHamitzvotEnum } from '../data/dictionaries/sefer-hamitzvot';

@Injectable({
  providedIn: 'root'
})
export class HebcalLearningService {

  public generateLearningForDay(fullDate: Date, hDate: HDate, isIsrael: boolean) {
    return {
      dafYomi: this.formatLearningValue({ key: 'dafYomi', value: new DafYomi(fullDate).render('he') }),
      mishnaYomi: this.formatLearningValue({ key: 'mishnaYomi', value: new MishnaYomiEvent(hDate, new MishnaYomiIndex().lookup(fullDate)).render('he') }),
      nachYomi: this.formatLearningValue({ key: 'nachYomi', value: new NachYomiEvent(hDate, new NachYomiIndex().lookup(fullDate)).render('he') }),
      chofetzChaim: this.formatLearningValue({ key: 'chofetzChaim', value: chofetzChaim(hDate) }),
      dailyRambam1: this.formatLearningValue({ key: 'dailyRambam1', value: dailyRambam1(hDate) }),
      shemiratHaLashon: this.formatLearningValue({ key: 'shemiratHaLashon', value: shemiratHaLashon(hDate) }),
      dailyPsalms: this.formatLearningValue({ key: 'dailyPsalms', value: dailyPsalms(hDate) }),
      dafWeekly: this.formatLearningValue({ key: 'dafWeekly', value: dafWeekly(hDate) }),
      perekYomi: this.formatLearningValue({ key: 'perekYomi', value: perekYomi(hDate) }),
      pirkeiAvot: this.formatLearningValue({ key: 'pirkeiAvot', value: pirkeiAvot(hDate, isIsrael) }),
      dailyRambam3: this.formatLearningValue({ key: 'dailyRambam3', value: dailyRambam3(hDate) }),
      arukhHaShulchanYomi: this.formatLearningValue({ key: 'arukhHaShulchanYomi', value: arukhHaShulchanYomi(hDate) }),
      seferHaMitzvot: this.formatLearningValue({ key: 'seferHaMitzvot', value: seferHaMitzvot(hDate) }),
      kitzurShulchanAruch: this.formatLearningValue({ key: 'kitzurShulchanAruch', value: kitzurShulchanAruch(hDate) }),
      yerushalmiYomiV: this.formatLearningValue({ key: 'yerushalmiYomiV', value: yerushalmiYomi(hDate, vilna) }),
      yerushalmiYomiS: this.formatLearningValue({ key: 'yerushalmiYomiS', value: yerushalmiYomi(hDate, schottenstein) }),
    };
  }

  public formatLearningValue(item: { key: string; value: any }): string {
    const { key, value } = item;
    if (!value) return '';
    if(key.toLowerCase().includes('rambam')) {
    }
    
    
    switch (key) {
      case 'dafYomi':
        const valueStr = value as string;
        const firstSpaceIndex = valueStr.indexOf(' ');
        if (firstSpaceIndex === -1) return translate(valueStr);
        const masechet = valueStr.substring(0, firstSpaceIndex);
        const daf = valueStr.substring(firstSpaceIndex + 1);
        return `${translate(masechet)}, ${daf}`;

      case 'nachYomi': return value as string;

      case 'mishnaYomi': return this.formatMishnaYomi(value as string);

      case 'dailyRambam1':
        const rambam = value as RambamReading;
        return rambam?.name && rambam.perek ? `${translate(rambam.name)}, פרק ${toGematriya(rambam.perek)}` : '';
      
      case 'dailyRambam3':
        const rambam3 = value as RambamReading[];
        return rambam3.map(r => `${translate(r.name)} פרק ${toGematriya(r.perek)}`).join('<br>');

      case 'dafWeekly':
        const dafWeeklyVal = value as DafPage;
        return dafWeeklyVal?.name && dafWeeklyVal.blatt ? `${translate(dafWeeklyVal.name)}, דף ${toGematriya(dafWeeklyVal.blatt)}` : '';

      case 'chofetzChaim':
        const cc = value as ChofetzChaimReading;
        return cc?.k && cc.b && cc.e ? `${translate(cc.k)}, ${this.formatRange(cc.b, cc.e)}` : '';

      case 'shemiratHaLashon':
        const shl = value as ShemiratHaLashonReading;
        if (!shl || !shl.k || shl.b === undefined || shl.e === undefined) return '';
        const translatedK = translate(shl.k);
        const formattedRange = this.formatShmiratHalashonRange(shl.b, shl.e);
        return `${translatedK}, ספר ${toGematriya(shl.bk)}, ${formattedRange}`;

      case 'dailyPsalms':
        return Array.isArray(value) && value.length > 0 ? value.map(n => toGematriya(n)).join(', ') : '';
      
      case 'perekYomi':
        const perek = value as PerekYomi;
        return perek?.k && perek.v ? `${translate(perek.k)}, פרק ${toGematriya(perek.v)}` : '';

      case 'pirkeiAvot':
        const avot = value as number[] | null;
        return avot && avot.length > 0 ? `פרקים ${avot.map(n => toGematriya(n)).join(', ')}` : '';

      case 'yerushalmiYomiV':
      case 'yerushalmiYomiS':
        const yerushalmi = value as YerushalmiReading;
        return yerushalmi?.name && yerushalmi.blatt ? `${translate(yerushalmi.name)}, דף ${toGematriya(yerushalmi.blatt)}` : '';

      case 'arukhHaShulchanYomi':
        const asy = value as AhSYomiReading;
        return asy?.k && asy.v ? `${translate(asy.k)}, ${this.formatArukhHaShulchan(asy.v)}` : '';

      case 'seferHaMitzvot':
        const sm = value as SeferHaMitzvotReading;
        if (!sm?.reading || typeof sm.reading !== 'string') return '';
  
        const mitzvahRegex = /[PN]\d+/g;
        const matches = sm.reading.match(mitzvahRegex) || [];
        const nonMitzvahText = sm.reading.replace(mitzvahRegex, '').replace(/, | /g, ' ').trim();

        if (matches.length === 0) {
            return `מצווה: ${sm.reading}`;
        }

        const translatedMitzvot = matches.map(code => {
            const translation = SEFER_HAMITZVOT[code as SeferHamitzvotEnum];
            if (!translation) return code;

            const type = code.startsWith('P') ? 'עשה' : 'לא תעשה';
            const number = code.substring(1);
            return `מצוות ${type} ${toGematriya(number)}: ${translation}`;
        }).join('<br>');
        
        let mitzvotResult = '';
        if (nonMitzvahText) {
          mitzvotResult += `${nonMitzvahText}<br>`;
        }
        mitzvotResult += translatedMitzvot;
        
        return mitzvotResult;

      case 'kitzurShulchanAruch':
        const ksa = value as KitzurShulchanAruchReading;
        if (!ksa || !ksa.b) return '';
        const start = this.formatSimanAndSeif(ksa.b);
        let ksaResult = `סימן ${start}`;
        if (ksa.e) {
            const end = this.formatSimanAndSeif(ksa.e);
            if (ksa.b.split(':')[0] === ksa.e.split(':')[0]) {
              ksaResult += ` - ${end.split(':')[1] || end}`;
            } else {
              ksaResult += ` - סימן ${end}`;
            }
        }
        return ksaResult;
        
      default: return JSON.stringify(item.value);
    }
  }

  private formatMishnaYomi(value: string): string {
    const splitRegex = /(\d)-([\u0590-\u05FF])/;
    const match = value.match(splitRegex);

    if (match) {
        const index = match.index! + 1;
        const part1 = value.substring(0, index);
        const part2 = value.substring(index + 1);
        return `${this.formatSingleMishnaYomi(part1)} - ${this.formatSingleMishnaYomi(part2)}`;
    } else {
        return this.formatSingleMishnaYomi(value);
    }
  }

  private formatSingleMishnaYomi(singleValue: string): string {
    const parts = singleValue.split(' ');
    if (parts.length < 2) return translate(singleValue);

    const verses = parts.pop()!;
    const masechet = parts.join(' ');
    
    return `${translate(masechet)}, ${this.formatMishnaRange(verses)}`;
  }

  private formatMishnaRange(range: string): string {
    const [chapter, verses] = range.split(':');
    if (!verses) {
        return `פרק ${toGematriya(chapter)}`;
    }
    
    const [startVerse, endVerse] = verses.split('-');
    let result = `פרק ${toGematriya(chapter)} משנה ${toGematriya(startVerse)}`;
    if (endVerse) {
        result += `-${toGematriya(endVerse)}`;
    }
    return result;
  }

  private formatSimanAndSeif(simanSeif: string): string {
    if (!simanSeif) return '';
    if (simanSeif.endsWith(':E')) {
      return `${toGematriya(simanSeif.split(':')[0])}:סוף`;
    }

    const parts = simanSeif.split(':');
    const siman = toGematriya(parts[0]);
    if (parts.length === 1) {
      return siman;
    }
    const seif = toGematriya(parts[1]);
    return `${siman}:${seif}`;
  }

  private formatShmiratHalashonValue(val: number | string): string {
    const strVal = String(val);
    const parts = strVal.split('.');
    const chapter = toGematriya(parts[0]);
    if (parts.length === 1) return `פרק ${chapter}`;
    const verse = toGematriya(parts[1]);
    return `פרק ${chapter} סעיף ${verse}`;
  }

  private formatShmiratHalashonRange(start: number | string, end: number | string): string {
    const startStr = this.formatShmiratHalashonValue(start);
    const endStr = this.formatShmiratHalashonValue(end);
    if (startStr === endStr) return startStr;
    const endStrWithoutChapter = endStr.replace(/פרק [^ ]+ /, '');
    return `${startStr} - ${endStrWithoutChapter}`;
  }

  private formatArukhHaShulchan(range: string): string {
    const [start, end] = range.split('-');
  
    const formatPart = (part: string): string => {
      const [siman, seif] = part.split('.');
      let formatted = `סימן ${toGematriya(siman)}`;
      if (seif) {
        formatted += ` סעיף ${toGematriya(seif)}`;
      }
      return formatted;
    };
  
    const startFormatted = formatPart(start);
    if (!end) {
      return startFormatted;
    }
  
    const startSimanRaw = start.split('.')[0];
    const endSimanRaw = end.split('.')[0];
    
    if (startSimanRaw === endSimanRaw) {
      const endSeifRaw = end.split('.')[1] || end;
      return `${startFormatted} - ${toGematriya(endSeifRaw)}`;
    } else {
      return `${startFormatted} - ${formatPart(end)}`;
    }
  }
  
  private formatRange(start: number | string, end: number | string | number[]): string {
    if (start === undefined || end === undefined) return '';
    const s = toGematriya(String(start));
    const e = toGematriya(String(end));
    return s === e ? s : `${s}-${e}`;
  }
}
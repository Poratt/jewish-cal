import { inject, Injectable } from '@angular/core';
import { HDate, HebrewCalendar, Location, MoladEvent, gematriya, CalOptions, Event, OmerEvent } from '@hebcal/core';
import { getLeyningOnDate } from '@hebcal/leyning';
import { HebcalZmanimService } from './hebcal-zmanim.service';
import { HebcalLearningService } from './hebcal-learning.service';
import { getHallelStatus, translate } from './hebcal-helpers';
import { City } from '../models/city';
import { ContentSettings } from '../models/content-settings';
import { CalEvent, DayObject } from '../models/day-object';
import { CITIES } from '../data/cities';
import { HolidayFlags } from '../constants/holiday-flags';

@Injectable({
  providedIn: 'root'
})
export class HebcalService {

  private zmanimService = inject(HebcalZmanimService);
  private learningService = inject(HebcalLearningService);
  private calendarEvents: CalEvent[] = [];
  private location!: Location;

  constructor() {
    const telAviv = CITIES.find(c => c.city === 'Tel Aviv');
    if (telAviv) this.setLocation(telAviv);
  }

  public setLocation(city: City): void {
    const il = city.country === 'Israel';
    const tzid = il ? 'Asia/Jerusalem' : (city.country === 'USA' ? 'America/New_York' : 'UTC');
    const lat = city.latitude || 32.0853;
    const lon = city.longitude || 34.7818;
    const elevation = city.elevation || 0;
    this.location = new Location(lat, lon, il, tzid, city.city, city.countryCode || city.country, elevation);
  }


  public generateEvents(year: number, contentSettings: ContentSettings): CalEvent[] {
    const calenderSettings: CalOptions = {
      year,
      isHebrewYear: false,
      location: this.location,
      il: this.location.getIsrael(),
      locale: 'he',
      hour12: false,
      sedrot: true,
      omer: contentSettings.showOmer,
      shabbatMevarchim: contentSettings.showMevarchim,
      molad: contentSettings.showMolad,
      yomKippurKatan: contentSettings.showYomKippurKatan,
      yizkor: contentSettings.showYizkor,
      noHolidays: !contentSettings.includeHolidays,
      noMinorFast: !contentSettings.includeMinorFasts,
      noRoshChodesh: !contentSettings.includeRoshChodesh,
      noModern: !contentSettings.includeModernHolidays,
      candlelighting: true,
      havdalahMins: 42,
      useElevation: true,
    };

    this.calendarEvents = HebrewCalendar.calendar(calenderSettings).map(ev => {
      if (ev.getFlags() & HolidayFlags.MOLAD) {
        return this.createMoladEventInfo(ev);
      }
      return this.createEventInfo(ev);
    });
    return this.calendarEvents;
  }

  private createEventInfo(ev: Event): CalEvent {
    const hdate = new HDate(ev.date);
    let date = hdate.greg();
    let hebName = ev.render('he');

    if (ev.getCategories().includes('havdalah')) {
      hebName = hebName.replace(/\s*\(\d+.*?\)/, '');
    }
    
    const eventInfo: CalEvent = {
      dateStr: date.toLocaleDateString(),
      hebDate: hdate.renderGematriya(),
      hebName,
      hebNoNikud: ev.render('he-x-NoNikud'),
      event: ev,
      emoji: !ev.render('he').includes('פֶּסַח') ? ev.getEmoji() : null,
      mask: ev.mask, flags: ev.getFlags(),
      categories: ev.getCategories(),
      desc: ev.getDesc(),
      url: ev.url() ?? '',
    };

    if (ev.getCategories().includes('omer')) {
      const omerEvent = ev as OmerEvent;
      eventInfo.omerEvent = omerEvent; 
    }
    return eventInfo
  }

  private createMoladEventInfo(ev: Event): CalEvent {
    const moladEvent = ev as MoladEvent;
    const molad = moladEvent.molad;
    const moladHDate = new HDate(1, molad.getMonth(), molad.getYear());
    const actualMoladDate = moladHDate.greg();
    actualMoladDate.setDate(actualMoladDate.getDate() - 1);
    return {
      dateStr: actualMoladDate.toLocaleDateString(),
      hebDate: new HDate(actualMoladDate).renderGematriya(),
      hebName: ev.render('he'),
      hebNoNikud: ev.render('he-x-NoNikud'),
      event: ev,
      emoji: null,
      mask: ev.mask,
      flags: ev.getFlags(),
      categories: ev.getCategories(),
      desc: ev.getDesc(),
    };
  }

  public createDayObject(fullDate: Date, contentSettings: ContentSettings): DayObject {
    const hDate = new HDate(fullDate);
    const events = this.calendarEvents.filter(ev => ev.dateStr === fullDate.toLocaleDateString());

    const dayObj: DayObject = {
      ge: {
        fullDate, day: fullDate.getDay(),
        date: fullDate.getDate(),
        month: fullDate.getMonth(),
        year: fullDate.getFullYear()
      },
      he: {
        fullDate: hDate.renderGematriya(false),
        day: hDate.getDay(),
        date: hDate.getDate(),
        month: translate(hDate.getMonthName()),
        year: hDate.getFullYear()
      },
      zmanim: this.zmanimService.getZmanim(fullDate, this.location),
      leyning: getLeyningOnDate(hDate, true) || undefined,
      hallel: getHallelStatus(hDate),
      learn: this.learningService.generateLearningForDay(fullDate, hDate, this.location.getIsrael()),
      events: this.processEventsForDay(events, hDate),
    };

    if (dayObj.events?.length === 0) delete dayObj.events;
    if (!dayObj.leyning) delete dayObj.leyning;
    if (!dayObj.hallel) delete dayObj.hallel;

    return dayObj;
  }

  private processEventsForDay(events: CalEvent[], hDate: HDate): CalEvent[] {
    const processedEvents = events.map(ev => ({ ...ev }));
    const erevRoshHashana = processedEvents.find(ev => ev.desc === 'Erev Rosh Hashana');
    if (erevRoshHashana) {
      const nextDayYear = gematriya(hDate.getFullYear() + 1).replace(/'/g, '״');
      erevRoshHashana.hebName = `עֶרֶב רֹאשׁ הַשָּׁנָה ${nextDayYear}`;
      erevRoshHashana.hebNoNikud = erevRoshHashana.hebName;
    }
    const roshHashana = processedEvents.find(ev => ev.desc.startsWith('Rosh Hashana'));
    if (roshHashana) {
      const dayOfMonth = hDate.getDate();
      if (dayOfMonth === 1) roshHashana.hebName = `רֹאשׁ הַשָּׁנָה א׳`;
      else if (dayOfMonth === 2) roshHashana.hebName = `רֹאשׁ הַשָּׁנָה ב׳`;
      roshHashana.hebNoNikud = roshHashana.hebName;
    }
    return processedEvents;
  }
}
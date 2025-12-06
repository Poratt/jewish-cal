import { Leyning, LeyningWeekday } from "@hebcal/leyning";
import { ZmanimModel } from "./zman";
import { DailyLearning, Molad, OmerEvent } from "@hebcal/core";

export interface CalEvent {
    dateStr: string;
    hebDate: string;
    hebName: string;
    hebNoNikud: string;
    event: any; 
    emoji: string | null;
    mask: number;
    flags: number;
    categories: string[];
    desc: string;
    omerEvent?: OmerEvent;
    url?: string;
}

export interface EventDetails {
  date: HebrewDate;
  desc: string;
  mask: number;
  parsha?: string[];
  il?: boolean;
  num?: number;
  eventTime?: string;
  eventTimeStr?: string;
  fmtTime?: string;
  location?: EventLocation;
}

export interface HebrewDate {
  yy: number;
  mm: number;
  dd: number;
  rd: number;
}

export interface EventLocation {
  locationName: string;
  latitude: number;
  longitude: number;
  elevation: number;
  timeZoneId: string;
  il: boolean;
  cc: string;
}

export interface DayObject {
  ge: {
    date: number;
    day: number;
    month: number;
    year: number;
    fullDate: Date;
  };
  he: {
    fullDate: string;
    day: number;
    date: number;
    month: string;
    year: number;
  };
  events?: CalEvent[];
  leyning?: Leyning | LeyningWeekday | null;
  hallel?: string;
  omer?: {
    day: number;
    heb: string;
  };
  molad?: Molad;
  zmanim?: ZmanimModel;
  learn?: DailyLearning;
}
import { DayObject } from "./day-object";

export interface PrintMonthData {
  gregorianHeader: string;
  hebrewHeader: string;
  hebrewYear: string;
  days: DayObject[];
  month: number;
  year: number;
}
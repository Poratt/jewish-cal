import { DailyLearningEnum } from "./learning";

export interface  HebKeyLabel<T>  {
  key: keyof T;
  hebName: string;
};


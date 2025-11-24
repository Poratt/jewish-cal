import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogNavigationService {

  public nextDaySignal = signal(0);
  public prevDaySignal = signal(0);
  
  public triggerNextDay(): void {
    this.nextDaySignal.update(value => value + 1);
  }
  
  public triggerPrevDay(): void {
    this.prevDaySignal.update(value => value + 1);
  }
}

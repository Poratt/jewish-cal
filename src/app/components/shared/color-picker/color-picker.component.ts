import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ColorPickerModule } from 'primeng/colorpicker';


@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderModule, ColorPickerModule],
  template: `
  <div class="color-picker-container">
  <div class="color-input-wrapper">
    <label class="color-input-label" for="customColor">
      <input id="customColor" type="color" [(ngModel)]="internalColor" (input)="colorChanged()" class="color-input-hidden">
      <div class="color-input-display" 
        [style.background-color]="internalColor()">
        <i class="pi pi-palette"></i>
      </div>
    </label>
  </div>
</div>
`,
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {

  value = input.required<string>();
  valueChange = output<string>();
  internalColor = signal('#000000');   // Internal color state

  constructor() {
    effect(() => {
      const newValue = this.value();
      if (newValue !== this.internalColor()) {
        this.internalColor.set(newValue);
      }
    });
  }

  colorChanged() {
    this.valueChange.emit(this.internalColor());
  }


}
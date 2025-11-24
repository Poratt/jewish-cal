import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ColorPickerModule } from 'primeng/colorpicker';


@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderModule, ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  /* ---------- INPUTS ---------- */
  value = input.required<string>();          // Color value from parent
  size = input<number>(32);                  // Default size
  strokeWidth = input<number>(1);            // Default stroke width

  /* ---------- OUTPUTS ---------- */
  valueChange = output<string>();

  /* ---------- INTERNAL SIGNALS ---------- */
  internalColor = signal('#000000');   // Internal color state

  presetColors = signal([
    '#ef4444', '#f87171', '#a78bfa', '#3b82f6',
    '#06b6d4', '#10b981', '#facc15', '#fb923c',
    '#a16207', '#6b7280'
  ]);

  constructor() {
    // Receive values from parent → update internal signals
    effect(() => this.internalColor.set(this.value()));

    // When internal signal changes → emit to parent
    effect(() => this.valueChange.emit(this.internalColor()));
  }

  /* ---------- METHODS ---------- */
  
  // Pick color from preset palette
  pickColor(hex: string) {
    this.internalColor.set(hex);
  }

  // Color changed via input type="color"
  colorChanged() {
    this.valueChange.emit(this.internalColor());
  }

  // Reset to default color
  reset() {
    this.internalColor.set('#000000');
  }
}
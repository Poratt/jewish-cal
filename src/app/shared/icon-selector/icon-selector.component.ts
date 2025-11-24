

import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { IconCategory, PRIME_ICONS } from './prime-icons.data';

@Component({
  selector: 'app-icon-selector',
  standalone: true,
  imports: [CommonModule, MatTabsModule, TooltipModule],
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconSelectorComponent),
      multi: true
    }
  ]
})
export class IconSelectorComponent implements ControlValueAccessor {
  @Input() disabled = false;
  
  categories: IconCategory[] = PRIME_ICONS;
  value = signal<string>('');
  
  // ControlValueAccessor callbacks
  private onChange = (value: string) => {};
  private onTouched = () => {};

  selectIcon(icon: string): void {
    if (this.disabled) return;
    this.value.set(icon);
    this.onChange(icon);
    this.onTouched();
  }

  // --- ControlValueAccessor Implementation ---
  writeValue(val: string): void {
    this.value.set(val || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
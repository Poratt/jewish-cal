import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'parenthesesStyle',
	standalone: true
})
export class ParenthesesStylePipe implements PipeTransform {
	transform(value: string): string {
		if (!value) return value;

		// Replace text inside parentheses with styled version
		return value.replace(/\(([^)]+)\)/g, '<br><span class="parentheses-style">($1)</span>');
	}
}
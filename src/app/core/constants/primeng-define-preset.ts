import Aura from '@primeng/themes/aura';
import Nora from '@primeng/themes/nora';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';


export const MyCustomPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '--primary-50',
			100: '--primary-100',
			200: '--primary-200',
			300: '--primary-300',
			400: '--primary-400',
			500: '--primary-500',
			600: '--primary-600',
			700: '--primary-700',
			800: '--primary-800',
			900: '--primary-900',
		},
		
		colorScheme: {
			light: {
				primary: {
					color: '{primary.300}',
					hoverColor: '{primary.400}',
					activeColor: '{primary.500}',
				},
			},
			dark: {
				primary: {
					color: '{primary.200}',
					hoverColor: '{primary.300}',
					activeColor: '{primary.400}',
				},
			},
		},
	},
});
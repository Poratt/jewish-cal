import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { definePreset } from '@primeng/themes';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import localeHe from '@angular/common/locales/he';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeHe);



const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'hsl(208 100% 95% / 1)',
      100: ' hsl(208 100% 85% / 1)',
      200: ' hsl(208 100% 75% / 1)',
      300: ' hsl(208 100% 65% / 1)',
      400: ' hsl(208 100% 55% / 1)',
      500: ' hsl(208 100% 45% / 1)',
      600: ' hsl(208 100% 35% / 1)',
      700: ' hsl(208 100% 25% / 1)',
      800: ' hsl(208 100% 15% / 1)',
      900: ' hsl(208 100% 5% / 1)',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),

    
    providePrimeNG({
      theme: {
        preset: MyCustomPreset,
        options: {
          darkModeSelector: false || 'none',
        },
      },

    }),

    MessageService,
    DialogService,
  ],
};

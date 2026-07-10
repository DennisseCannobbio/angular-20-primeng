import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { BrandPreset } from '../theme/brand-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // Requerido por componentes de PrimeNG con animaciones (p. ej. p-message).
    // Sin esto se lanza NG05105 (@messageAnimation) y aborta el render.
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: BrandPreset,
        options: {
          // Prefijo con el que se generan las variables CSS (--p-...).
          prefix: 'p',
          // Nombre de la clase que activa el modo oscuro. Con 'system' seguiría
          // la preferencia del SO; usa un selector para controlarlo tú:
          darkModeSelector: '.app-dark',
          // Capa CSS para que tus estilos ganen a los de PrimeNG sin !important.
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, primeng',
          },
        },
      },
    }),
  ],
};

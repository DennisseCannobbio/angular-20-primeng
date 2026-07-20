import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { BrandPreset } from '../theme/brand-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // Requerido por p-fileUpload, que inyecta HttpClient para subir archivos
    // (aunque el componente app-file no lo use, PrimeNG lo pide en su constructor).
    provideHttpClient(),
    // Requerido por componentes de PrimeNG con animaciones (p. ej. p-message).
    // Sin esto se lanza NG05105 (@messageAnimation) y aborta el render.
    provideAnimationsAsync(),
    providePrimeNG({
      // Traducción en español para componentes con textos propios (nombres de
      // meses/días del p-datepicker, textos de vacío, etc.). Aplica global.
      translation: {
        firstDayOfWeek: 1, // la semana empieza en lunes
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        monthNamesShort: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'dd/mm/yy',
        weekHeader: 'Sm',
      },
      theme: {
        preset: BrandPreset,
        options: {
          // Prefijo con el que se generan las variables CSS (--p-...).
          prefix: 'p',
          // El preset sólo define modo claro. Mantenemos este selector (en vez
          // de quitarlo) porque el default de PrimeNG es 'system': sin él, el
          // SO en oscuro activaría un dark a medias. Como nada aplica la clase
          // .app-dark, la app queda siempre en claro.
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

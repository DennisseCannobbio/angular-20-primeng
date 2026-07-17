import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export type SpinnerSize = 'small' | 'normal' | 'large';

@Component({
  selector: 'app-spinner',
  imports: [ProgressSpinnerModule, CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  /**
   * Tamaño predefinido del spinner.
   * 'small' = 1rem, 'normal' = 2rem, 'large' = 4rem.
   */
  @Input() size: SpinnerSize = 'normal';

  /** 
   * Clase CSS personalizada para el contenedor del spinner.
   */
  @Input() styleClass: string = '';

  /** 
   * Estilos en línea para el contenedor del spinner.
   */
  @Input() style?: any;

  /**
   * Calcula los estilos combinando el tamaño semántico con estilos custom.
   */
  get computedStyle(): any {
    const dimensions =
      this.size === 'small' ? { width: '1.5rem', height: '1.5rem' } :
      this.size === 'large' ? { width: '4rem', height: '4rem' } :
      { width: '2.5rem', height: '2.5rem' };

    if (!this.style) return dimensions;
    if (typeof this.style === 'object') return { ...dimensions, ...this.style };
    
    // Si pasaron un string en style, lo ideal es parsearlo, pero
    // por simplicidad Angular suele recomendar pasar un objeto a [ngStyle].
    return dimensions;
  }

  /** 
   * Ancho del trazo (stroke) del círculo. Por defecto en PrimeNG es '2'.
   */
  @Input() strokeWidth: string = '2';

  /** 
   * Color de fondo (relleno) del círculo. Por defecto es transparente ('none').
   */
  @Input() fill: string = 'none';

  /** 
   * Duración de la animación de rotación. Por defecto en PrimeNG es '2s'.
   */
  @Input() animationDuration: string = '2s';

  /** 
   * Etiqueta ARIA para accesibilidad.
   */
  @Input() ariaLabel: string = 'cargando';

  /** 
   * Texto visual opcional para mostrar junto al spinner.
   */
  @Input() label?: string;

  /**
   * Posición del texto visual respecto al spinner ('bottom' por defecto).
   */
  @Input() labelPos: 'bottom' | 'right' = 'bottom';
}

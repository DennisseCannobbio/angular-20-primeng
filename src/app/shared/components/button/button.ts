import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

/** Tipos de severidad para el botón. */
export type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'danger';

/** Variantes de estilo principales para el botón. */
export type ButtonVariant = 'outlined' | 'text' | 'link';

/** Tamaños disponibles. */
export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  /** Texto del botón. Si no se provee y hay icono, será un botón de solo icono. */
  @Input() label?: string;

  /** Nombre del icono (Material Symbols, ej. 'check'). */
  @Input() icon?: string;

  /**
   * Alias de `icon` para usar dentro del <ng-template #icon> del template:
   * ahí la referencia #icon eclipsa al @Input() y `icon` sería el TemplateRef.
   */
  get iconName(): string | undefined {
    return this.icon;
  }

  /** Posición del icono respecto al texto. */
  @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';

  /** Valor de un badge para mostrar en el botón. */
  @Input() badge?: string;

  /** Severidad (color) del badge. */
  @Input() badgeSeverity?: ButtonSeverity;

  /** Severidad visual del botón. */
  @Input() severity?: ButtonSeverity;

  /** Variante visual principal del botón. */
  @Input() variant?: ButtonVariant;

  /** Si el botón debe mostrar sombra y parecer elevado. */
  @Input() raised: boolean = false;

  /** Si el botón debe tener bordes totalmente redondeados. */
  @Input() rounded: boolean = false;

  /** Tamaño del botón. Por defecto es normal. */
  @Input() size?: ButtonSize;

  /** Si el botón ocupa el 100% del ancho de su contenedor. */
  @Input() fluid: boolean = false;

  /** Deshabilita la interacción con el botón. */
  @Input() disabled: boolean = false;

  /** Muestra un indicador de carga y deshabilita el botón. */
  @Input() loading: boolean = false;

  /** Icono personalizado para cuando está cargando (Material Symbols). */
  @Input() loadingIcon?: string;

  /**
   * Icono a mostrar mientras carga. Igual que `iconName`, se lee con otro
   * nombre porque la referencia #loadingicon del template eclipsa al @Input().
   * Por defecto 'progress_activity', el mismo spinner que usa app-select.
   */
  get loadingIconName(): string {
    return this.loadingIcon ?? 'progress_activity';
  }

  /** Tipo del botón nativo. */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Evento emitido al hacer click en el botón (si no está deshabilitado o cargando). */
  @Output() onClick = new EventEmitter<MouseEvent>();

  /** Manejador interno para el evento click de p-button. */
  handleClick(event: MouseEvent) {
    this.onClick.emit(event);
  }
}

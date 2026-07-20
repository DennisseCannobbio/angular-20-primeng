import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { Message, MessageSeverity, MessageVariant } from '../message/message';

/** Tamaño del datepicker (mapea a pSize de PrimeNG). */
export type DateSize = 'small' | 'large';

/** Variante visual del datepicker (mapea a variant de PrimeNG). */
export type DateVariant = 'outlined' | 'filled';

/**
 * Modo de selección:
 * - 'single'   → una sola fecha (valor: Date).
 * - 'range'    → rango desde/hasta (valor: [Date, Date]).
 * - 'multiple' → varias fechas sueltas (valor: Date[]).
 */
export type DateSelectionMode = 'single' | 'range' | 'multiple';

/** Cómo se muestra el calendario. */
export type DateDisplay = 'popup' | 'inline';

/** Vista inicial del calendario. */
export type DateView = 'date' | 'month' | 'year';

@Component({
  selector: 'app-date',
  imports: [DatePickerModule, FormsModule, Message],
  templateUrl: './date.html',
  styleUrl: './date.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true,
    },
  ],
})
export class DatePicker implements ControlValueAccessor {
  /** Etiqueta (label) que se muestra arriba del selector de fecha. */
  @Input() label = '';

  /** Indica si el campo es obligatorio. */
  @Input() required: boolean = false;

  /** Tamaño del campo: 'small' | 'large' (por defecto, tamaño base). */
  @Input() size?: DateSize;

  /** Variante visual: 'outlined' (default) | 'filled'. */
  @Input() variant: DateVariant = 'outlined';

  /** Si es true, el campo ocupa todo el ancho de su contenedor. */
  @Input() fluid: boolean = false;

  /** Estado de error: bordes rojos y se muestra el errorMessage. */
  @Input() isInvalid: boolean = false;

  /** Si es true, el campo se deshabilita y no permite interacción. */
  @Input() isDisabled: boolean = false;

  /** Deshabilitado por el formulario reactivo (setDisabledState). */
  disabledByForm: boolean = false;

  /** El control está deshabilitado si lo indica el @Input() o el formulario. */
  get disabled(): boolean {
    return this.isDisabled || this.disabledByForm;
  }

  /** Modo de selección: 'single' (default) | 'range' | 'multiple'. */
  @Input() selectionMode: DateSelectionMode = 'single';

  /** Cómo se muestra el calendario: 'popup' (default) | 'inline'. */
  @Input() display: DateDisplay = 'popup';

  /** Vista inicial: 'date' (default) | 'month' | 'year'. */
  @Input() view: DateView = 'date';

  /** Formato de fecha del input (sintaxis de PrimeNG, ej. 'dd/mm/yy'). */
  @Input() dateFormat: string = 'dd/mm/yy';

  /** Texto de placeholder cuando no hay fecha seleccionada. */
  @Input() placeholder: string = 'dd/mm/aaaa';

  /** Muestra un ícono que abre el panel al pulsarlo. */
  @Input() showIcon: boolean = true;

  /**
   * Nombre del ícono de Material Symbols que se dibuja dentro del input
   * (ej. 'calendar_month' para fecha, 'schedule' para un picker de hora).
   */
  @Input() icon: string = 'calendar_month';

  /** Muestra el botón "Hoy" y "Limpiar" en el pie del panel. */
  @Input() showButtonBar: boolean = false;

  /** Muestra el número de semana a la izquierda del calendario. */
  @Input() showWeek: boolean = false;

  /** Incluye selección de hora además de la fecha. */
  @Input() showTime: boolean = false;

  /** Solo selección de hora (sin calendario). Requiere showTime. */
  @Input() timeOnly: boolean = false;

  /** Formato de la hora: 24 (default) o 12 horas. */
  @Input() hourFormat: '12' | '24' = '24';

  /** Cantidad de meses visibles a la vez (útil para rangos). */
  @Input() numberOfMonths: number = 1;

  /** Fecha mínima seleccionable. */
  @Input() minDate?: Date;

  /** Fecha máxima seleccionable. */
  @Input() maxDate?: Date;

  /** Fechas puntuales deshabilitadas dentro del rango permitido. */
  @Input() disabledDates: Date[] = [];

  /** Días de la semana deshabilitados (0 = domingo … 6 = sábado). */
  @Input() disabledDays: number[] = [];

  /** Permite escribir la fecha a mano en el input además de elegirla. */
  @Input() readonlyInput: boolean = false;

  /** Elemento base donde se dibuja el panel (por defecto 'body' para evitar recortes). */
  @Input() appendTo: string = 'body';

  /**
   * Valor actual. Estado interno enlazado con el ControlValueAccessor: lo
   * escribe el formulario (writeValue) y lo emite el usuario al elegir una
   * fecha (onModelChange). Su forma depende de selectionMode:
   * Date | (Date | null)[] según 'single' | 'range' | 'multiple'.
   */
  value: any;

  /** Callbacks registrados por Angular Forms. */
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  /** Angular Forms → escribe el valor en el control. */
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm = isDisabled;
  }

  /** El usuario cambió la fecha: propaga el valor al formulario. */
  onModelChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  /** Mensaje de error (tiene prioridad y se muestra cuando el campo es inválido). */
  @Input() errorMessage: string = '';

  /** Mensaje informativo/hint (no de error) que acompaña al campo. */
  @Input() message: string = '';

  /** Severidad del mensaje informativo. */
  @Input() messageSeverity: MessageSeverity = 'info';

  /** Variante visual del mensaje. */
  @Input() messageVariant: MessageVariant = 'simple';

  /** Ícono Material Symbols del mensaje (nombre, ej: 'info'). */
  @Input() materialIcon: string = '';

  /** Texto final a mostrar: el error tiene prioridad sobre el mensaje informativo. */
  get displayMessage(): string {
    return this.isInvalid && this.errorMessage ? this.errorMessage : this.message;
  }

  /** Severidad efectiva: 'error' si está inválido, si no la configurada. */
  get displaySeverity(): MessageSeverity {
    return this.isInvalid && this.errorMessage ? 'error' : this.messageSeverity;
  }

  get isMessageVisible(): boolean {
    return !!this.displayMessage;
  }
}

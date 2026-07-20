import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Message, MessageSeverity, MessageVariant } from '../message/message';

/** Orientación del grupo de opciones. */
export type RadioButtonLayout = 'vertical' | 'horizontal';

/** Tamaño del radio (mapea a size de PrimeNG). */
export type RadioButtonSize = 'small' | 'large';

/**
 * Opción del grupo de radios.
 *
 * `label` y `value` son obligatorios. Los campos `icon`, `title` y `subtitle`
 * son opcionales y solo se usan cuando el grupo está en modo tarjeta (`card`):
 * - `title`  → título de la tarjeta (si falta, se usa `label`).
 * - `subtitle` → texto secundario debajo del título.
 * - `icon` → nombre de un ícono de Material Symbols (ej: 'campaign').
 */
export interface RadioButtonOption {
  /** Etiqueta visible (modo simple) y respaldo del título en modo tarjeta. */
  label: string;
  /** Valor que toma el grupo cuando se selecciona esta opción. */
  value: any;
  /** Título de la tarjeta (modo card). Si falta, se usa `label`. */
  title?: string;
  /** Subtítulo/descripción de la tarjeta (modo card). */
  subtitle?: string;
  /** Ícono Material Symbols de la tarjeta (modo card). */
  icon?: string;
  /** Deshabilita solo esta opción. */
  disabled?: boolean;
}

@Component({
  selector: 'app-radio-button',
  imports: [RadioButtonModule, FormsModule, Message],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButton),
      multi: true,
    },
  ],
})
export class RadioButton implements ControlValueAccessor {
  /** Etiqueta (label) que se muestra arriba del grupo de opciones. */
  @Input() label = '';

  /** Indica si el campo es obligatorio. */
  @Input() required: boolean = false;

  /** Opciones del grupo de radios. */
  @Input() options: RadioButtonOption[] = [];

  /**
   * Si es true, cada opción se renderiza como una tarjeta con ícono, título y
   * subtítulo (usando los campos icon/title/subtitle de la opción). Por defecto
   * es false → radios clásicos con label al lado.
   */
  @Input() card: boolean = false;

  /** Orientación del grupo: 'vertical' (default) | 'horizontal'. */
  @Input() layout: RadioButtonLayout = 'vertical';

  /** Tamaño del radio: 'small' | 'large' (por defecto, tamaño base). */
  @Input() size?: RadioButtonSize;

  /** Estado de error: si es true, el grupo se pinta como inválido y se muestra el errorMessage. */
  @Input() isInvalid: boolean = false;

  /** Si es true, todo el grupo se deshabilita y no permite interacción. */
  @Input() isDisabled: boolean = false;

  /** Mensaje de error (tiene prioridad y se muestra cuando el grupo es inválido). */
  @Input() errorMessage: string = '';

  /** Mensaje informativo/hint (no de error) que acompaña al grupo. */
  @Input() message: string = '';

  /** Severidad del mensaje informativo. */
  @Input() messageSeverity: MessageSeverity = 'info';

  /** Variante visual del mensaje. */
  @Input() messageVariant: MessageVariant = 'simple';

  /** Ícono Material Symbols del mensaje (nombre, ej: 'info'). */
  @Input() materialIcon: string = '';

  /**
   * Valor actual seleccionado. Es el estado interno enlazado con el
   * ControlValueAccessor: lo escribe el formulario (writeValue) y lo emite
   * el usuario al elegir una opción (onModelChange).
   */
  value: any;

  /** Deshabilitado por el formulario reactivo (setDisabledState). */
  disabledByForm: boolean = false;

  /** El control está deshabilitado si lo indica el @Input() o el formulario. */
  get disabled(): boolean {
    return this.isDisabled || this.disabledByForm;
  }

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

  /** El usuario cambió la selección: propaga el valor al formulario. */
  onModelChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  /** Una opción está deshabilitada si lo pide el grupo entero o la propia opción. */
  isOptionDisabled(option: RadioButtonOption): boolean {
    return this.disabled || !!option.disabled;
  }

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

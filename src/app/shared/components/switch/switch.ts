import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Message, MessageSeverity, MessageVariant } from '../message/message';

/** Tamaño del switch (mapea a size de PrimeNG). */
export type SwitchSize = 'small' | 'large';

/** Posición del label respecto al control. */
export type SwitchLabelPosition = 'side' | 'top';

@Component({
  selector: 'app-switch',
  imports: [ToggleSwitchModule, FormsModule, Message],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
})
export class Switch implements ControlValueAccessor {
  /** Etiqueta (label) que acompaña al switch. */
  @Input() label = '';

  /** Posición del label: 'side' (a la derecha, default) | 'top' (arriba). */
  @Input() labelPosition: SwitchLabelPosition = 'side';

  /** Indica si el campo es obligatorio. */
  @Input() required: boolean = false;

  /** Tamaño del switch: 'small' | 'large' (por defecto, tamaño base). */
  @Input() size?: SwitchSize;

  /** Estado de error: si es true, el control se pinta como inválido y se muestra el errorMessage. */
  @Input() isInvalid: boolean = false;

  /** Si es true, el switch se deshabilita y no permite interacción. */
  @Input() isDisabled: boolean = false;

  /** Si es true, el switch se muestra pero no permite cambiar su valor. */
  @Input() readonly: boolean = false;

  /** Valor cuando el switch está activado (por defecto true). */
  @Input() trueValue: any = true;

  /** Valor cuando el switch está desactivado (por defecto false). */
  @Input() falseValue: any = false;

  /** Mensaje de error (tiene prioridad y se muestra cuando el switch es inválido). */
  @Input() errorMessage: string = '';

  /** Mensaje informativo/hint (no de error) que acompaña al switch. */
  @Input() message: string = '';

  /** Severidad del mensaje informativo. */
  @Input() messageSeverity: MessageSeverity = 'info';

  /** Variante visual del mensaje. */
  @Input() messageVariant: MessageVariant = 'simple';

  /** Ícono Material Symbols del mensaje (nombre, ej: 'info'). */
  @Input() materialIcon: string = '';

  /**
   * Valor actual del switch. Es el estado interno enlazado con el
   * ControlValueAccessor: lo escribe el formulario (writeValue) y lo emite
   * el usuario al alternar el control (onModelChange).
   */
  value: any = this.falseValue;

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

  /** El usuario alternó el switch: propaga el valor al formulario. */
  onModelChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
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

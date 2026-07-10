import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Message, MessageSeverity, MessageVariant } from '../message/message';

@Component({
  selector: 'app-input-text',
  imports: [InputTextModule, Message],
  templateUrl: './input-text.html',
  styleUrl: './input-text.scss',
})
export class InputText {
  /** Etiqueta (label) que se muestra arriba del input. */
  @Input() label = '';

  /** Indica si el campo es obligatorio. */
  @Input() required: boolean = false;

  /** Estado de error: si es true, los bordes se pintan de rojo y se muestra el errorMessage (si existe). */
  @Input() isInvalid: boolean = false;

  /** Si es true, el input se deshabilita y no permite interacción. */
  @Input() isDisabled: boolean = false;

  /** Texto de placeholder a mostrar cuando el input está vacío. */
  @Input() placeholder: string = '';

  /** Mensaje de error (tiene prioridad y se muestra cuando el input es inválido). */
  @Input() errorMessage: string = '';

  /** Mensaje informativo/hint (no de error) que acompaña al input. */
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

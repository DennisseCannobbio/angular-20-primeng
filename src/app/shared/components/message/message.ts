import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';

export type MessageSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'secondary'
  | 'contrast';

export type MessageVariant = 'outlined' | 'simple' | 'text';

export type MessageSize = 'small' | 'large';

@Component({
  selector: 'app-message',
  imports: [MessageModule],
  templateUrl: './message.html',
  styleUrl: './message.scss',
})
export class Message {
  @Input() severity: MessageSeverity = 'info';
  @Input() variant?: MessageVariant;
  @Input() size?: MessageSize;

  /**
   * Nombre de un ícono de Material Symbols (ej: 'info', 'error').
   * Se renderiza en el slot de ícono del p-message.
   */
  @Input() materialIcon?: string;

  @Input() text?: string;
  @Input() closable = false;
  @Input() life?: number;
}

import { Component } from '@angular/core';
import { Message } from '../../../shared/components/message/message';

@Component({
  selector: 'app-message-showcase',
  imports: [Message],
  templateUrl: './message-showcase.html',
  styleUrl: './message-showcase.scss',
})
export class MessageShowcase {
  // Mensajes por severidad (app-message). Cada uno con su ícono de Material
  // Symbols y el texto de ejemplo.
  readonly messages = [
    { severity: 'success', materialIcon: 'check_circle', text: 'Operación realizada con éxito.' },
    { severity: 'info', materialIcon: 'info', text: 'Este es un mensaje informativo.' },
    { severity: 'warn', materialIcon: 'warning', text: 'Ten cuidado con esta acción.' },
    { severity: 'error', materialIcon: 'error', text: 'Ocurrió un error al procesar.' },
  ] as const;
}

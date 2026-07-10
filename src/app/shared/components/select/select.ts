import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Message, MessageSeverity, MessageVariant } from '../message/message';

/** Tamaño del select (mapea a pSize de PrimeNG). */
export type SelectSize = 'small' | 'large';

/** Variante visual del select (mapea a variant de PrimeNG). */
export type SelectVariant = 'outlined' | 'filled';

@Component({
  selector: 'app-select',
  imports: [SelectModule, FormsModule, Message],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  /** Etiqueta (label) que se muestra arriba del selector. */
  @Input() label = '';

  /** Indica si el campo es obligatorio. */
  @Input() required: boolean = false;

  /** Tamaño del select: 'small' | 'large' (por defecto, tamaño base). */
  @Input() size?: SelectSize;

  /** Variante visual: 'outlined' (default) | 'filled'. */
  @Input() variant: SelectVariant = 'outlined';

  /** Si es true, el select ocupa todo el ancho de su contenedor. */
  @Input() fluid: boolean = false;

  /** Muestra un spinner de carga (ej. mientras llegan datos del backend). */
  @Input() loading: boolean = false;

  /** Estado de error: si es true, los bordes se pintan de rojo y se muestra el errorMessage. */
  @Input() isInvalid: boolean = false;

  /** Si es true, el selector se deshabilita y no permite interacción. */
  @Input() isDisabled: boolean = false;

  /** Arreglo de opciones a mostrar en el menú desplegable. */
  @Input() options: any[] = [];

  /** Propiedad del objeto de la opción a usar como etiqueta visible. */
  @Input() optionLabel: string = 'label';

  /** Propiedad del objeto de la opción a usar como valor seleccionado. */
  @Input() optionValue: string = 'value';

  /** Texto de placeholder a mostrar cuando no hay ninguna opción seleccionada. */
  @Input() placeholder: string = 'Selecciona una opción';

  /** Habilita la barra de búsqueda dentro del menú para filtrar opciones. */
  @Input() filter: boolean = true;

  /** Propiedades por las cuales filtrar los datos (por defecto coincide con optionLabel). */
  @Input() filterBy: string = 'label';

  /** Mensaje a mostrar cuando la lista de opciones está vacía. */
  @Input() emptyMessage: string = 'No se encontraron opciones';

  /** Mensaje a mostrar cuando el filtro no devuelve ningún resultado. */
  @Input() emptyFilterMessage: string = 'No se encontraron resultados';

  /** Muestra un ícono de "X" para limpiar la selección actual. */
  @Input() showClear: boolean = false;

  /** Muestra una palomita (✓) al lado de la opción seleccionada. */
  @Input() checkmark: boolean = false;

  /** Habilita el virtual scrolling para listas masivas (mejora el rendimiento). */
  @Input() virtualScroll: boolean = true;

  /** Tamaño en píxeles de cada elemento del menú (necesario para el virtual scroll). */
  @Input() virtualScrollItemSize: number = 38;

  /** Altura máxima del menú desplegable antes de mostrar barra de desplazamiento. */
  @Input() scrollHeight: string = '200px';

  /** Elemento base donde se dibuja el menú (por defecto al 'body' para evitar recortes). */
  @Input() appendTo: string = 'body';

  /** Valor actual seleccionado (doble binding interno con ngModel). */
  @Input() value: any;

  /** Mensaje de error (tiene prioridad y se muestra cuando el select es inválido). */
  @Input() errorMessage: string = '';

  /** Mensaje informativo/hint (no de error) que acompaña al select. */
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

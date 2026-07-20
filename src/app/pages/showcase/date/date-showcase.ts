import { Component } from '@angular/core';
import { MessageSeverity } from '../../../shared/components/message/message';
import {
  DatePicker,
  DateDisplay,
  DateSelectionMode,
  DateSize,
  DateVariant,
  DateView,
} from '../../../shared/components/date/date';

/** Forma de cada variante del datepicker mostrada en el showcase. */
interface DateVariantDemo {
  title: string;
  label: string;
  size?: DateSize;
  variant?: DateVariant;
  fluid?: boolean;
  selectionMode?: DateSelectionMode;
  display?: DateDisplay;
  view?: DateView;
  icon?: string;
  placeholder?: string;
  showButtonBar?: boolean;
  showWeek?: boolean;
  showTime?: boolean;
  timeOnly?: boolean;
  numberOfMonths?: number;
  isDisabled?: boolean;
  isInvalid?: boolean;
  required?: boolean;
  errorMessage?: string;
  message?: string;
  messageSeverity?: MessageSeverity;
  materialIcon?: string;
}

@Component({
  selector: 'app-date-showcase',
  imports: [DatePicker],
  templateUrl: './date-showcase.html',
  styleUrl: './date-showcase.scss',
})
export class DateShowcase {
  // Fecha de hoy, usada como minDate en la variante con límites.
  readonly hoy = new Date();

  // Variantes del datepicker. Cada objeto activa distintos @Input() del
  // componente reutilizable app-date.
  readonly dateVariants: DateVariantDemo[] = [
    {
      title: 'Normal',
      label: 'Fecha',
    },
    {
      title: 'Small (size)',
      label: 'Compacto',
      size: 'small',
    },
    {
      title: 'Large (size)',
      label: 'Grande',
      size: 'large',
    },
    {
      title: 'Filled (variant)',
      label: 'Relleno',
      variant: 'filled',
    },
    {
      title: 'Fluid (ancho completo)',
      label: 'Ancho completo',
      fluid: true,
    },
    {
      title: 'Con botones (Hoy / Limpiar)',
      label: 'Con button bar',
      showButtonBar: true,
    },
    {
      title: 'Rango de fechas',
      label: 'Desde – Hasta',
      selectionMode: 'range',
      numberOfMonths: 2,
      placeholder: 'dd/mm/aaaa – dd/mm/aaaa',
    },
    {
      title: 'Con hora (showTime)',
      label: 'Fecha y hora',
      showTime: true,
      placeholder: 'dd/mm/aaaa hh:mm',
    },
    {
      title: 'Solo hora (timeOnly)',
      label: 'Hora',
      showTime: true,
      timeOnly: true,
      icon: 'schedule',
      placeholder: 'hh:mm',
    },
    {
      title: 'Número de semana',
      label: 'Con semana',
      showWeek: true,
    },
    {
      title: 'Deshabilitado',
      label: 'No editable',
      isDisabled: true,
    },
    {
      title: 'Con hint',
      label: 'Con ayuda',
      message: 'Elige una fecha a partir de hoy.',
      messageSeverity: 'info',
      materialIcon: 'info',
    },
    {
      title: 'Inválido (error)',
      label: 'Obligatorio',
      required: true,
      isInvalid: true,
      errorMessage: 'Debes seleccionar una fecha válida.',
      materialIcon: 'error',
    },
  ];
}

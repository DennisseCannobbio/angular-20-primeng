import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageSeverity, MessageVariant } from '../../../shared/components/message/message';
import {
  RadioButton,
  RadioButtonLayout,
  RadioButtonOption,
  RadioButtonSize,
} from '../../../shared/components/radio-button/radio-button';

/** Forma de cada variante del radio mostrada en el showcase. */
interface RadioVariantDemo {
  title: string;
  label: string;
  options: RadioButtonOption[];
  card?: boolean;
  layout?: RadioButtonLayout;
  size?: RadioButtonSize;
  required?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  message?: string;
  messageSeverity?: MessageSeverity;
  messageVariant?: MessageVariant;
  materialIcon?: string;
  /** Valor inicial seleccionado en la demo. */
  value?: any;
}

@Component({
  selector: 'app-radio-button-showcase',
  imports: [FormsModule, RadioButton],
  templateUrl: './radio-button-showcase.html',
  styleUrl: './radio-button-showcase.scss',
})
export class RadioButtonShowcase {
  // Opciones simples reutilizadas por las variantes clásicas.
  private readonly planes: RadioButtonOption[] = [
    { label: 'Plan mensual', value: 'mensual' },
    { label: 'Plan anual', value: 'anual' },
    { label: 'Plan de por vida', value: 'lifetime' },
  ];

  // Opciones tipo tarjeta (con ícono, título y subtítulo), como en el diseño.
  private readonly objetivos: RadioButtonOption[] = [
    {
      label: 'Promocionales',
      value: 'promo',
      title: 'Promocionales',
      subtitle: 'Impulsa el uso de cupones y beneficios con ofertas relevantes',
      icon: 'campaign',
    },
    {
      label: 'Crecimiento',
      value: 'crecimiento',
      title: 'Crecimiento',
      subtitle: 'Invita a asegurados a ampliar coberturas o contratar nuevos productos',
      icon: 'trending_up',
    },
    {
      label: 'Retención',
      value: 'retencion',
      title: 'Retención',
      subtitle: 'Previene cancelaciones con mensajes antes del vencimiento de la póliza',
      icon: 'group',
    },
    {
      label: 'Fidelización',
      value: 'fidelizacion',
      title: 'Fidelización',
      subtitle: 'Invita a asegurados a ampliar coberturas o contratar nuevos productos',
      icon: 'workspace_premium',
    },
  ];

  // Variantes del radio. Cada objeto activa distintos @Input() del componente
  // (modo tarjeta, orientación, tamaño, estados, mensajes).
  readonly radioVariants: RadioVariantDemo[] = [
    {
      title: 'Normal (vertical)',
      label: 'Elige un plan',
      options: this.planes,
      value: 'mensual',
    },
    {
      title: 'Horizontal',
      label: 'Elige un plan',
      options: this.planes,
      layout: 'horizontal',
    },
    {
      title: 'Small (size)',
      label: 'Elige un plan',
      options: this.planes,
      size: 'small',
      value: 'anual',
    },
    {
      title: 'Required',
      label: 'Elige un plan',
      options: this.planes,
      required: true,
    },
    {
      title: 'Con hint (info)',
      label: 'Elige un plan',
      options: this.planes,
      message: 'El plan anual incluye dos meses gratis.',
      messageSeverity: 'info',
      materialIcon: 'info',
      value: 'anual',
    },
    {
      title: 'Deshabilitado',
      label: 'Elige un plan',
      options: this.planes,
      isDisabled: true,
      value: 'mensual',
    },
    {
      title: 'Inválido (error)',
      label: 'Elige un plan',
      options: this.planes,
      required: true,
      isInvalid: true,
      errorMessage: 'Debes seleccionar un plan para continuar.',
      materialIcon: 'error',
    },
    {
      title: 'Modo tarjeta (card)',
      label: 'Selecciona el objetivo de la campaña',
      options: this.objetivos,
      card: true,
      value: 'promo',
    },
    {
      title: 'Tarjetas horizontales',
      label: 'Selecciona el objetivo de la campaña',
      options: this.objetivos,
      card: true,
      layout: 'horizontal',
      value: 'crecimiento',
    },
  ];

  // Modelo (ngModel) de cada radio, indexado por título de la variante.
  radioValues: Record<string, any> = this.radioVariants.reduce(
    (acc, v) => ({ ...acc, [v.title]: v.value ?? null }),
    {} as Record<string, any>,
  );
}

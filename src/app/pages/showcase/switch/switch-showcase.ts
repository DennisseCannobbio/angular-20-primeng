import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageSeverity, MessageVariant } from '../../../shared/components/message/message';
import { Switch, SwitchSize, SwitchLabelPosition } from '../../../shared/components/switch/switch';

/** Forma de cada variante del switch mostrada en el showcase. */
interface SwitchVariantDemo {
  title: string;
  label: string;
  labelPosition?: SwitchLabelPosition;
  size?: SwitchSize;
  required?: boolean;
  readonly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  message?: string;
  messageSeverity?: MessageSeverity;
  messageVariant?: MessageVariant;
  materialIcon?: string;
  /** Valor inicial del switch para la demo. */
  value?: boolean;
}

@Component({
  selector: 'app-switch-showcase',
  imports: [FormsModule, Switch],
  templateUrl: './switch-showcase.html',
  styleUrl: './switch-showcase.scss',
})
export class SwitchShowcase {
  // Variantes del switch. Cada objeto activa distintos @Input() del componente
  // (tamaño, posición del label, estados, mensajes).
  readonly switchVariants: SwitchVariantDemo[] = [
    {
      title: 'Normal',
      label: 'Activar notificaciones',
      value: true,
    },
    {
      title: 'Label arriba',
      label: 'Modo oscuro',
      labelPosition: 'top',
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
      value: true,
    },
    {
      title: 'Required',
      label: 'Aceptar términos',
      required: true,
    },
    {
      title: 'Con hint (info)',
      label: 'Sincronización',
      message: 'Se sincroniza cada 5 minutos.',
      messageSeverity: 'info',
      materialIcon: 'info',
      value: true,
    },
    {
      title: 'Readonly',
      label: 'Solo lectura',
      readonly: true,
      value: true,
    },
    {
      title: 'Deshabilitado',
      label: 'No editable',
      isDisabled: true,
    },
    {
      title: 'Inválido (error)',
      label: 'Consentimiento',
      required: true,
      isInvalid: true,
      errorMessage: 'Debes activar esta opción para continuar.',
      materialIcon: 'error',
    },
  ];

  // Modelo (ngModel) de cada switch, indexado por título de la variante.
  // Permite alternar cada switch de forma independiente.
  switchValues: Record<string, boolean> = this.switchVariants.reduce(
    (acc, v) => ({ ...acc, [v.title]: v.value ?? false }),
    {} as Record<string, boolean>,
  );
}

import { Component } from '@angular/core';
import { MessageSeverity } from '../../../shared/components/message/message';
import { Select, SelectSize, SelectVariant } from '../../../shared/components/select/select';

/** Forma de cada variante del select mostrada en el showcase. */
interface SelectVariantDemo {
  title: string;
  label: string;
  size?: SelectSize;
  variant?: SelectVariant;
  fluid?: boolean;
  loading?: boolean;
  showClear?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  required?: boolean;
  errorMessage?: string;
  message?: string;
  messageSeverity?: MessageSeverity;
  materialIcon?: string;
}

@Component({
  selector: 'app-select-showcase',
  imports: [Select],
  templateUrl: './select-showcase.html',
  styleUrl: './select-showcase.scss',
})
export class SelectShowcase {
  // Opciones para el componente select de prueba.
  readonly selectOptions = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' },
  ];

  // Variantes del select. Todas comparten selectOptions; cada objeto activa
  // distintos @Input() del componente.
  readonly selectVariants: SelectVariantDemo[] = [
    {
      title: 'Normal',
      label: 'Opciones',
      showClear: true,
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
      title: 'Loading (cargando)',
      label: 'Cargando datos',
      loading: true,
    },
    {
      title: 'Deshabilitado',
      label: 'No editable',
      isDisabled: true,
    },
    {
      title: 'Con hint',
      label: 'Con ayuda',
      message: 'Elige la opción que mejor aplique.',
      messageSeverity: 'info',
      materialIcon: 'info',
    },
    {
      title: 'Inválido (error)',
      label: 'Obligatorio',
      required: true,
      showClear: true,
      isInvalid: true,
      errorMessage: 'Debes seleccionar una opción válida.',
      materialIcon: 'error',
    },
  ];

  // Opciones masivas para probar el Virtual Scroll (10.000 items).
  readonly virtualScrollOptions = Array.from({ length: 10000 }).map((_, i) => ({
    label: `Elemento virtual ${i + 1}`,
    value: `${i + 1}`,
  }));
}

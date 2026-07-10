import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Message, MessageSeverity, MessageVariant } from '../../shared/components/message/message';
import {
  InputText,
  InputSize,
  InputVariant as InputFieldVariant,
  IconPosition,
} from '../../shared/components/input-text/input-text';
import { Select, SelectSize, SelectVariant } from '../../shared/components/select/select';

/** Forma de cada variante del select mostrada en el sandbox. */
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

/** Forma de cada variante del input-text mostrada en el sandbox. */
interface InputVariant {
  title: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  message?: string;
  messageSeverity?: MessageSeverity;
  messageVariant?: MessageVariant;
  materialIcon?: string;
  size?: InputSize;
  variant?: InputFieldVariant;
  fluid?: boolean;
  fieldIcon?: string;
  fieldIconPosition?: IconPosition;
}

@Component({
  selector: 'app-sandbox',
  imports: [ButtonModule, TagModule, Message, InputText, Select],
  templateUrl: './sandbox.html',
  styleUrl: './sandbox.scss',
})
export class Sandbox {
  // Opciones para el componente select de prueba
  readonly selectOptions = [
    { label: 'Opción 1', value: '1' },
    { label: 'Opción 2', value: '2' },
    { label: 'Opción 3', value: '3' },
  ];

  // Variantes del select para el sandbox. Todas comparten selectOptions; cada
  // objeto activa distintos @Input() del componente.
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

  // Opciones masivas para probar el Virtual Scroll (10.000 items)
  readonly virtualScrollOptions = Array.from({ length: 10000 }).map((_, i) => ({
    label: `Elemento virtual ${i + 1}`,
    value: `${i + 1}`,
  }));

  // Severidades para botones (Button sí soporta "help").
  readonly severities = [
    { severity: undefined, label: 'Primary' },
    { severity: 'secondary', label: 'Secondary' },
    { severity: 'success', label: 'Success' },
    { severity: 'info', label: 'Info' },
    { severity: 'warn', label: 'Warn' },
    { severity: 'danger', label: 'Danger' },
    { severity: 'help', label: 'Help' },
    { severity: 'contrast', label: 'Contrast' },
  ] as const;

  // Mensajes por severidad (app-message). Cada uno con su ícono de Material
  // Symbols y el texto de ejemplo.
  readonly messages = [
    { severity: 'success', materialIcon: 'check_circle', text: 'Operación realizada con éxito.' },
    { severity: 'info', materialIcon: 'info', text: 'Este es un mensaje informativo.' },
    { severity: 'warn', materialIcon: 'warning', text: 'Ten cuidado con esta acción.' },
    { severity: 'error', materialIcon: 'error', text: 'Ocurrió un error al procesar.' },
  ] as const;

  // Variantes del input-text para el sandbox. Cada objeto es un conjunto de
  // @Input() del componente; se recorren con @for para mostrar todos los
  // estados (normal, hint, required, disabled, inválido, severidades...).
  readonly inputVariants: InputVariant[] = [
    {
      title: 'Normal',
      label: 'Nombre',
      placeholder: 'Escribe tu nombre',
    },
    {
      title: 'Required',
      label: 'Correo',
      placeholder: 'tucorreo@dominio.com',
      required: true,
    },
    {
      title: 'Con hint (info)',
      label: 'Usuario',
      placeholder: 'usuario123',
      message: 'Usa entre 4 y 20 caracteres.',
      messageSeverity: 'info',
      materialIcon: 'info',
    },
    {
      title: 'Hint success',
      label: 'Cupón',
      placeholder: 'PROMO2026',
      message: '¡Cupón válido!',
      messageSeverity: 'success',
      materialIcon: 'check_circle',
    },
    {
      title: 'Hint warning',
      label: 'Contraseña',
      placeholder: '••••••••',
      message: 'Tu contraseña es débil.',
      messageSeverity: 'warn',
      materialIcon: 'warning',
    },
    {
      title: 'Inválido (error)',
      label: 'URL de destino',
      placeholder: 'https://...',
      required: true,
      isInvalid: true,
      errorMessage: 'Debes ingresar una URL de destino válida. Campo obligatorio',
      materialIcon: 'error',
    },
    {
      title: 'Deshabilitado',
      label: 'ID de sistema',
      placeholder: 'No editable',
      isDisabled: true,
    },
    {
      title: 'Hint outlined',
      label: 'Descripción',
      placeholder: 'Texto opcional...',
      message: 'Este campo es opcional.',
      messageSeverity: 'secondary',
      messageVariant: 'outlined',
      materialIcon: 'edit',
    },
    {
      title: 'Small (size)',
      label: 'Código',
      placeholder: 'ABC-123',
      size: 'small',
    },
    {
      title: 'Large (size)',
      label: 'Título',
      placeholder: 'Escribe un título',
      size: 'large',
    },
    {
      title: 'Filled (variant)',
      label: 'Búsqueda',
      placeholder: 'Buscar...',
      variant: 'filled',
    },
    {
      title: 'Fluid (ancho completo)',
      label: 'Comentario',
      placeholder: 'Ocupa todo el ancho disponible',
      fluid: true,
    },
    {
      title: 'Ícono izquierda',
      label: 'Buscar',
      placeholder: 'Buscar usuario...',
      fieldIcon: 'search',
      fieldIconPosition: 'left',
    },
    {
      title: 'Ícono derecha',
      label: 'Correo',
      placeholder: 'tucorreo@dominio.com',
      fieldIcon: 'mail',
      fieldIconPosition: 'right',
    },
    {
      title: 'Ícono + filled + inválido',
      label: 'Contraseña',
      placeholder: '••••••••',
      variant: 'filled',
      fieldIcon: 'lock',
      isInvalid: true,
      errorMessage: 'La contraseña es incorrecta.',
      materialIcon: 'error',
    },
  ];

  // Severidades para tags (Tag NO soporta "help").
  readonly tagSeverities = [
    { severity: 'secondary', label: 'Secondary' },
    { severity: 'success', label: 'Success' },
    { severity: 'info', label: 'Info' },
    { severity: 'warn', label: 'Warn' },
    { severity: 'danger', label: 'Danger' },
    { severity: 'contrast', label: 'Contrast' },
  ] as const;

  // Escala tipográfica del Figma (variables --bs-font-size-*). El "muestra" es
  // el texto de ejemplo; token/px para el mapeo con el Figma.
  readonly typeScale = [
    { token: 'neg-3', var: '--bs-font-size-neg-3', px: 10 },
    { token: 'neg-2', var: '--bs-font-size-neg-2', px: 12 },
    { token: 'neg-1', var: '--bs-font-size-neg-1', px: 14 },
    { token: 'base', var: '--bs-font-size-base', px: 16 },
    { token: '01', var: '--bs-font-size-01', px: 18 },
    { token: '02', var: '--bs-font-size-02', px: 20 },
    { token: '03', var: '--bs-font-size-03', px: 24 },
    { token: '04', var: '--bs-font-size-04', px: 28 },
    { token: '05', var: '--bs-font-size-05', px: 32 },
    { token: '06', var: '--bs-font-size-06', px: 40 },
    { token: '07', var: '--bs-font-size-07', px: 48 },
    { token: '08', var: '--bs-font-size-08', px: 56 },
    { token: '09', var: '--bs-font-size-09', px: 70 },
    { token: '10', var: '--bs-font-size-10', px: 84 },
  ];

  // Pesos disponibles (Figma: Regular / Bold).
  readonly typeWeights = [
    { label: 'Regular (400)', var: '--bs-font-weight-regular' },
    { label: 'Bold (700)', var: '--bs-font-weight-bold' },
  ];

  // Interlineados del Figma.
  readonly typeLineHeights = [
    { label: 'Títulos · 125%', var: '--bs-line-height-title' },
    { label: 'Cuerpos · 150%', var: '--bs-line-height-body' },
  ];

  // ---- Escalas de dimensión del Figma ----
  // Estas variables las GENERA el preset (radiusBorder, spacing, sizing,
  // sizingBorder) y son globales: se usan directo con var(--p-...) sin crear
  // variables --bs-* extra. Aquí solo se listan para pintar las muestras.

  // radius-border → --p-radius-border-* (radios de esquina).
  readonly radiusScale = [
    { token: '01', var: '--p-radius-border-01', px: 4 },
    { token: '02', var: '--p-radius-border-02', px: 8 },
    { token: '03', var: '--p-radius-border-03', px: 12 },
    { token: '04', var: '--p-radius-border-04', px: 16 },
    { token: '05', var: '--p-radius-border-05', px: 24 },
    { token: '06', var: '--p-radius-border-06', px: 48 },
    { token: 'circle', var: '--p-radius-border-circle', px: 9999 },
  ];

  // spacing → --p-spacing-* (paddings, gaps, márgenes).
  readonly spacingScale = [
    { token: '00', var: '--p-spacing-00', px: 0 },
    { token: '01', var: '--p-spacing-01', px: 4 },
    { token: '02', var: '--p-spacing-02', px: 8 },
    { token: '03', var: '--p-spacing-03', px: 12 },
    { token: '04', var: '--p-spacing-04', px: 16 },
    { token: '05', var: '--p-spacing-05', px: 20 },
    { token: '06', var: '--p-spacing-06', px: 24 },
    { token: '07', var: '--p-spacing-07', px: 32 },
    { token: '08', var: '--p-spacing-08', px: 40 },
    { token: '09', var: '--p-spacing-09', px: 48 },
    { token: '10', var: '--p-spacing-10', px: 56 },
    { token: '11', var: '--p-spacing-11', px: 64 },
    { token: '12', var: '--p-spacing-12', px: 72 },
    { token: '13', var: '--p-spacing-13', px: 80 },
  ];

  // sizing → --p-sizing-* (anchos/altos de componentes).
  readonly sizingScale = [
    { token: '01', var: '--p-sizing-01', px: 4 },
    { token: '02', var: '--p-sizing-02', px: 8 },
    { token: '03', var: '--p-sizing-03', px: 16 },
    { token: '04', var: '--p-sizing-04', px: 24 },
    { token: '05', var: '--p-sizing-05', px: 32 },
    { token: '06', var: '--p-sizing-06', px: 40 },
    { token: '07', var: '--p-sizing-07', px: 48 },
    { token: '08', var: '--p-sizing-08', px: 64 },
    { token: '09', var: '--p-sizing-09', px: 72 },
    { token: '10', var: '--p-sizing-10', px: 96 },
    { token: '11', var: '--p-sizing-11', px: 144 },
  ];

  // sizing-border → --p-sizing-border-* (grosores de borde).
  readonly sizingBorderScale = [
    { token: '01', var: '--p-sizing-border-01', px: 1 },
    { token: '02', var: '--p-sizing-border-02', px: 2 },
    { token: '03', var: '--p-sizing-border-03', px: 4 },
    { token: '04', var: '--p-sizing-border-04', px: 8 },
  ];

  // Foundations (variables CSS generadas por el preset) para pintar swatches.
  readonly foundationGroups = [
    {
      name: 'surface',
      vars: ['--p-surface-01', '--p-surface-02', '--p-surface-inverse-01', '--p-surface-inverse-02'],
    },
    {
      name: 'container',
      vars: [
        '--p-container-01', '--p-container-02', '--p-container-03',
        '--p-container-04', '--p-container-05',
        '--p-container-inverse-01', '--p-container-inverse-02',
      ],
    },
    {
      name: 'on-surface',
      vars: [
        '--p-on-surface-01', '--p-on-surface-02', '--p-on-surface-03',
        '--p-on-surface-inverse-01', '--p-on-surface-inverse-02',
      ],
    },
    {
      name: 'accent',
      vars: [
        '--p-accent-01', '--p-accent-02', '--p-accent-container-01',
        '--p-accent-container-02', '--p-accent-on-accent-01',
        '--p-accent-border-01', '--p-accent-border-02',
      ],
    },
    {
      name: 'border',
      vars: [
        '--p-border-01', '--p-border-02', '--p-border-03',
        '--p-border-inverse-01', '--p-border-inverse-02',
      ],
    },
    {
      name: 'error',
      vars: [
        '--p-error-01', '--p-error-container-01', '--p-error-container-02',
        '--p-error-on-error-01', '--p-error-on-error-02',
        '--p-error-border-01', '--p-error-border-02',
      ],
    },
    {
      name: 'warning',
      vars: [
        '--p-warning-01', '--p-warning-container-01',
        '--p-warning-on-warning-01', '--p-warning-border-01',
      ],
    },
    {
      name: 'success',
      vars: [
        '--p-success-01', '--p-success-container-01', '--p-success-container-02',
        '--p-success-on-success-01', '--p-success-on-success-02',
        '--p-success-border-01', '--p-success-border-02',
      ],
    },
    {
      name: 'info',
      vars: [
        '--p-info-01', '--p-info-container-01',
        '--p-info-on-info-01', '--p-info-border-01',
      ],
    },
    {
      name: 'disabled',
      vars: [
        '--p-disabled-01', '--p-disabled-container-01', '--p-disabled-container-02',
        '--p-disabled-on-disabled-01', '--p-disabled-on-disabled-02',
        '--p-disabled-border-01',
      ],
    },
    {
      name: 'palette/brand',
      vars: [
        '--p-palette-brand-01', '--p-palette-brand-02', '--p-palette-brand-03',
        '--p-palette-brand-04', '--p-palette-brand-05', '--p-palette-brand-06',
        '--p-palette-brand-07', '--p-palette-brand-08', '--p-palette-brand-09',
        '--p-palette-brand-10',
      ],
    },
  ];
}

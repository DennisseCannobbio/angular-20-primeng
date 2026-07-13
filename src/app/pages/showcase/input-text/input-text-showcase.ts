import { Component } from '@angular/core';
import { MessageSeverity, MessageVariant } from '../../../shared/components/message/message';
import {
  InputText,
  InputSize,
  InputVariant as InputFieldVariant,
  IconPosition,
} from '../../../shared/components/input-text/input-text';

/** Forma de cada variante del input-text mostrada en el showcase. */
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
  selector: 'app-input-text-showcase',
  imports: [InputText],
  templateUrl: './input-text-showcase.html',
  styleUrl: './input-text-showcase.scss',
})
export class InputTextShowcase {
  // Variantes del input-text. Cada objeto es un conjunto de @Input() del
  // componente; se recorren con @for para mostrar todos los estados (normal,
  // hint, required, disabled, inválido, severidades...).
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
}

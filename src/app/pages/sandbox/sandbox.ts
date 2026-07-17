import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Tarjeta de acceso a una página del showcase. */
interface ShowcaseLink {
  title: string;
  description: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sandbox',
  imports: [RouterLink],
  templateUrl: './sandbox.html',
  styleUrl: './sandbox.scss',
})
export class Sandbox {
  // Índice de páginas del showcase. Cada tarjeta enlaza a la demo de un
  // componente (o a los design tokens del tema).
  readonly links: ShowcaseLink[] = [
    {
      title: 'Input Text',
      description: 'Campo de texto con label, ícono, estados y mensajes.',
      route: '/showcase/input-text',
      icon: 'edit',
    },
    {
      title: 'Select',
      description: 'Selector con filtro, virtual scroll y estados.',
      route: '/showcase/select',
      icon: 'arrow_drop_down_circle',
    },
    {
      title: 'Switch',
      description: 'Interruptor booleano con label, tamaños y mensajes.',
      route: '/showcase/switch',
      icon: 'toggle_on',
    },
    {
      title: 'Message',
      description: 'Mensajes por severidad, variante y tamaño.',
      route: '/showcase/message',
      icon: 'chat',
    },
    {
      title: 'Button',
      description: 'Botones de PrimeNG por severidad y estilo.',
      route: '/showcase/button',
      icon: 'smart_button',
    },
    {
      title: 'Tag',
      description: 'Etiquetas de PrimeNG por severidad.',
      route: '/showcase/tag',
      icon: 'label',
    },
    {
      title: 'Table',
      description: 'Tabla dinámica de PrimeNG con paginación.',
      route: '/showcase/table',
      icon: 'table_chart',
    },
    {
      title: 'Theme',
      description: 'Design tokens: tipografía, dimensiones y foundations.',
      route: '/showcase/theme',
      icon: 'palette',
    },
    {
      title: 'Form Demo',
      description: 'Ejemplo de formulario reactivo con FormGroup y validaciones.',
      route: '/form-demo',
      icon: 'checklist',
    },
    {
      title: 'Spinner',
      description: 'Indicador de carga parametrizable con estilos de PrimeNG.',
      route: '/showcase/spinner',
      icon: 'progress_activity',
    },
  ];
}
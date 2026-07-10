import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Message } from '../../shared/components/message/message';
import { InputText } from '../../shared/components/input-text/input-text';
import { Select } from '../../shared/components/select/select';

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

import { Component, signal } from '@angular/core';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-button-showcase',
  imports: [Button],
  templateUrl: './button-showcase.html',
  styleUrl: './button-showcase.scss',
})
export class ButtonShowcase {
  readonly severities = [
    { severity: 'primary', label: 'Primary' },
    { severity: 'secondary', label: 'Secondary' },
    { severity: 'success', label: 'Success' },
    { severity: 'danger', label: 'Danger' },
  ] as const;

  /** Posiciones del icono respecto al label. */
  readonly iconPositions = [
    { iconPos: 'left', label: 'Left', icon: 'chevron_left' },
    { iconPos: 'right', label: 'Right', icon: 'chevron_right' },
    { iconPos: 'top', label: 'Top', icon: 'expand_less' },
    { iconPos: 'bottom', label: 'Bottom', icon: 'expand_more' },
  ] as const;

  /** Contador para demostrar el @Output() onClick. */
  readonly clicks = signal(0);

  /** Estado del botón de carga: vuelve solo a false para poder repetir la demo. */
  readonly isLoading = signal(false);

  simularCarga() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}

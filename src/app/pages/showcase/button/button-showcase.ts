import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-showcase',
  imports: [ButtonModule],
  templateUrl: './button-showcase.html',
  styleUrl: './button-showcase.scss',
})
export class ButtonShowcase {
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
}

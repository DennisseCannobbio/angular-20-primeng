import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-tag-showcase',
  imports: [TagModule],
  templateUrl: './tag-showcase.html',
  styleUrl: './tag-showcase.scss',
})
export class TagShowcase {
  // Severidades para tags (Tag NO soporta "help").
  readonly tagSeverities = [
    { severity: 'secondary', label: 'Secondary' },
    { severity: 'success', label: 'Success' },
    { severity: 'info', label: 'Info' },
    { severity: 'warn', label: 'Warn' },
    { severity: 'danger', label: 'Danger' },
    { severity: 'contrast', label: 'Contrast' },
  ] as const;
}

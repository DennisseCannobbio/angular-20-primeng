import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-bs-chip',
    standalone: true,
    imports: [CommonModule, Ripple],
    templateUrl: './chip.html',
    styleUrl: './chip.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
    @Input() id: string = '';
    @Input() label: string = '';

    @Input() iconClass: string = '';

    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() state: 'default' | 'removable' | 'selected' | 'disabled' | 'error' = 'default';

    @Output() track = new EventEmitter<any>();

    onRemove(event: MouseEvent) {
        event.stopPropagation();
        this.track.emit({
            id: this.id,
            label: this.label,
            action: 'remove',
            state: this.state
        });
    }

    onClick() {
        if (this.state === 'disabled') return;

        if (this.state === 'default' || this.state === 'selected') {
            this.state = this.state === 'default' ? 'selected' : 'default';
            this.track.emit({
                id: this.id,
                action: 'state-change',
                state: this.state
            });
        }
    }
}
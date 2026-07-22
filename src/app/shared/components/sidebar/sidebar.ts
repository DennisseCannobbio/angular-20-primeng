import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

export type SidebarMode = 'slide' | 'push';
export type SidebarPosition = 'left' | 'right';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [A11yModule], // Eliminamos CommonModule, conservamos A11yModule para cdkTrapFocus
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.scss',
})
export class SidebarComponent implements OnChanges, OnDestroy {
    @Input() isOpen: boolean = false;
    @Input() mode: SidebarMode = 'slide';
    @Input() position: SidebarPosition = 'right';
    @Input() hasBackdrop: boolean = true;
    @Input() closeOnOutsideClick: boolean = true;
    @Input() closeOnEscape: boolean = true;
    @Input() width: string = '380px';
    @Input() collapsedWidth: string = '80px';
    @Input() ariaLabel: string = 'Panel lateral';

    @Output() isOpenChange = new EventEmitter<boolean>();
    @Output() closed = new EventEmitter<void>();
    @Output() opened = new EventEmitter<void>();

    private readonly noScrollClass = 'no-scroll';
    private cierreInterno = false;

    constructor(private renderer: Renderer2) { }

    get esModal(): boolean {
        return this.mode === 'slide' && this.hasBackdrop;
    }

    get anchoActual(): string {
        if (this.mode === 'push') {
            return this.isOpen ? this.width : this.collapsedWidth;
        }
        return this.width;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const cambioIsOpen = changes['isOpen'];
        if (!cambioIsOpen) {
            return;
        }
        this.actualizarBloqueoScroll();

        if (this.cierreInterno) {
            this.cierreInterno = false;
            return;
        }

        if (!cambioIsOpen.firstChange) {
            (cambioIsOpen.currentValue ? this.opened : this.closed).emit();
        }
    }

    ngOnDestroy(): void {
        this.liberarScroll();
    }

    onOverlayClick(): void {
        if (this.closeOnOutsideClick) {
            this.cerrar();
        }
    }

    @HostListener('document:keydown.escape')
    onEscapeKey(): void {
        if (this.isOpen && this.closeOnEscape && this.mode === 'slide') {
            this.cerrar();
        }
    }

    private cerrar(): void {
        if (!this.isOpen) {
            return;
        }
        this.cierreInterno = true;
        this.isOpen = false;
        this.actualizarBloqueoScroll();
        this.isOpenChange.emit(false);
        this.closed.emit();
    }

    private actualizarBloqueoScroll(): void {
        if (this.esModal && this.isOpen) {
            this.renderer.addClass(document.body, this.noScrollClass);
        } else {
            this.liberarScroll();
        }
    }

    private liberarScroll(): void {
        this.renderer.removeClass(document.body, this.noScrollClass);
    }
}
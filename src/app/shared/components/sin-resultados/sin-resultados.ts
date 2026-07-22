import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sin-resultados',
    standalone: true,
    templateUrl: './sin-resultados.html',
    styleUrl: './sin-resultados.scss'
})
export class SinResultadosComponent {
    @Input() titulo: string = 'Sin registros';
    @Input() mensaje: string = '';
    @Input() icono: string = 'scan_delete';
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Meta, PaginacionTablaComponent } from '../paginacion-tabla/paginacion-tabla';

export type ColumnType = 'text' | 'date' | 'time' | 'badge' | 'action';

export interface ColumnDef {
    field: string;
    header: string;
    type: ColumnType;
    actionLabel?: string;
    dateFormat?: string;
}

@Component({
    selector: 'app-tabla-dinamica',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        TagModule,
        ButtonModule,
        PaginacionTablaComponent,
        DatePipe
    ],
    templateUrl: './tabla-dinamica.html',
    styleUrl: './tabla-dinamica.scss'
})
export class TablaDinamicaComponent {
    @Input() data: any[] = [];
    @Input() columns: ColumnDef[] = [];
    @Input() meta!: Meta;
    @Output() accionClic = new EventEmitter<any>();
    @Output() cambioPagina = new EventEmitter<Meta>();

    getSeverity(estado: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
        if (!estado) return undefined;
        const est = estado.toLowerCase();

        if (est.includes('activ') || est.includes('enviad')) return 'success';
        if (est.includes('borrador')) return 'contrast';
        if (est.includes('pendiente')) return 'warn';
        if (est.includes('por enviar')) return 'info';

        return 'secondary';
    }
}
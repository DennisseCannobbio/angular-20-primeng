import { Component } from '@angular/core';
import { ColumnDef, TablaDinamicaComponent } from '../../../shared/components/tabla-dinamica/tabla-dinamica';
import { Meta } from '../../../models/response';

@Component({
    selector: 'app-table-showcase',
    imports: [TablaDinamicaComponent],
    templateUrl: './table-showcase.html',
    styleUrl: './table-showcase.scss',
})
export class TableShowcase {


    paginacionMock = {
        totalRegistros: 153,
        filas: 10,
        primerRegistro: 0
    };

    notificaciones: any[] = [
        { id: '1', titulo: 'PRUEBA QAQA PRUEBA QAQA PRUEBA QAQA PRUEBA QAQA PRUEBA QAQA', estadoNombre: 'Pendiente de edición', fechaCreacion: '2026-06-25T17:54:50.107', ramo: 'Vehículo' },
        { id: '2', titulo: 'PRUEBA QA HU 91', estadoNombre: 'Borrador', fechaCreacion: '2026-06-25T13:50:02.29', ramo: 'Hogar' },
        { id: '3', titulo: 'Hola hola', estadoNombre: 'Pendiente de edición', fechaCreacion: '2026-06-25T13:06:55.067', ramo: 'Salud' },
        { id: '4', titulo: '$300 de descuento', estadoNombre: 'Enviada', fechaCreacion: '2026-06-24T15:59:13.13', ramo: 'Vehículo' }
    ];

    columnas: ColumnDef[] = [
        { field: 'id', header: 'ID', type: 'text' },
        { field: 'titulo', header: 'Título', type: 'text' },
        { field: 'estadoNombre', header: 'Estado', type: 'badge' },
        { field: 'fechaCreacion', header: 'Fecha de envío', type: 'date', dateFormat: 'dd/MM/yyyy' },
        { field: 'fechaCreacion', header: 'Hora de envío', type: 'time' },
        { field: 'ramo', header: 'Ramo', type: 'text' },
        { field: 'acciones', header: '', type: 'action', actionLabel: 'VER DETALLE' }
    ];

    meta: Meta = {
        totalRegistros: 4,
        paginaActual: 1,
        registrosPorPagina: 10,
        totalPaginas: 1
    };

    onAccionClic(item: any) {
        console.log('Acción ejecutada sobre:', item);
    }

    onCambioPagina(evento: any) {
        console.log('Evento de paginación:', evento);
        this.paginacionMock.filas = evento.registrosPorPagina;
        this.paginacionMock.primerRegistro = (evento.paginaActual - 1) * evento.registrosPorPagina;
    }

}

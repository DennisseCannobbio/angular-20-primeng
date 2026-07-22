import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColumnDef, TablaDinamicaComponent } from '../../../../shared/components/tabla-dinamica/tabla-dinamica';

import { Meta } from '../../../../models/response';
import { InputText } from '../../../../shared/components/input-text/input-text';
import { Button } from '../../../../shared/components/button/button';
import { TextoBusqueda } from '../../../../shared/components/texto-busqueda/texto-busqueda';
import { FiltroNotificacionesComponent } from '../filtros/filtro-notificaciones';
import { ChipComponent } from '../../../../shared/components/chip/chip';
import { SinResultadosComponent } from '../../../../shared/components/sin-resultados/sin-resultados';
import { DatePicker } from '../../../../shared/components/date/date';

@Component({
    selector: 'app-listado-notificacion',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TablaDinamicaComponent,
        InputText,
        Button,
        TextoBusqueda,
        DatePicker,
        FiltroNotificacionesComponent,
        ChipComponent,
        SinResultadosComponent
    ],
    templateUrl: './listado-notificacion.html',
    styleUrl: './listado-notificacion.scss'
})
export class ListadoNotificacionesComponent implements OnInit {
    // Variables de búsqueda
    busqueda: string = '';
    periodo: Date[] | null = null; // Arreglo para rango de fechas
    busquedaAplicada: string = '';
    sinResultados: boolean = false;

    // Datos de la tabla
    notificaciones: any[] = [];
    meta!: Meta;

    columnas: ColumnDef[] = [
        { field: 'id', header: 'ID', type: 'text' },
        { field: 'titulo', header: 'Título', type: 'text' },
        { field: 'estadoNombre', header: 'Estado', type: 'badge' },
        { field: 'fechaCreacion', header: 'Fecha de envío', type: 'date', dateFormat: 'dd/MM/yyyy' },
        { field: 'fechaCreacion', header: 'Hora de envío', type: 'time' },
        { field: 'ramo', header: 'Ramo', type: 'text' },
        { field: 'acciones', header: '', type: 'action', actionLabel: 'VER DETALLE' }
    ];

    ngOnInit() {
        this.cargarDatos();
    }

    cargarDatos() {
        // Simulación de carga inicial basada en tu JSON de respuesta
        this.notificaciones = [
            { id: '123456789', titulo: 'Descuento en combustible', estadoNombre: 'Borrador', fechaCreacion: '2025-12-17T19:00:00', ramo: 'Vehículo' },
            { id: '123456788', titulo: 'Descuento en baterías', estadoNombre: 'Pendiente', fechaCreacion: '2025-12-15T19:00:00', ramo: 'Hogar' },
        ];
        this.meta = { totalRegistros: 153, paginaActual: 1, registrosPorPagina: 10, totalPaginas: 16 };
    }

    buscar() {
        this.busquedaAplicada = this.busqueda;
        // Lógica de filtrado a implementar
    }

    onPageChange(event: Meta) {
        this.meta.paginaActual = event.paginaActual;
        this.meta.registrosPorPagina = event.registrosPorPagina;
        this.cargarDatos(); // Recargar datos con nuevos parámetros
    }

    onAccionClic(fila: any) {
        console.log('Ver detalle de:', fila);
    }

    // --- Lógica del Filtro Lateral ---
    filtroVisible: boolean = false;

    // Datos de prueba en memoria
    estados = [
        { label: 'Borrador', value: 'borrador' },
        { label: 'Pendiente', value: 'pendiente' },
        { label: 'Enviada', value: 'enviada' },
        { label: 'Error', value: 'error' }
    ];

    areas = [
        { label: 'Comercial', value: 'comercial' },
        { label: 'Soporte', value: 'soporte' },
        { label: 'Sistemas', value: 'sistemas' }
    ];

    tipos = [
        { label: 'Push', value: 'push' },
        { label: 'Email', value: 'email' },
        { label: 'SMS', value: 'sms' }
    ];

    ramos = [
        { label: 'Vehículos', value: 'vehiculos' },
        { label: 'Hogar', value: 'hogar' },
        { label: 'Salud', value: 'salud' }
    ];

    abrirFiltros() {
        this.filtroVisible = true;
    }

    filtrosAplicados: { id: string, label: string, category: string }[] = [];

    aplicarFiltros(filtros: any) {
        this.filtrosAplicados = [];

        // Estados
        if (filtros.estados && filtros.estados.length > 0) {
            filtros.estados.forEach((est: string) => {
                const found = this.estados.find(e => e.value === est);
                if (found) {
                    this.filtrosAplicados.push({ id: `estado_${est}`, label: found.label, category: 'estados' });
                }
            });
        }
        // Area
        if (filtros.area) {
            const found = this.areas.find(a => a.value === filtros.area);
            if (found) {
                this.filtrosAplicados.push({ id: `area_${filtros.area}`, label: found.label, category: 'area' });
            }
        }
        // Tipo
        if (filtros.tipo) {
            const found = this.tipos.find(t => t.value === filtros.tipo);
            if (found) {
                this.filtrosAplicados.push({ id: `tipo_${filtros.tipo}`, label: found.label, category: 'tipo' });
            }
        }
        // Ramo
        if (filtros.ramo) {
            const found = this.ramos.find(r => r.value === filtros.ramo);
            if (found) {
                this.filtrosAplicados.push({ id: `ramo_${filtros.ramo}`, label: found.label, category: 'ramo' });
            }
        }

        // Simular llamada de recarga
        this.cargarDatos();
    }

    onChipAction(event: any) {
        if (event.action === 'remove') {
            this.filtrosAplicados = this.filtrosAplicados.filter(f => f.id !== event.id);
            // Limpiar del formulario interno del sidebar
            this.cargarDatos();
        }
    }

    limpiarTodosLosChips() {
        this.filtrosAplicados = [];
        this.cargarDatos();
    }

    limpiarFiltros() {
        this.filtrosAplicados = [];
        this.cargarDatos();
    }
}

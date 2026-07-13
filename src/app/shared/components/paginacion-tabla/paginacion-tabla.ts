import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

export interface Meta {
    totalRegistros: number;
    paginaActual: number;
    registrosPorPagina: number;
    totalPaginas: number;
}

@Component({
    selector: 'app-paginacion-tabla',
    standalone: true,
    templateUrl: './paginacion-tabla.html',
    styleUrl: './paginacion-tabla.scss'
})
export class PaginacionTablaComponent implements OnChanges {
    @Input() totalRegistros: number = 0;
    @Input() filas: number = 10;
    @Input() primerRegistro: number = 0;
    @Input() opcionesFilasPorPagina: number[] = [10, 25, 50];

    @Output() cambioDePagina = new EventEmitter<Meta>();

    paginasVisibles: (number | -1)[] = [];
    paginaActual: number = 0;
    cantidadPaginas: number = 0;

    ngOnChanges() {
        this.calcularPaginas();
    }

    calcularPaginas() {
        this.cantidadPaginas = Math.ceil(this.totalRegistros / this.filas);
        this.paginaActual = Math.floor(this.primerRegistro / this.filas);
        this.paginasVisibles = this.obtenerPaginasVisibles();
    }

    obtenerPaginasVisibles(): (number | -1)[] {
        const total = this.cantidadPaginas;
        const current = this.paginaActual;
        const windowSize = 4;

        if (total <= windowSize) {
            return Array.from({ length: total }, (_, i) => i);
        }

        let start = current - 2;
        if (start + windowSize > total) {
            start = total - windowSize;
        }
        if (start < 0) {
            start = 0;
        }

        const end = start + windowSize;
        const pages: (number | -1)[] = [];

        if (start > 0) {
            pages.push(-1);
        }

        for (let i = start; i < end; i++) {
            pages.push(i);
        }

        if (end < total) {
            pages.push(-1);
        }

        return pages;
    }

    cambiarPagina(pagina: number) {
        if (pagina === -1) return;
        if (pagina >= 0 && pagina < this.cantidadPaginas) {
            this.cambioDePagina.emit({
                totalRegistros: this.totalRegistros,
                paginaActual: pagina + 1,
                registrosPorPagina: this.filas,
                totalPaginas: this.cantidadPaginas
            });
        }
    }

    cambiarFilas(evento: Event) {
        const selectElement = evento.target as HTMLSelectElement;
        const valorFilas = parseInt(selectElement.value, 10);
        this.cambioDePagina.emit({
            totalRegistros: this.totalRegistros,
            paginaActual: 1,
            registrosPorPagina: valorFilas,
            totalPaginas: Math.ceil(this.totalRegistros / valorFilas)
        });
    }

    get etiquetaRango(): string {
        if (this.totalRegistros === 0) return '0 resultados';
        const inicio = this.primerRegistro + 1;
        const fin = Math.min(this.primerRegistro + this.filas, this.totalRegistros);
        return `${inicio} - ${fin} de ${this.totalRegistros} resultados`;
    }
}
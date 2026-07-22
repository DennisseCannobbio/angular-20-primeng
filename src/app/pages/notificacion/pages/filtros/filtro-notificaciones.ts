import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar';
import { Select } from '../../../../shared/components/select/select';
import { Button } from '../../../../shared/components/button/button';

@Component({
    selector: 'app-filtro-notificaciones',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CheckboxModule,
        SidebarComponent,
        Select,
        Button
    ],
    templateUrl: './filtro-notificaciones.html',
    styleUrl: './filtro-notificaciones.scss'
})
export class FiltroNotificacionesComponent implements OnInit {
    // Control de visibilidad (Two-way binding)
    private _visible: boolean = false;
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;
    }

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onAplicarFiltros = new EventEmitter<any>();
    @Output() onLimpiar = new EventEmitter<void>();

    // Listas de datos para poblar los filtros
    @Input() estados: any[] = [];
    @Input() areas: any[] = [];
    @Input() tipos: any[] = [];
    @Input() ramos: any[] = [];

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.inicializarFormulario();
    }

    inicializarFormulario() {
        this.form = this.fb.group({
            estados: [[]],
            area: [null],
            tipo: [null],
            ramo: [null]
        });
    }

    cerrar() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    aplicarFiltros() {
        this.onAplicarFiltros.emit(this.form.value);
        this.cerrar();
    }

    accionLimpiarFiltros() {
        this.form.reset({
            estados: [],
            area: null,
            tipo: null,
            ramo: null
        });
        this.onLimpiar.emit();
        this.cerrar();
    }
}
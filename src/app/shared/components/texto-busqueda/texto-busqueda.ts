import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-texto-busqueda',
    templateUrl: './texto-busqueda.html',
    styleUrls: ['./texto-busqueda.scss']
})
export class TextoBusqueda {
    @Input() texto: string = '';
}

import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputText } from '../../shared/components/input-text/input-text';
import { Select } from '../../shared/components/select/select';
import { Switch } from '../../shared/components/switch/switch';
import { AppFile } from '../../shared/components/file/file';
import { DatePicker } from '../../shared/components/date/date';

@Component({
  selector: 'app-form-demo',
  // ReactiveFormsModule es lo que habilita [formGroup] y formControlName.
  // Los tres componentes reutilizables implementan ControlValueAccessor, por
  // eso pueden usarse con formControlName igual que un <input> nativo.
  imports: [ReactiveFormsModule, JsonPipe, ButtonModule, InputText, Select, Switch, AppFile, DatePicker],
  templateUrl: './form-demo.html',
  styleUrl: './form-demo.scss',
})
export class FormDemo {
  private readonly fb = inject(FormBuilder);

  // Opciones para el select (mismo formato label/value que en el sandbox).
  readonly roles = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Lector', value: 'viewer' },
  ];

  // ---- Definición del formulario reactivo ----
  // Cada control declara su valor inicial y sus validadores. El nombre de la
  // clave (nombre, correo, rol, aceptaTerminos) es el que luego se enlaza en
  // el template con formControlName.
  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    rol: [null as string | null, Validators.required],
    fecha_inicio: [null as Date | null, Validators.required],
    imagen_perfil: [null as any, Validators.required],
    documento: [null as any, Validators.required],
    // requiredTrue: el switch DEBE quedar activado para que el form sea válido.
    aceptaTerminos: [false, Validators.requiredTrue],
  });

  // ---- Helpers para el template ----
  // Un control se considera "en error" cuando es inválido Y el usuario ya lo
  // tocó o intentó enviar el form. Así no mostramos errores en un form virgen.
  submitted = false;

  showError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // Devuelve el mensaje de error apropiado según el validador que falló.
  errorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'Este campo es obligatorio.';
    if (control.errors['requiredTrue']) return 'Debes aceptar para continuar.';
    if (control.errors['email']) return 'Ingresa un correo válido.';
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Usa al menos ${min} caracteres.`;
    }
    
    // Para errores de archivo, retornamos vacío para que <app-file> muestre 
    // su propio mensaje interno detallado (internalError).
    if (control.errors['accept'] || control.errors['maxFileSize']) return '';

    return 'Valor inválido.';
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      // Marca todo como touched para que se pinten los errores pendientes.
      this.form.markAllAsTouched();
      return;
    }

    // Aquí normalmente llamarías a tu servicio/backend con this.form.value.
    console.log('Formulario válido:', this.form.value);
    alert('Formulario válido:\n' + JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset({
      nombre: '',
      correo: '',
      rol: null,
      fecha_inicio: null,
      imagen_perfil: null,
      documento: null,
      aceptaTerminos: false,
    });
  }

  // Alterna el estado disabled del control "nombre" para demostrar que
  // setDisabledState del ControlValueAccessor funciona desde el formulario.
  toggleNombreDisabled(): void {
    const control = this.form.get('nombre');
    if (!control) return;
    control.disabled ? control.enable() : control.disable();
  }
}

import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FileUploadModule, FileSelectEvent, FileRemoveEvent, FileUpload } from 'primeng/fileupload';
import { Message, MessageSeverity, MessageVariant } from '../message/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file',
  imports: [FileUploadModule, FormsModule, Message, CommonModule],
  templateUrl: './file.html',
  styleUrl: './file.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFile),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AppFile),
      multi: true,
    },
  ],
})
export class AppFile implements ControlValueAccessor, Validator, AfterViewInit {
  /** Etiqueta que se muestra arriba de la zona de carga. */
  @Input() label = '';

  /** Indica si el campo es obligatorio. */
  @Input() required = false;

  /** Estado de error: si es true, los bordes se pintan de rojo. */
  @Input() isInvalid = false;

  /** Si es true, el componente se deshabilita. */
  @Input() isDisabled = false;

  /** Mensaje de error (tiene prioridad y se muestra cuando el input es inválido). */
  @Input() errorMessage = '';

  /** Mensaje informativo/hint que acompaña al input. */
  @Input() message = '';

  /** Severidad del mensaje informativo. */
  @Input() messageSeverity: MessageSeverity = 'info';

  /** Variante visual del mensaje. */
  @Input() messageVariant: MessageVariant = 'simple';

  /** Ícono Material Symbols del mensaje. */
  @Input() materialIcon = '';

  /** Texto de ayuda bajo el componente (ej. "Formatos aceptados: jpg y png"). */
  @Input() hint = '';

  /** Permite seleccionar múltiples archivos. */
  @Input() multiple = false;

  /** Tipos de archivo aceptados (ej. "image/png, image/jpeg" o ".pdf,.doc"). */
  @Input() accept?: string;

  /** Tamaño máximo de archivo en bytes. */
  @Input() maxFileSize?: number;

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  /** Valor actual (File o File[]). */
  value: File | File[] | null = null;

  /** Error de validación interna detectado por el componente. */
  internalError: string | null = null;

  /** Deshabilitado por el formulario reactivo. */
  disabledByForm = false;

  get disabled(): boolean {
    return this.isDisabled || this.disabledByForm;
  }

  get effectiveIsInvalid(): boolean {
    return this.isInvalid || this.internalError !== null;
  }

  get dropzoneText(): string {
    const isImage = this.accept && this.accept.toLowerCase().includes('image');
    if (this.multiple) {
      return isImage ? 'TUS IMÁGENES' : 'TUS ARCHIVOS';
    } else {
      return isImage ? 'TU IMAGEN' : 'TU ARCHIVO';
    }
  }

  get displayMessage(): string {
    if (this.isInvalid && this.errorMessage) return this.errorMessage;
    if (this.internalError) return this.internalError;
    return this.message;
  }

  get displaySeverity(): MessageSeverity {
    return this.effectiveIsInvalid ? 'error' : this.messageSeverity;
  }

  get isMessageVisible(): boolean {
    return !!this.displayMessage;
  }

  ngAfterViewInit(): void {
    // Si tenemos un atributo accept, lo inyectamos manualmente al input nativo.
    // Esto asegura que el OS File Picker filtre por extensión, pero al mismo
    // tiempo evitamos que PrimeNG bloquee archivos inválidos (como archivos
    // pesados o extensiones arrastradas) ANTES de llegar a nuestro propio
    // Validator y mostrar el estado de error correcto.
    if (this.accept && this.fileUpload) {
      setTimeout(() => {
        const input = this.fileUpload.el?.nativeElement?.querySelector('input[type="file"]');
        if (input) {
          input.setAttribute('accept', this.accept!);
        }
      });
    }
  }

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.value = value;
    // Sincronizar el componente de PrimeNG con el valor del formulario
    if (!value || (Array.isArray(value) && value.length === 0)) {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledByForm = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || (Array.isArray(control.value) && control.value.length === 0)) {
      this.internalError = null;
      return null;
    }

    let files: File[] = [];
    if (Array.isArray(control.value)) {
      files = control.value;
    } else {
      files = [control.value];
    }

    let hasSizeError = false;
    let hasAcceptError = false;

    for (const f of files) {
      const errs = this.getFileErrors(f);
      if (errs) {
        if (errs.maxFileSize) hasSizeError = true;
        if (errs.accept) hasAcceptError = true;
      }
    }

    if (hasSizeError || hasAcceptError) {
      const msgs = [];
      if (hasAcceptError) {
        const allowed = this.getFormattedAcceptList();
        const typeNoun = (this.accept && this.accept.includes('image')) ? 'una imagen' : 'un archivo';
        msgs.push(`formato incorrecto: cambia el archivo por ${typeNoun} ${allowed}`);
      }
      if (hasSizeError) {
        msgs.push(`tamaño máximo excedido: ${this.formatSize(this.maxFileSize!)}`);
      }

      if (this.multiple) {
        this.internalError = `Hay archivos con error (${msgs.join(' y ')}).`;
      } else {
        const detail = msgs.join(' , ');
        this.internalError = detail.charAt(0).toUpperCase() + detail.slice(1) + '.';
      }

      return {
        ...(hasAcceptError ? { accept: true } : {}),
        ...(hasSizeError ? { maxFileSize: true } : {})
      };
    }

    this.internalError = null;
    return null;
  }

  getFileErrors(f: File): { accept?: boolean; maxFileSize?: boolean } | null {
    if (!f) return null;
    let hasError = false;
    const errors: any = {};
    if (this.maxFileSize && f.size > this.maxFileSize) {
      errors.maxFileSize = true;
      hasError = true;
    }

    if (this.accept) {
      const allowedTypes = this.accept.split(',').map(t => t.trim().toLowerCase());
      const fileType = f.type ? f.type.toLowerCase() : '';
      const ext = f.name.includes('.') ? '.' + f.name.split('.').pop()?.toLowerCase() : '';

      const isValid = allowedTypes.some(type => {
        if (type.startsWith('.')) return ext === type;
        if (type.endsWith('/*')) return fileType.startsWith(type.replace('/*', '/'));
        return fileType === type;
      });

      if (!isValid) {
        errors.accept = true;
        hasError = true;
      }
    }
    return hasError ? errors : null;
  }

  private getFormattedAcceptList(): string {
    if (!this.accept) return '';
    return this.accept
      .split(',')
      .map(t => {
        const type = t.trim().toLowerCase();
        if (type.startsWith('image/')) return type.replace('image/', '').toUpperCase();
        if (type.startsWith('.')) return type.substring(1).toUpperCase();
        return type.toUpperCase();
      })
      .join(' o ');
  }

  isFileInvalid(f: File): boolean {
    return this.getFileErrors(f) !== null;
  }

  isItemInvalid(f: File): boolean {
    // Si hay un error interno (ej. un archivo pesaba mucho), solo pintamos
    // de rojo los archivos individuales que sean culpables.
    // Si no hay error interno pero el padre dice que es inválido (ej. custom validator),
    // entonces pintamos todo de rojo.
    if (this.internalError) {
      return this.isFileInvalid(f);
    }
    return this.isInvalid;
  }

  onFileSelect(event: FileSelectEvent) {
    // PrimeNG's event.files already contains the accumulated valid files.
    // If multiple is true, we take all of them. If false, we keep only the last one.
    if (this.multiple) {
      this.value = [...this.fileUpload.files];
    } else {
      if (this.fileUpload.files.length > 1) {
        // Keep only the most recently added file
        this.fileUpload.files = [this.fileUpload.files[this.fileUpload.files.length - 1]];
      }
      this.value = this.fileUpload.files.length ? this.fileUpload.files[0] : null;
    }
    this.onChange(this.value);
    this.onTouched();
  }

  onRemoveItem(event: Event, index: number, removeCallback: any) {
    removeCallback(event, index);
    if (this.multiple) {
      this.value = this.fileUpload.files.length ? [...this.fileUpload.files] : null;
    } else {
      this.value = null;
    }
    this.onChange(this.value);
    this.onTouched();
  }

  isImage(file: any): boolean {
    return file.type ? file.type.startsWith('image/') : false;
  }

  getExtension(filename: string): string {
    if (!filename) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.substring(0, 3) : 'DOC';
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  downloadFile(file: any) {
    const url = file.objectURL || URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (!file.objectURL) {
      URL.revokeObjectURL(url);
    }
  }
}

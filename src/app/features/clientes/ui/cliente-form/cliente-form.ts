import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICliente } from '../../data-access/models/cliente.model';
import { emailEstricto, telefonoMexicano } from '@app/shared/validators';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss',
})
export class ClienteForm implements OnInit {
  private fb = inject(FormBuilder);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);

  form!: FormGroup;
  isEditMode = false;
  cliente?: ICliente;

  ngOnInit(): void {
    this.cliente = this.config.data?.cliente;
    this.isEditMode = !!this.cliente;

    this.form = this.fb.group({
      nombre: [this.cliente?.nombre || '', [Validators.required, Validators.minLength(3)]],
      email: [this.cliente?.email || '', [Validators.required, Validators.email, emailEstricto()]],
      telefono: [this.cliente?.telefono || '', [Validators.required, telefonoMexicano()]],
      direccion: [this.cliente?.direccion || '', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (this.isEditMode) {
        this.ref.close({ ...formValue, id: this.cliente!.id });
      } else {
        this.ref.close(formValue);
      }
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  onCancel() {
    this.ref.close();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) return 'Este campo es requerido';
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (field?.hasError('email')) return 'Email inválido';
    if (field?.hasError('emailInvalido')) return 'Formato de email inválido';
    if (field?.hasError('telefonoInvalido')) return 'El teléfono debe tener 10 dígitos';
    return '';
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pastel } from '../../data-access/models/pastel.model';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pastel-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule
  ],
  templateUrl: './pastel-form.html',
  styleUrl: './pastel-form.scss',
})
export class PastelForm implements OnInit {
  private fb = inject(FormBuilder);
  private config = inject(DynamicDialogConfig);
  private ref = inject(DynamicDialogRef);

  form!: FormGroup;
  isEditMode = false;
  pastel?: Pastel;

  ngOnInit() {
    this.pastel = this.config.data?.pastel;
    this.isEditMode = !!this.pastel;

    this.form = this.fb.group({
      nombre: [this.pastel?.nombre || '', [Validators.required, Validators.minLength(3)]],
      sabor: [this.pastel?.sabor || '', [Validators.required, Validators.minLength(3)]],
      precio: [this.pastel?.precio || 0, [Validators.required, Validators.min(0.01)]],
      stock: [this.pastel?.stock || 0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      if (this.isEditMode) {
        // Editar: incluir el ID
        this.ref.close({ ...formValue, id: this.pastel!.id });
      } else {
        // Crear: sin ID
        this.ref.close(formValue);
      }
    } else {
      // Marcar todos los campos como tocados para mostrar errores
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
    if (field?.hasError('min')) return 'El precio debe ser mayor a 0';
    return '';
  }
}

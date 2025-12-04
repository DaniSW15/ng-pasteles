import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersStore } from '../../data-access/store/users.store';
import { CreateUserRequest } from '../../data-access/services/users.service';
import { User } from '@app/features/auth/data-access/models/auth.model';
import { DataTable, TableColumn } from '@app/shared/components/data-table/data-table';
import { LoadingSpinner } from '@app/shared/components/loading-spinner/loading-spinner';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DataTable,
    LoadingSpinner,
    ButtonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    TagModule
  ],
  templateUrl: './users-management.html',
  styleUrl: './users-management.scss',
})
export class UsersManagement implements OnInit {
  store = inject(UsersStore);
  private fb = inject(FormBuilder);

  showDialog = false;
  userForm!: FormGroup;

  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Empleado', value: 'Empleado' },
    { label: 'Cliente', value: 'Cliente' }
  ];

  columns: TableColumn[] = [
    { field: 'nombre', header: 'Nombre', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'rol', header: 'Rol', sortable: true },
    { field: 'fechaCreacion', header: 'Fecha Creación', sortable: true }
  ];

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['Empleado', [Validators.required]]
    });
  }

  loadUsers() {
    this.store.loadUsers({ page: 1, size: 10 });
  }

  openCreateDialog() {
    this.userForm.reset({ rol: 'Empleado' });
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.userForm.reset();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData: CreateUserRequest = this.userForm.value;
      this.store.createUser(userData);
      this.closeDialog();
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  onUserDelete(user: User) {
    if (confirm(`¿Estás seguro de eliminar al usuario ${user.nombre}?`)) {
      this.store.deleteUser(user.id);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.hasError('required')) return 'Este campo es requerido';
    if (field?.hasError('email')) return 'Email inválido';
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }
}

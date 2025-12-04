import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    AvatarModule
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  currentUser = this.authService.currentUser;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  loading = signal(false);
  editMode = signal(false);

  ngOnInit() {
    const user = this.currentUser();
    
    this.profileForm = this.fb.group({
      nombre: [{ value: user?.nombre || '', disabled: true }, [Validators.required, Validators.minLength(3)]],
      email: [{ value: user?.email || '', disabled: true }, [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  toggleEditMode() {
    this.editMode.update(v => !v);
    
    if (this.editMode()) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      // Restaurar valores originales
      const user = this.currentUser();
      this.profileForm.patchValue({
        nombre: user?.nombre,
        email: user?.email
      });
    }
  }

  onSaveProfile() {
    if (this.profileForm.valid) {
      this.loading.set(true);
      
      // TODO: Implementar actualización de perfil
      console.log('💾 Guardando perfil:', this.profileForm.value);
      
      setTimeout(() => {
        this.loading.set(false);
        this.editMode.set(false);
        this.profileForm.disable();
        
        this.messageService.add({
          severity: 'success',
          summary: 'Perfil actualizado',
          detail: 'Tus datos se guardaron correctamente'
        });
      }, 1000);
    }
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      
      if (newPassword !== confirmPassword) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Las contraseñas no coinciden'
        });
        return;
      }

      this.loading.set(true);
      
      // TODO: Implementar cambio de contraseña
      console.log('🔒 Cambiando contraseña...');
      
      setTimeout(() => {
        this.loading.set(false);
        this.passwordForm.reset();
        
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña actualizada',
          detail: 'Tu contraseña se cambió correctamente'
        });
      }, 1000);
    }
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.hasError('required')) return 'Este campo es requerido';
    if (field?.hasError('email')) return 'Email inválido';
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    return '';
  }

  getUserInitials(): string {
    const user = this.currentUser();
    if (!user) return 'U';
    
    const names = user.nombre.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return user.nombre.substring(0, 2);
  }

  getAvatarColor(): string {
    const user = this.currentUser();
    if (!user) return '#9c27b0';
    
    switch (user.rol) {
      case 'Admin': return '#f44336';
      case 'Empleado': return '#2196f3';
      case 'Cliente': return '#4caf50';
      default: return '#9c27b0';
    }
  }
}

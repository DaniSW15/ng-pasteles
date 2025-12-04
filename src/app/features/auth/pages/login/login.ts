import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../data-access/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals para el formulario
  email = signal('');
  password = signal('');
  // rememberMe = signal(false);
  loading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    console.log('🔵 [LOGIN] Iniciando submit...');
    console.log('📧 Email:', this.email());
    console.log('🔒 Password length:', this.password().length);
    console.log('✅ Form valid:', this.isFormValid());

    if (!this.email() || !this.password()) {
      console.log('❌ [LOGIN] Campos vacíos');
      this.errorMessage.set('Por favor completa todos los campos');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const credentials = {
      email: this.email(),
      password: this.password(),
    };

    console.log('📤 [LOGIN] Enviando credenciales:', credentials);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ [LOGIN] Login exitoso:', response);
        this.loading.set(false);
        console.log('🚀 [LOGIN] Navegando a /pasteles...');
        this.router.navigate(['/pasteles']);
      },
      error: (error) => {
        console.error('❌ [LOGIN] Error:', error);
        console.error('❌ [LOGIN] Error message:', error.message);
        this.errorMessage.set(error.message || 'Credenciales inválidas');
        this.loading.set(false);
      }
    });
  }

  // Validación de email
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email());
  }

  // Validación de password
  isPasswordValid(): boolean {
    return this.password().length >= 6;
  }

  // Formulario válido
  isFormValid(): boolean {
    return this.email().length > 0 &&
      this.password().length >= 6 &&
      this.isEmailValid();
  }
}

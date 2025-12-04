import { Injectable, inject, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '@app/core/services/api/api-service';
import { LoginRequest, RegisterRequest, AuthResponse, User, RefreshTokenRequest, isAdmin, isEmpleado } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = inject(ApiService);
    private router = inject(Router);
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'auth_user';
    private readonly refreshTokenKey = 'refresh_token';

    currentUser = signal<User | null>(null);
    isAuthenticated = signal(false);
    loading = signal(false);
    error = signal<string | null>(null);

    /**
     * Login de usuario
     * POST http://localhost:5095/api/Auth/login
     */
    login(credentials: LoginRequest): Observable<AuthResponse> {
        this.loading.set(true);
        this.error.set(null);

        return this.api.post<AuthResponse>('Auth/login', credentials)
            .pipe(
                tap({
                    next: (response) => {
                        console.log('✅ [AUTH SERVICE] Respuesta exitosa:', response);
                        this.handleAuthResponse(response);
                        this.loading.set(false);
                    },
                    error: (error) => {
                        this.error.set(error.error?.message || 'Credenciales inválidas');
                        this.loading.set(false);
                    }
                })
            )
    }

    /**
     * Registro de usuario
     * POST http://localhost:5095/api/Auth/register
     */
    register(data: RegisterRequest): Observable<AuthResponse> {
        this.loading.set(true);
        this.error.set(null);

        return this.api.post<AuthResponse>('Auth/register', data)
            .pipe(
                tap({
                    next: (response) => {
                        this.handleAuthResponse(response);
                        this.loading.set(false);
                    },
                    error: (error) => {
                        console.error('❌ [AUTH SERVICE] Error en registro:', error);
                        this.error.set(error.error?.message || 'Error al registrar');
                        this.loading.set(false);
                    }
                })
            )
    }

    /**
     * Obtener usuario actual (verificar sesión)
     * GET http://localhost:5095/api/Auth/me
     */
    me(): Observable<User> {
        return this.api.get<User>('Auth/me')
            .pipe(
                tap({
                    next: (user) => {
                        this.currentUser.set(user);
                        this.isAuthenticated.set(true);
                    },
                    error: (error) => {
                        console.error('❌ [AUTH SERVICE] Error al verificar sesión:', error);
                        this.logout();
                    }
                })
            );
    }

    /**
     * Logout de usuario (solo frontend)
     * Limpia localStorage y redirige a login
     */
    logout() {
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiration');

        // Limpiar estado
        this.currentUser.set(null);
        this.isAuthenticated.set(false);

        // Redirigir a login
        this.router.navigate(['/auth/login']);
    }

    /**
     * Obtener usuario actual
     */
    getCurrentUser(): User | null {
        const userJson = localStorage.getItem(this.USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    }

    /**
     * Obtener token
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    /**
     * Verificar si está autenticado (método helper)
     */
    isAuthenticatedSync(): boolean {
        return !!this.getToken();
    }

    /**
     * Inicializar sesión desde localStorage
     * Llamar al iniciar la app
     */
    initializeAuth(): void {
        const token = this.getToken();

        if (token) {
            // Verificar sesión con el backend
            this.me().subscribe({
                next: () => {
                    console.log('✅ [AUTH SERVICE] Sesión válida');
                },
                error: () => {
                    console.log('❌ [AUTH SERVICE] Sesión inválida, limpiando...');
                    this.clearStorage();
                }
            });
        } else {
            console.log('ℹ️ [AUTH SERVICE] No hay token, usuario no autenticado');
        }
    }

    /**
     * Guardar datos de autenticación
     */
    // saveAuthData(authResponse: AuthResponse): void {
    //     localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    //     localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    // }

    /**
     * Limpiar datos de autenticación
     */
    clearStorage(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    /**
     * Refrescar token
     */
    refreshToken(): Observable<AuthResponse> {
        // TODO: Implementar refresh token
        const token = this.getToken();
        const refreshToken = this.getRefreshToken();

        if (!token || !refreshToken) {
            this.logout();
            return throwError(() => new Error('No refresh token available'));
        }

        const request: RefreshTokenRequest = { token, refreshToken };

        return this.api.post<AuthResponse>('refresh', request)
            .pipe(
                tap({
                    next: (response) => this.handleAuthResponse(response),
                    error: () => this.logout()
                })
            );
    }

    /**
     * Verificar token
     */
    verifyToken(): Observable<boolean> {
        const token = this.getToken();
        if (!token) {
            return of(false);
        }

        // TODO: Verificar token con el backend
        // return this.api.post<boolean>('auth/verify', { token });

        return of(true);
    }

    private handleAuthResponse(response: AuthResponse) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('tokenExpiration', response.expiration);
        this.currentUser.set(response.usuario);
        this.isAuthenticated.set(true);
    }

    // Helpers usando type guards
    isAdmin = () => this.currentUser()?.rol === 'Admin';
    isEmpleado = () => {
        const rol = this.currentUser()?.rol;
        return rol === 'Admin' || rol === 'Empleado';
    };
}


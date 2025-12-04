/**
 * Usuario autenticado
 * Coincide con UsuarioDto del backend
 */
export interface User {
    id: string;
    nombre: string;
    email: string;
    rol: 'Admin' | 'Empleado' | 'Cliente';
    fechaCreacion: string;
}

/**
 * Request para login
 * Coincide con LoginDto del backend
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Request para registro público
 * Coincide con RegisterDto del backend
 * Nota: El rol siempre será "Cliente" en registro público
 */
export interface RegisterRequest {
    nombre: string;
    email: string;
    password: string;
    rol: string;
}

/**
 * Request para crear usuario (solo Admin)
 * Coincide con RegisterDto del backend
 */
export interface CreateUserRequest {
    nombre: string;
    email: string;
    password: string;
    rol: 'Admin' | 'Empleado' | 'Cliente';
}

/**
 * Respuesta de autenticación
 * Coincide con AuthResponseDto del backend
 */
export interface AuthResponse {
    token: string;
    refreshToken: string;
    expiration: string;
    usuario: User;
}

/**
 * Request para renovar token
 * Coincide con RefreshTokenDto del backend
 */
export interface RefreshTokenRequest {
    token: string;
    refreshToken: string;
}

/**
 * Estado interno del servicio de autenticación
 */
export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

/**
 * Type guards para verificar roles
 */
export const isAdmin = (user: User | null): boolean => {
    return user?.rol === 'Admin';
};

export const isEmpleado = (user: User | null): boolean => {
    return user?.rol === 'Admin' || user?.rol === 'Empleado';
};

export const isCliente = (user: User | null): boolean => {
    return user?.rol === 'Cliente';
};

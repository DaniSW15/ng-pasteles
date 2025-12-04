import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';

/**
 * Guard para verificar roles de usuario
 * Uso: canActivate: [roleGuard(['Admin', 'Empleado'])]
 */
export function roleGuard(allowedRoles: string[]): CanActivateFn {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        const user = authService.currentUser();

        if (!user) {
            console.log('❌ [ROLE GUARD] Usuario no autenticado');
            router.navigate(['/auth/login']);
            return false;
        }

        const hasRole = allowedRoles.includes(user.rol);

        if (!hasRole) {
            console.log(`❌ [ROLE GUARD] Usuario con rol "${user.rol}" no tiene acceso. Roles permitidos:`, allowedRoles);
            router.navigate(['/']);
            return false;
        }

        console.log(`✅ [ROLE GUARD] Usuario con rol "${user.rol}" tiene acceso`);
        return true;
    };
}

/**
 * Guard solo para Admin
 */
export const adminGuard: CanActivateFn = roleGuard(['Admin']);

/**
 * Guard para Admin y Empleado
 */
export const empleadoGuard: CanActivateFn = roleGuard(['Admin', 'Empleado']);

/**
 * Guard para todos los usuarios autenticados
 */
export const clienteGuard: CanActivateFn = roleGuard(['Admin', 'Empleado', 'Cliente']);

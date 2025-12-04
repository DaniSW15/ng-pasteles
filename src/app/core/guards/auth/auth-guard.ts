import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/features/auth/data-access/services';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticatedSync()) {
    router.navigate(['/auth/login']);
    return false;
  }

  return authService.me().pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};

/**
 * Guard para evitar que usuarios autenticados accedan a login/registro
 */
export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticatedSync()) {
    return true;
  }

  // Si está autenticado, redirigir a home
  router.navigate(['/pasteles']);
  return false;
};
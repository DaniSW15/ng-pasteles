import { Routes } from '@angular/router';
import { noAuthGuard } from '@app/core/guards/auth/auth-guard';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        canActivate: [noAuthGuard]
    },
    {
        path: 'registrar',
        loadComponent: () => import('./pages/registrar/registrar').then(m => m.Registrar),
        canActivate: [noAuthGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

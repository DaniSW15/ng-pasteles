import { Routes } from '@angular/router';

export const reportesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./feature/reportes-dashboard-page/reportes-dashboard-page').then(m => m.ReportesDashboardPage)  // Una sola página tipo dashboard
    }
];

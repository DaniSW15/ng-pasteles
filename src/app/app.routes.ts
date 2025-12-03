import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    component: MainLayout,
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'pasteles',
        pathMatch: 'full'
      },
      {
        path: 'reportes',
        loadChildren: () => import('./features/reportes/reportes.routing').then(m => m.reportesRoutes)
      },
      {
        path: 'pasteles',
        loadChildren: () => import('./features/pasteles/pasteles.routing').then(m => m.pastelesRoutes)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./features/clientes/clientes.routing').then(m => m.clientesRoutes)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./features/pedidos/pedidos.routing').then(m => m.pedidosRoutes)
      },
      {
        path: '**',
        redirectTo: '/pasteles'
      }
    ]
  }
];

import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth/auth-guard';
import { empleadoGuard, adminGuard, clienteGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Rutas de autenticación (sin layout)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routing').then(m => m.authRoutes)
  },

  // Rutas protegidas (con layout y guard)
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard], // Protege todas las rutas hijas
    children: [
      {
        path: '',
        redirectTo: 'pasteles',
        pathMatch: 'full'
      },
      // Catálogo de pasteles - Todos los usuarios autenticados
      {
        path: 'pasteles',
        canActivate: [clienteGuard],
        loadChildren: () => import('./features/pasteles/pasteles.routing').then(m => m.pastelesRoutes)
      },
      // Clientes - Solo Empleado y Admin
      {
        path: 'clientes',
        canActivate: [empleadoGuard],
        loadChildren: () => import('./features/clientes/clientes.routing').then(m => m.clientesRoutes)
      },
      // Pedidos - Todos los usuarios autenticados
      {
        path: 'pedidos',
        canActivate: [clienteGuard],
        loadChildren: () => import('./features/pedidos/pedidos.routing').then(m => m.pedidosRoutes)
      },
      // Reportes - Solo Admin
      {
        path: 'reportes',
        canActivate: [adminGuard],
        loadChildren: () => import('./features/reportes/reportes.routing').then(m => m.reportesRoutes)
      },
      // Administración - Solo Admin
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () => import('./features/admin/admin.routing').then(m => m.adminRoutes)
      }
    ]
  },

  // Ruta por defecto
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

import { Routes } from '@angular/router';
import { ClientesListPage } from './feature/clientes-list-page/clientes-list-page';
import { ClientesCreatePage } from './feature/clientes-create-page/clientes-create-page';
import { ClientesDetailPage } from './feature/clientes-detail-page/clientes-detail-page';

export const clientesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./feature/clientes-list-page/clientes-list-page').then(m => m.ClientesListPage)
            },
            {
                path: 'nuevo',
                loadComponent: () => import('./feature/clientes-create-page/clientes-create-page').then(m => m.ClientesCreatePage)
            },
            {
                path: ':id',
                loadComponent: () => import('./feature/clientes-detail-page/clientes-detail-page').then(m => m.ClientesDetailPage)
            }
        ]
    }
];

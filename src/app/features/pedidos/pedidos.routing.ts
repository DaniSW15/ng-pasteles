import { Routes } from '@angular/router';
import { PedidosListPage } from './feature/pedidos-list-page/pedidos-list-page';
import { PedidosCreatePage } from './feature/pedidos-create-page/pedidos-create-page';
import { PedidosDetailPage } from './feature/pedidos-detail-page/pedidos-detail-page';

export const pedidosRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./feature/pedidos-list-page/pedidos-list-page').then(m => m.PedidosListPage)  // Lista con filtros
            },
            {
                path: 'nuevo',
                loadComponent: () => import('./feature/pedidos-create-page/pedidos-create-page').then(m => m.PedidosCreatePage)
            },
            {
                path: ':id',
                loadComponent: () => import('./feature/pedidos-detail-page/pedidos-detail-page').then(m => m.PedidosDetailPage)
            }
        ]
    }
];

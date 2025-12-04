import { Routes } from '@angular/router';

export const pedidosRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./feature/pedidos-list-page/pedidos-list-page').then(m => m.PedidosListPage)
            },
            {
                path: 'nuevo',
                loadComponent: () => import('./feature/pedido-create-page/pedido-create-page').then(m => m.PedidoCreatePage)
            },
            {
                path: ':id',
                loadComponent: () => import('./feature/pedidos-detail-page/pedidos-detail-page').then(m => m.PedidosDetailPage)
            }
        ]
    }
];

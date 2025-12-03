import { Routes } from '@angular/router';

export const pastelesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/pasteles-list-page/pasteles-list-page').then(m => m.PastelesListPage),
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./feature/pasteles-create-page/pasteles-create-page').then(m => m.PastelesCreatePage)
  },
  {
    path: ':id',
    loadComponent: () => import('./feature/pasteles-detail-page/pasteles-detail-page').then(m => m.PastelesDetailPage)
  },
  {
    path: ':id/editar',
    loadComponent: () => import('./feature/pastel-detail-page/pastel-detail-page').then(m => m.PastelDetailPage)
  },
  {
    path: 'test',
    loadComponent: () => import('./feature/pasteles-list-page-v2/pasteles-list-page-v2').then(m => m.PastelesListPageV2)
  },
  {
    path: 'test-rx',
    loadComponent: () => import('./feature/pasteles-list-page-v3/pasteles-list-page-v3').then(m => m.PastelesListPageV3)
  }
];

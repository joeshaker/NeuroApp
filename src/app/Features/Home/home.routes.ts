import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./homecontainer/homecontainer/homecontainer').then(m => m.Homecontainer)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./homecontainer/homecontainer/homecontainer').then(m => m.Homecontainer)
  }
];
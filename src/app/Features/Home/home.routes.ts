import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./homecontainer/homecontainer/homecontainer').then(m => m.Homecontainer)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./homecontainer/homecontainer/homecontainer').then(m => m.Homecontainer)
  },
  {
    path: 'allcourses',
    loadComponent: () => import('./components/all-courses/all-courses').then(m => m.AllCourses)
  }
];
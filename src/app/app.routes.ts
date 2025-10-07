import { Route, Routes } from '@angular/router';
import { Homecontainer } from './Features/Home/homecontainer/homecontainer/homecontainer';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: Homecontainer
  },
  {
    path: 'auth',
    loadChildren: () => import('./Features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'login',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'instructor',
    component: SimpleLayout,
    loadChildren: () => import('./Features/Instructor/instructor.routes').then(m => m.routes),
    // data: { roles: ['instructor'] }
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

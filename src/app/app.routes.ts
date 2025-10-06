import { Routes } from '@angular/router';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';

export const routes: Routes = [
  // 🔹 Admin area as default (for testing)
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },

  // 🔹 Auth routes
  {
    path: 'auth',
    loadChildren: () =>
      import('./Features/Auth/auth.routes').then((m) => m.authRoutes),
  },

  // 🔹 Instructor area
  {
    path: 'instructor',
    component: SimpleLayout,
    loadChildren: () =>
      import('./Features/Instructor/instructor.routes').then((m) => m.routes),
    // canActivate: [AuthGuard],
    // data: { roles: ['instructor'] }
  },

  // 🔹 Admin area
  {
    path: 'admin',
    component: SimpleLayout,
    loadChildren: () =>
      import('./Features/Admin/admin.routes').then((m) => m.adminRoutes),
    // canActivate: [AuthGuard],
    // data: { roles: ['admin'] }
  },

  // 🔹 Wildcard fallback
  {
    path: '**',
    redirectTo: 'admin/dashboard'
  }
];

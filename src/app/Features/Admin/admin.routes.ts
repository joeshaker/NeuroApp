// admin.routes.ts
import { Routes } from '@angular/router';
import { AdminContainer } from './Components/admin-container/admin-container';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminContainer,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./Pages/dashboard/dashboard').then(m => m.AdminDashboard) },
      { path: 'analytics', loadComponent: () => import('./Pages/analytics/analytics').then(m => m.AdminAnalytics) },
      { path: 'courses', loadComponent: () => import('./Pages/courses/courses').then(m => m.AdminCourses) },
      { path: 'instructors', loadComponent: () => import('./Pages/instructors/instructors').then(m => m.AdminInstructors) },
      { path: 'categories', loadComponent: () => import('./Pages/categories/categories').then(m => m.AdminCategories) },
      { path: 'enrollments', loadComponent: () => import('./Pages/enrollments/enrollments').then(m => m.AdminEnrollments) },
      { path: 'content', loadComponent: () => import('./Pages/content/content').then(m => m.AdminContent) }
    ]
  }
];

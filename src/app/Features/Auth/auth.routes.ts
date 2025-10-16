import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('../auth/pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'otp-verification',
    loadComponent: () => import('../auth/pages/otp-verification/otp-verification.component').then(m => m.OtpVerificationComponent)
  },
  {
    path: 'registerinstructor',
    loadComponent: () => import('../auth/pages/registerinstructor/registerinstructor/registerinstructor').then(m => m.Registerinstructor)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

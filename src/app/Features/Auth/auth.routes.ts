import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../Auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('../Auth/pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'otp-verification',
    loadComponent: () => import('../Auth/pages/otp-verification/otp-verification.component').then(m => m.OtpVerificationComponent)
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

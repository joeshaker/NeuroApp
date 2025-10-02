import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./Features/Auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];

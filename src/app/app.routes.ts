import { Routes } from '@angular/router';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';

export const routes: Routes = [
    {
    path: '',
     component: SimpleLayout,
        loadChildren: () => import('./Features/Instructor/instructor.routes').then(m => m.routes),
        data: { roles: ['instructor'] }
    }
];

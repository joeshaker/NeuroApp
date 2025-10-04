import { Routes } from '@angular/router';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';
import { AddCourse } from './Features/Instructor/Components/add-course/add-course';
import { EditCourse } from './Features/Instructor/Components/edit-course/edit-course';

export const routes: Routes = [
  {path:'addCourse', component:AddCourse , pathMatch:'full'},
  {path:'editCourse/:id', component:EditCourse , pathMatch:'full'},
    {
    path: '',
     component: SimpleLayout,
        loadChildren: () => import('./Features/Instructor/instructor.routes').then(m => m.routes),
        data: { roles: ['instructor'] }
    }
];

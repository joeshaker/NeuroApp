import { Courses } from './Components/Courses/courses/courses';
import { Routes } from '@angular/router';
import { Instructorcontainer } from './InstructorContainer/instructorcontainer/instructorcontainer';

export const routes: Routes = [
  {
    path: '',
    component: Instructorcontainer,
    children: [
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./Components/Dashboard/insdashboard/insdashboard').then(m => m.Insdashboard) 
      },
      {
        path:'courses',
        loadComponent: () => import('./Components/Courses/courses/courses').then(m => m.Courses)
      }
    ]
  }
];

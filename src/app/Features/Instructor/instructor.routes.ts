import { CourseModule } from './Components/CrsModules/course-module/course-module';
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
  },
  {
    path: 'instructor',
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
      },
      {
        path:'module',
        loadComponent:()=>import('./Components/CrsModules/course-module/course-module').then(m=>m.CourseModule)
      },
      {
        path:'AddModule',
        loadComponent:()=>import('./Components/AddModule/addmodule/addmodule').then(m=>m.Addmodule)
      },
      {
        path:'Videos',
        loadComponent:()=>import('./Components/videos/videos/videos').then(m=>m.Videos)
      },
      {
        path:'AddVideo',
        loadComponent:()=>import('./Components/AddVideo/add-video/add-video').then(m=>m.AddVideo)
      }
    ]
  }
];

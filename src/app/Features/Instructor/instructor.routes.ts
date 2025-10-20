
import { CourseModule } from './Components/CrsModules/course-module/course-module';
import { Routes } from '@angular/router';
import { Courses } from './Components/Courses/courses/courses';
import { Instructorcontainer } from './InstructorContainer/instructorcontainer/instructorcontainer';
import { authGuard } from '../../Core/guards/auth-guard';

export const routes: Routes = [
  // {
  //   path: 'instructor',
  //   component: Instructorcontainer,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => import('./Components/Dashboard/insdashboard/insdashboard').then(m => m.Insdashboard)
  //     },
  //     {
  //       path:'courses',
  //       loadComponent: () => import('./Components/Courses/courses/courses').then(m => m.Courses)
  //     }
  //   ]
  // },
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
        loadComponent: () => import('./Components/Dashboard/insdashboard/insdashboard').then(m => m.InsdashboardComponent),
        canActivate: [authGuard],
        data: { roles: ['Instructor'] },
      },
      {
        path: 'courses',
        loadComponent: () => import('./Components/Courses/courses/courses').then(m => m.Courses)
      },
      {
        path: 'module',
        loadComponent: () => import('./Components/CrsModules/course-module/course-module').then(m => m.CourseModule)
      },
      {
        path: 'AddModule',
        loadComponent: () => import('./Components/AddModule/addmodule/addmodule').then(m => m.Addmodule)
      },
      {
        path: 'Videos',
        loadComponent: () => import('./Components/videos/videos/videos').then(m => m.Videos)
      },
      {
        path: 'AddVideo',
        loadComponent: () => import('./Components/AddVideo/add-video/add-video').then(m => m.AddVideo)
      },
      {
        path: 'AddCourse',
        loadComponent: () => import('./Components/add-course/add-course').then(m => m.AddCourse)
      },
      {
        path: 'EditModule/:id',
        loadComponent: () => import('./Components/EditModule/editmodule/editmodule')
          .then(m => m.Editmodule)
      },
      {
        path:'ViewCourseDetails/:id',
        loadComponent:()=> import('./Components/course-details/course-details').then(m => m.CourseDetails)
      },
      {
        path:'EditCourse/:id',
        loadComponent:()=> import('./Components/edit-course/edit-course').then(m => m.EditCourse)
      }
    ]
  }
];

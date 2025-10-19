import { AdminContent } from './Features/Admin/Pages/content/content';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';
import { EditCourse } from './Features/Instructor/Components/edit-course/edit-course';
import { ViewCourse } from './Features/Instructor/Components/view-course/view-course';
import { authGuard } from './Core/guards/auth-guard';
import { AllCourses } from './Features/Home/all-courses/all-courses';
import { LoginComponent } from './Features/auth/pages/login/login.component';
import { StudentCourseDetails } from './Features/Home/student-course-details/student-course-details';
export const routes: Routes = [
  // 🏠 Default route → Home page
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },


  // 🔹 Auth routes (no guard)
  {
    path: 'auth',
    loadChildren: () =>
      import('./Features/auth/auth.routes').then(m => m.authRoutes),
  },

  // 🔹 Unauthorized page
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./Shared/components/unauthorized/unauthorized.component')
        .then(m => m.UnauthorizedComponent),
  },

  // 🔹 Admin area
  {
    path: 'admin',
    component: SimpleLayout,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    loadChildren: () =>
      import('./Features/Admin/admin.routes').then(m => m.adminRoutes),
  },

  // 🔹 Instructor area
  {
    path: 'instructor',
    component: SimpleLayout,
    // canActivate: [authGuard],
    // data: { roles: ['Instructor'] },
    loadChildren: () =>
      import('./Features/Instructor/instructor.routes').then(m => m.routes),
  },

  // 🔹 Home area (Student, Instructor, Admin)
  {
    path: 'home',
    // canActivate: [authGuard],
    // data: { roles: ['Student', 'Instructor', 'Admin'] },
    loadChildren: () =>
      import('./Features/Home/home.routes').then(m => m.homeRoutes),
  },

  // 🔹 Edit/View Course (Instructor or Admin)
  {
    path: 'editCourse/:id',
    component: EditCourse,
    canActivate: [authGuard],
    data: { roles: ['Instructor', 'Admin'] },
    pathMatch: 'full'
  },
  {
    path: 'ViewCourse',
    component: ViewCourse,
    canActivate: [authGuard],
    data: { roles: ['Student', 'Instructor', 'Admin'] },
    pathMatch: 'full'
  },
  {
    path: 'CourseDetails/:id',
    component: StudentCourseDetails,
    pathMatch: 'full'
  },


  {
    path: 'AllCourses',
    component: AllCourses,
    // canActivate: [authGuard],
    // data: { roles: ['Student', 'Instructor', 'Admin'] },
    pathMatch: 'full'
  },
  {
    path: 'Login',
    component: LoginComponent

  },

  // 🔹 Fallback
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

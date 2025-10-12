import { Route, Routes } from '@angular/router';
import { Homecontainer } from './Features/Home/homecontainer/homecontainer/homecontainer';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';
import { EditCourse } from './Features/Instructor/Components/edit-course/edit-course';
import { ViewCourse } from './Features/Instructor/Components/view-course/view-course';
import { authGuard } from './Core/guards/auth-guard';

export const routes: Routes = [
  // 🔹 Default redirect to login (users should authenticate first)
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // 🔹 Auth routes (no guard needed)
  {
    path: 'auth',
    loadChildren: () =>
      import('./Features/Auth/auth.routes').then((m) => m.authRoutes),
  },

  // 🔹 Unauthorized page (no guard needed)
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./Shared/components/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
  },

  // 🔹 Admin area - Only Admin role
  {
    path: 'admin',
    component: SimpleLayout,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    loadChildren: () =>
      import('./Features/Admin/admin.routes').then((m) => m.adminRoutes),
  },

  // 🔹 Instructor area - Only Instructor role
  {
    path: 'instructor',
    component: SimpleLayout,
    canActivate: [authGuard],
    data: { roles: ['Instructor'] },
    loadChildren: () =>
      import('./Features/Instructor/instructor.routes').then((m) => m.routes),
  },

  // 🔹 Home area - Student, Instructor, and Admin roles
  {
    path: 'home',
    canActivate: [authGuard],
    data: { roles: ['Student', 'Instructor', 'Admin'] },
    loadChildren: () =>
      import('./Features/Home/home.routes').then((m) => m.homeRoutes),
  },

  // 🔹 Course routes - Protected
  {
    path: 'courses',
    canActivate: [authGuard],
    data: { roles: ['Student', 'Instructor', 'Admin'] },
    loadChildren: () =>
      import('./Features/Admin/Pages/course-details/course-details').then((m) => m.CourseDetailsComponent),
  },

  // 🔹 Legacy course routes - Protected
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

  // 🔹 Wildcard fallback
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];


// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'Home',
//     pathMatch: 'full'
//   },
//   {
//     path: 'Home',
//     component: Homecontainer
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./Features/auth/auth.routes').then(m => m.authRoutes)
//   },
//   {
//     path: 'login',
//     redirectTo: 'auth/login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'instructor',
//     component: SimpleLayout,
//     loadChildren: () => import('./Features/Instructor/instructor.routes').then(m => m.routes),
//     // data: { roles: ['instructor'] }
//   },
//   {
//     path: '**',
//     redirectTo: 'auth/login'
//   }

// import { AddCourse } from './Features/Instructor/Components/add-course/add-course';
// import { Instructorcontainer } from './Features/Instructor/InstructorContainer/instructorcontainer/instructorcontainer';
// import { EditCourse } from './Features/Instructor/Components/edit-course/edit-course';

// export const routes: Routes = [
//   // {path:'addCourse', component:AddCourse , pathMatch:'full'},
//     {
//         path: 'auth',
//         loadChildren: () => import('./Features/Auth/auth.routes').then(m => m.authRoutes)
//     },
//     {
//         path: '',
//         redirectTo: 'auth/login',
//         pathMatch: 'full'
//     },
//     {
//         path: '**',
//         redirectTo: 'auth/login'
//     },
//   {path:'editCourse/:id', component:EditCourse , pathMatch:'full'},
//     {
//         path: '',
//         component: SimpleLayout,
//         loadChildren: () => import('./Features/Instructor/instructor.routes').then(m => m.routes),
//         // data: { roles: ['instructor'] }
//     },
// ];

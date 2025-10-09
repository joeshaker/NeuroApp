import { Route, Routes } from '@angular/router';
import { Homecontainer } from './Features/Home/homecontainer/homecontainer/homecontainer';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';

export const routes: Routes = [
  // 🔹 Admin area as default (for testing)
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },

  // 🔹 Course routes
  {
    path: 'courses',
    loadChildren: () =>
      import('./Features/Admin/Pages/course-details/course-details').then((m) => m.CourseDetailsComponent),
  },

  // 🔹 Auth routes
  {
    path: 'auth',
    loadChildren: () =>
      import('./Features/Auth/auth.routes').then((m) => m.authRoutes),
  },

  // 🔹 Instructor area
  {
    path: 'instructor',
    component: SimpleLayout,
    loadChildren: () =>
      import('./Features/Instructor/instructor.routes').then((m) => m.routes),
    // canActivate: [AuthGuard],
    // data: { roles: ['instructor'] }
  },

  // 🔹 Admin area
  {
    path: 'admin',
    component: SimpleLayout,
    loadChildren: () =>
      import('./Features/Admin/admin.routes').then((m) => m.adminRoutes),
    // canActivate: [AuthGuard],
    // data: { roles: ['admin'] }
  },

  // 🔹 Wildcard fallback
  {
    path: '**',
    redirectTo: 'admin/dashboard'
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

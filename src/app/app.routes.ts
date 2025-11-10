import { Routes } from '@angular/router';
import { SimpleLayout } from './Shared/layouts/simple-Layout/simple-layout/simple-layout';
import { EditCourse } from './Features/Instructor/Components/edit-course/edit-course';
import { authGuard } from './Core/guards/auth-guard';
import { AllCourses } from './Features/Home/all-courses/all-courses';
import { LoginComponent } from './Features/auth/pages/login/login.component';
import { StudentCourseDetails } from './Features/Home/student-course-details/student-course-details';
import { CourseDetails } from './Features/Instructor/Components/course-details/course-details';
import { MyLearningComponent } from './Features/Home/my-learning/my-learning.component';

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

  // 🔹 My Learning (Student only)
  {
    path: 'my-learning',
    component: MyLearningComponent,
    canActivate: [authGuard],
    data: { roles: ['Student'] },
    pathMatch: 'full'
  },
  {
    path:'profile',
    loadComponent: () => import('./Features/Profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [authGuard],
    data: { roles: ['Student', 'Instructor', 'Admin'] },
    pathMatch: 'full'
  },

  // 🔹 Course details (for Students)
  {
    path: 'CourseDetails/:id',
    component: StudentCourseDetails,
    pathMatch: 'full'
  },

  // 🔹 All Courses
  {
    path: 'AllCourses',
    component: AllCourses,
    // canActivate: [authGuard],
    // data: { roles: ['Student', 'Instructor', 'Admin'] },
    pathMatch: 'full'
  },

  // 🔹 Login
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

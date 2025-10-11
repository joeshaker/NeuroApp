// Student Interfaces (handled through Auth system)
export interface IStudent {
  id: string;
  name: string;
  email: string;
  enrolledCourses?: number;
  joinDate?: Date;
}

// Course Interfaces
export interface ICourse {
  id?: number;
  title: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  isFree: boolean;
  instructorId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  instructorName?: string;
  categoryName?: string;
  enrollmentsCount?: number;
}

export interface ICourseCreate {
  title: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  isFree: boolean;
  instructorId: number;
  categoryId: number;
}

export interface ICourseUpdate {
  id?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  price?: number;
  isFree?: boolean;
  categoryId?: number;
}

// Instructor Interfaces
export interface IInstructor {
  id: number;
  userId: string;
  expertise: string;
  bio: string;
  isVerified: boolean;
  createdAt?: Date;
  coursesCount?: number;
  studentCount?: number;
}

export interface IInstructorRegister {
  email: string;
  password: string;
  name: string;
  expertise: string;
  bio: string;
}

// Enrollment Interfaces
export interface IEnrollment {
  enrollmentId: number;
  studentId: string;
  courseId: number;
  enrollmentDate: Date;
  status: 'Active' | 'Completed' | 'Cancelled';
  progress?: number;
  courseName?: string;
  studentName?: string;
  instructorId?: number;
}

export interface IEnrollmentCreate {
  studentId: string;
  courseId: number;
}

export interface IEnrollmentUpdate {
  enrollmentId: number;
  status?: string;
}

// Module Interfaces
export interface IModule {
  moduleId: number;
  courseId: number;
  moduleName: string;
  moduleDescription: string;
  moduleOrder: number;
  videosCount?: number;
}

export interface IModuleCreate {
  courseId: number;
  moduleName: string;
  moduleDescription: string;
  moduleOrder: number;
}

export interface IModuleUpdate {
  moduleId: number;
  moduleName?: string;
  moduleDescription?: string;
  moduleOrder?: number;
}

// Video Interfaces
export interface IVideo {
  id: number;
  moduleId: number;
  title: string;
  videoUrl: string;
  duration?: number;
  videoOrder: number;
  moduleName?: string;
}

export interface IVideoUpload {
  moduleId: number;
  title: string;
  videoUrl: string;
  duration?: number;
  videoOrder: number;
}

export interface IVideoUpdate {
  id: number;
  title?: string;
  videoUrl?: string;
  duration?: number;
  videoOrder?: number;
}

// Category Interfaces
export interface ICategory {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  coursesCount?: number;
  createdAt?: Date;
}

export interface ICategoryCreate {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ICategoryUpdate {
  id: number;
  name?: string;
  description?: string;
  isActive?: boolean;
}

// Analytics Interfaces
export interface IAnalytics {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalInstructors: number;
  activeStudents: number;
  pendingInstructors: number;
  totalCategories: number;
  recentEnrollments: IEnrollment[];
  enrollmentsByMonth: IEnrollmentData[];
  coursesByCategory: ICategoryData[];
  topInstructors?: IInstructor[];
}

export interface IEnrollmentData {
  month: string;
  enrollments: number;
  completions: number;
}

export interface ICategoryData {
  categoryName: string;
  coursesCount: number;
}

export interface IDashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalInstructors: number;
  activeStudents: number;
  pendingInstructors: number;
  totalCategories: number;
}

// Pagination
export interface IPaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

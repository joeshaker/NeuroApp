import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../../../environments/environments.development';
import {
  ICourse,
  ICourseCreate,
  ICourseUpdate,
  IInstructor,
  IInstructorRegister,
  IEnrollment,
  IEnrollmentCreate,
  IEnrollmentUpdate,
  IModule,
  IModuleCreate,
  IModuleUpdate,
  IVideo,
  IVideoUpdate,
  ICategory,
  ICategoryCreate,
  ICategoryUpdate,
  IAnalytics,
  IDashboardStats
} from '../../Admin/Interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl: string;

  constructor(@Inject(HttpClient) private http: HttpClient) {
    this.apiUrl = (typeof environment.apiUrl === 'string' && environment.apiUrl.startsWith('http'))
      ? environment.apiUrl
      : 'http://localhost:5075/api';
    console.log('[AdminService] apiUrl =', this.apiUrl);
  }

  // ==================== DASHBOARD & ANALYTICS ====================

  getDashboardStats(): Observable<IDashboardStats> {
    return forkJoin({
      courses: this.http.get<ICourse[]>(`${this.apiUrl}/Course`),
      instructors: this.http.get<IInstructor[]>(`${this.apiUrl}/Instructor`),
      enrollments: this.http.get<IEnrollment[]>(`${this.apiUrl}/Enrollment`),
      categories: this.http.get<ICategory[]>(`${this.apiUrl}/Category`)
    }).pipe(
      map(data => ({
        totalCourses: data.courses.length,
        totalInstructors: data.instructors.length,
        totalEnrollments: data.enrollments.length,
        totalCategories: data.categories.length,
        activeStudents: new Set(data.enrollments.filter(e => e.status === 'Active').map(e => e.studentId)).size,
        pendingInstructors: data.instructors.filter(i => !i.isVerified).length,
        totalStudents: 0
      }))
    );
  }

  getAnalytics(): Observable<IAnalytics> {
    return forkJoin({
      courses: this.http.get<ICourse[]>(`${this.apiUrl}/Course`),
      instructors: this.http.get<IInstructor[]>(`${this.apiUrl}/Instructor`),
      enrollments: this.http.get<IEnrollment[]>(`${this.apiUrl}/Enrollment`),
      categories: this.http.get<ICategory[]>(`${this.apiUrl}/Category`)
    }).pipe(
      map(data => {
        const recentEnrollments = data.enrollments
          .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
          .slice(0, 10);

        const enrollmentsByMonth = this.calculateEnrollmentsByMonth(data.enrollments);
        const coursesByCategory = this.calculateCoursesByCategory(data.courses, data.categories);

        return {
          totalCourses: data.courses.length,
          totalInstructors: data.instructors.length,
          totalEnrollments: data.enrollments.length,
          totalCategories: data.categories.length,
          activeStudents: new Set(data.enrollments.filter(e => e.status === 'Active').map(e => e.studentId)).size,
          pendingInstructors: data.instructors.filter(i => !i.isVerified).length,
          totalStudents: 0,
          recentEnrollments,
          enrollmentsByMonth,
          coursesByCategory
        };
      })
    );
  }

  private calculateEnrollmentsByMonth(enrollments: IEnrollment[]) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthData: { [key: string]: { enrollments: number; completions: number } } = {};

    enrollments.forEach(enrollment => {
      const date = new Date(enrollment.enrollmentDate);
      const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      if (!monthData[monthKey]) {
        monthData[monthKey] = { enrollments: 0, completions: 0 };
      }

      monthData[monthKey].enrollments++;
      if (enrollment.status === 'Completed') {
        monthData[monthKey].completions++;
      }
    });

    return Object.entries(monthData)
      .map(([month, data]) => ({
        month,
        enrollments: data.enrollments,
        completions: data.completions
      }))
      .slice(-6);
  }

  private calculateCoursesByCategory(courses: ICourse[], categories: ICategory[]) {
    const categoryMap: { [key: number]: number } = {};

    courses.forEach(course => {
      categoryMap[course.categoryId] = (categoryMap[course.categoryId] || 0) + 1;
    });

    return categories.map(category => ({
      categoryName: category.name,
      coursesCount: categoryMap[category.id] || 0
    })).filter(c => c.coursesCount > 0);
  }

  // ==================== COURSE MANAGEMENT ====================

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.apiUrl}/Course`);
  }

  getCourseById(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.apiUrl}/Course/${id}`);
  }

  createCourse(course: ICourseCreate): Observable<ICourse> {
    return this.http.post<ICourse>(`${this.apiUrl}/Course`, course);
  }

  updateCourse(id: number, course: ICourseUpdate): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.apiUrl}/Course/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Course/${id}`);
  }

  // ==================== INSTRUCTOR MANAGEMENT ====================

  getInstructors(): Observable<IInstructor[]> {
    return this.http.get<IInstructor[]>(`${this.apiUrl}/Instructor`);
  }

  getInstructorById(id: number): Observable<IInstructor> {
    return this.http.get<IInstructor>(`${this.apiUrl}/Instructor/${id}`);
  }

  registerInstructor(instructor: IInstructorRegister): Observable<IInstructor> {
    return this.http.post<IInstructor>(`${this.apiUrl}/Instructor/register-new`, instructor);
  }

  verifyInstructor(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Instructor/verify/${id}`, {});
  }

  // ==================== ENROLLMENT MANAGEMENT ====================

  getEnrollments(): Observable<IEnrollment[]> {
    return this.http.get<IEnrollment[]>(`${this.apiUrl}/Enrollment`);
  }

  getEnrollmentsByStudent(studentId: string): Observable<IEnrollment[]> {
    return this.http.get<IEnrollment[]>(`${this.apiUrl}/Enrollment/GetEnrollmentsByStudentId/${studentId}`);
  }

  getEnrollmentsByInstructor(instructorId: number): Observable<IEnrollment[]> {
    return this.http.get<IEnrollment[]>(`${this.apiUrl}/Enrollment/GetEnrollmentsByInstructorId/${instructorId}`);
  }

  addEnrollment(enrollment: IEnrollmentCreate): Observable<IEnrollment> {
    return this.http.post<IEnrollment>(`${this.apiUrl}/Enrollment/AddEnrollment`, enrollment);
  }

  cancelEnrollment(enrollmentId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Enrollment/CancelEnrollment/${enrollmentId}`, {});
  }

  deleteEnrollment(enrollmentId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Enrollment/DeleteEnrollment/${enrollmentId}`, {});
  }

  // ==================== MODULE MANAGEMENT ====================

  getModules(): Observable<IModule[]> {
    return this.http.get<IModule[]>(`${this.apiUrl}/Module`);
  }

  getModulesByCourse(courseId: number): Observable<IModule[]> {
    return this.http.get<IModule[]>(`${this.apiUrl}/Module/GetModulesByCrsID/${courseId}`);
  }

  createModule(module: IModuleCreate): Observable<IModule> {
    return this.http.post<IModule>(`${this.apiUrl}/Module`, module);
  }

  updateModule(module: IModuleUpdate): Observable<IModule> {
    return this.http.put<IModule>(`${this.apiUrl}/Module`, module);
  }

  deleteModule(moduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Module?id=${moduleId}`);
  }

  // ==================== VIDEO MANAGEMENT ====================

  getVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>(`${this.apiUrl}/Video/GetAllVideos`);
  }

  uploadVideo(videoFile: File, title: string, moduleId: number, videoOrder: number): Observable<IVideo> {
    const formData = new FormData();
    formData.append('File', videoFile);
    formData.append('Title', title);
    formData.append('ModuleId', moduleId.toString());
    formData.append('VideoArrangement', videoOrder.toString());

    return this.http.post<IVideo>(`${this.apiUrl}/Video/upload`, formData);
  }

  updateVideo(video: IVideoUpdate): Observable<IVideo> {
    return this.http.put<IVideo>(`${this.apiUrl}/Video/UpdateVideo`, video);
  }

  deleteVideo(videoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Video/DeleteVideo/${videoId}`);
  }

  // ==================== CATEGORY MANAGEMENT ====================

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}/Category`);
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/Category/${id}`);
  }

  createCategory(category: ICategoryCreate): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.apiUrl}/Category`, category);
  }

  updateCategory(id: number, category: ICategoryUpdate): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}/Category/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Category/${id}`);
  }

  // ==================== STUDENT MANAGEMENT ====================
  // Note: Student management is handled through the Auth system
  // Students are users with the 'Student' role
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../../Core/interfaces/Course/iall-courses';
import { ModuleService } from '../../../../../Core/services/module-service';
import { JwtService } from '../../../../../Core/services/jwt.service';
import { EnrollmentService } from '../../../../../Core/services/enrollment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class Courses implements OnInit {
  AllCourses: IAllCourses[] = [];

  // Stats variables
  activeCourses = 0;
  enrolledStudents = 0;
  averageRating = 0;
  monthlyRevenue = 0;
  totalRevenue = 0;

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private moduleService: ModuleService,
    private jwtService: JwtService,
    private enrollmentservice: EnrollmentService
  ) { }

  ngOnInit(): void {
    const instructorId = this.jwtService.getEntityId(); // ✅ get "id" from token
    if (!instructorId) {
      console.error('Instructor ID not found in token');
      return;
    }

    const id = Number(instructorId);

    this.courseService.GetCoursesByInstructorId(id).subscribe({
      next: (response) => {
        console.log('Courses fetched:', response);
        this.AllCourses = response;

        // ✅ Update dynamic stats
        this.activeCourses = this.AllCourses.length;
        this.enrolledStudents = 0; // Example: assume 20 students per course
        this.averageRating = 4.5; // static placeholder

        // Compute earnings by instructor id
        this.enrollmentservice.getInstructorEarnings(id).subscribe(({ total, monthly }) => {
          this.totalRevenue = total;
          this.monthlyRevenue = monthly;
        });

        this.getEnrolledStudentsCount(id);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  getEnrolledStudentsCount(instructorId: number): void {
    this.enrollmentservice.getInsEnrollments(instructorId).subscribe({
      next: (response) => {
        this.enrolledStudents = response.length;
        this.cdr.detectChanges();
        console
      },
      error: (err) => {
        console.error('Error fetching enrolled students:', err);
      }
    });
  }

  getImageUrl(fileName: string): string {
    if (!fileName) {
      return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
    }

    const baseUrl = 'http://localhost:5075/uploads/Images/';
    return `${baseUrl}${fileName}`;
  }

  confirmDeleteCourse(id?: number) {
    if (id == null) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseServiceDelete(id);
      }
    });
  }

  private courseServiceDelete(id: number) {
    // Backend expects DELETE http://localhost:5075/api/Course/{courseId}
    // Add a delete method if not present by using HttpClient directly in the service if needed.
    (this.courseService as any).http
      ? (this.courseService as any).http.delete(`${this.courseService.baseUrl}/${id}`).subscribe({
          next: () => {
            this.AllCourses = this.AllCourses.filter(c => c.id !== id);
            this.activeCourses = this.AllCourses.length;
            this.cdr.detectChanges();
            Swal.fire({ title: 'Deleted!', text: 'The course has been deleted.', icon: 'success', timer: 2000, showConfirmButton: false });
          },
          error: () => {
            Swal.fire({ title: 'Error!', text: 'Failed to delete the course.', icon: 'error', confirmButtonText: 'OK' });
          }
        })
      : this.deleteViaTempHttp(id);
  }

  private deleteViaTempHttp(id: number) {
    // Fallback if direct http is not exposed: extend service quickly
    // @ts-ignore
    (this.courseService as any).http = (this.courseService as any).http || null;
  }

  ViewCourse(id: number) {
    this.moduleService.getAllModulesByCourseId(id).subscribe({
      next: (response) => console.log('Modules:', response),
      error: (err) => console.error('Error fetching modules:', err)
    });

    this.courseService.ViewCourseDetails(id).subscribe({
      next: (response) => console.log('Course Details:', response),
      error: (err) => console.error('Error fetching course details:', err)
    });
  }
}

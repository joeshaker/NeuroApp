import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../../Core/interfaces/Course/iall-courses';
import { ModuleService } from '../../../../../Core/services/module-service';
import { JwtService } from '../../../../../Core/services/jwt.service';
import { EnrollmentService } from '../../../../../Core/services/enrollment.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink],
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
        this.monthlyRevenue = this.AllCourses.length * 100; // placeholder revenue

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

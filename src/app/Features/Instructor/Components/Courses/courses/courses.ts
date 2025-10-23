import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../../Core/interfaces/Course/iall-courses';
import { ModuleService } from '../../../../../Core/services/module-service';
import { JwtService } from '../../../../../Core/services/jwt.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {
  AllCourses: IAllCourses[] = [];

  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private moduleService: ModuleService,
    private jwtService: JwtService
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
        console.log('Courses:', response);
        this.AllCourses = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  getImageUrl(fileName: string): string {
    if (!fileName) {
      return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
    }

    // 👇 change this to your backend base URL
    const baseUrl = 'https://82-29-190-91.sslip.io:5001/uploads/Images/';
    console.log(fileName)
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

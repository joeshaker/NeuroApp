import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.css']
})
export class CourseDetailsComponent implements OnInit {

  courseId!: number;
  course!: IAllCourses;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // نجيب id من ال URL
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.courseId) {
      this.courseService.GetCourseById(this.courseId).subscribe({
        next: (data) => {
          this.course = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.errorMessage = 'Failed to load course details.';
          this.isLoading = false;
          console.error(error);
        }
      });
    }
  }

}

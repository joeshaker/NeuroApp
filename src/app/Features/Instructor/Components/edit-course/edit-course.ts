import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { ActivatedRoute } from '@angular/router';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';

@Component({
  selector: 'app-edit-course',
  imports: [],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css'
})
export class EditCourse implements OnInit {

  constructor(private service: CourseService , private route: ActivatedRoute) { }
  id: number = 0;
  CourseData!: IAllCourses;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.service.GetCourseById(this.id).subscribe({
      next: (response) => {
        this.CourseData = response;

      }
    })





  }



}

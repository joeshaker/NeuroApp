import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../../Core/interfaces/Course/iall-courses';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {

  AllCourses: IAllCourses[] = [];
  constructor(private service: CourseService) { }

  ngOnInit(): void {
    this.service.GetAllCourses().subscribe({
      next: (response) => {
        console.log(response);
        this.AllCourses = response;


      }
    })
  }



}

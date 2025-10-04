import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../Core/services/Course/course-service';

@Component({
  selector: 'app-edit-course',
  imports: [],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css'
})
export class EditCourse implements OnInit {

  constructor(private service: CourseService) { }
  id: number = 0;

  ngOnInit(): void {


  }



}

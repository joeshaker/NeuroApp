import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../Core/interfaces/Course/iall-courses';

@Component({
  selector: 'app-all-courses',
  imports: [],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.css'
})
export class AllCourses implements OnInit{
  constructor(private service: CourseService  , private cdr :ChangeDetectorRef ) { }

  allCourses: IAllCourses[] = [];

  ngOnInit(): void {
    this.service.GetAllCourses().subscribe({
      next: (response) => {

        this.allCourses = response;
        this.cdr.detectChanges();
        console.log(this.allCourses);

      }
    })
  }

}

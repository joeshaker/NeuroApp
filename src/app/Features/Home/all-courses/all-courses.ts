import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../Core/interfaces/Course/iall-courses';
import { Router, RouterLink } from '@angular/router';
import { InstructorService } from '../../../Core/services/Instructor/instructorservice';

@Component({
  selector: 'app-all-courses',
  imports: [RouterLink],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.css'
})
export class AllCourses implements OnInit{
  constructor(private service: CourseService  , private cdr :ChangeDetectorRef   , private route : Router ) { }

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


  showCourseDetails(id: number) {
        this.route.navigate(['/CourseDetails', id]);
      }
  }







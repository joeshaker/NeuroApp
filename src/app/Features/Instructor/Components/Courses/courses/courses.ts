import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../../Core/interfaces/Course/iall-courses';
import { RouterLink } from '@angular/router';
import { ModuleService } from '../../../../../Core/services/module-service';
@Component({
  selector: 'app-courses',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {

  AllCourses: IAllCourses[] = [];
  constructor(private service: CourseService,private cdr: ChangeDetectorRef  , private moduleService : ModuleService) { }

  ngOnInit(): void {
    this.service.GetAllCourses().subscribe({
      next: (response) => {
        console.log(response);
        this.AllCourses = response;
        this.cdr.detectChanges();


      }
    })
  }



  ViewCourse(id: number) {

     this.moduleService.getAllModulesByCourseId(id).subscribe({
      next: (response) => {
        console.log(response);
      }
    })


    this.service.ViewCourseDetails(id).subscribe({
      next: (response) => {
        console.log(response);
      }
    })



  }


}

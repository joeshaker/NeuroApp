import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar/navbar";
import { Hero } from "../../components/HeroSection/hero/hero";
import { Features } from "../../components/Features/features/features";
import { CourseService } from '../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';

@Component({
  selector: 'app-homecontainer',
  imports: [Navbar, Hero, Features],
  templateUrl: './homecontainer.html',
  styleUrl: './homecontainer.css'
})
export class Homecontainer implements OnInit {
  constructor(private service: CourseService  , private cdr:ChangeDetectorRef) { }

  FilterCoursesByCategory: IAllCourses[] = [];
  FilterCoursesByAiCategory: IAllCourses[] = [];

  ngOnInit(): void {
    this.service.GetCourseByCategoryName("C Languages").subscribe({
      next: (response) => {

        this.FilterCoursesByCategory = response.slice(0, 7);

        this.cdr.detectChanges();

      }
    })



    this.service.GetCourseByCategoryName("C Languages").subscribe({
      next: (response) => {

        this.FilterCoursesByAiCategory = response.slice(0, 7);
        this.cdr.detectChanges();
      }
    })
  }

}

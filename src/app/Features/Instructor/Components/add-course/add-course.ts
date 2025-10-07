import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../Core/services/Category/category-service';
import { IAllCategories } from '../../../../Core/interfaces/Category/iall-categories';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { IAddCourse } from '../../../../Core/interfaces/Course/iadd-course';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse implements OnInit {

  AllCategories: IAllCategories[] = [];

  constructor(private service: CategoryService , private cdr:ChangeDetectorRef , private courseService : CourseService) {}

  ngOnInit(): void {
   this.service.GetAllCategories().subscribe({
      next: (response) => {
       console.log(response);
       this.cdr.detectChanges();
       this.AllCategories = response;
       console.log(this.AddCourseForm);


      }

    })
  }


  AddCourseForm = new FormGroup(
    {
      title: new FormControl(),
      description: new FormControl(),
      categoryId: new FormControl(),
      thumbnailUrl: new FormControl(),
      price: new FormControl(),
      isFree: new FormControl(),
      instructorId: new FormControl(2),
        }
  )




  SaveCourse() {
    this.courseService.AddCourse(this.AddCourseForm.value as IAddCourse).subscribe({

      next: (response:any) => {

        console.log(this.AddCourseForm.value);

        console.log(response);
      }

    })




  }


}

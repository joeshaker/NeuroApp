import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../Core/services/Category/category-service';
import { IAllCategories } from '../../../../Core/interfaces/Category/iall-categories';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { IAddCourse } from '../../../../Core/interfaces/Course/iadd-course';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse implements OnInit {

   iconSuccess : any = document.querySelector('#type-success');



  AllCategories: IAllCategories[] = [];

  constructor(private service: CategoryService , private cdr:ChangeDetectorRef , private courseService : CourseService , private route:Router) {}

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
       Swal.fire({
        title: 'Good Job!',
        text: 'Course added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['instructor/courses']);
        }
      });
    },
    error: (err : any) => {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while adding the course. Make Sure that u add All correct Fields',
        icon: 'error'
      });
    }
  });
      }





  }



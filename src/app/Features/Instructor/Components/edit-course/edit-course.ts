import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';
import { CategoryService } from '../../../../Core/services/Category/category-service';
import { IAllCategories } from '../../../../Core/interfaces/Category/iall-categories';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAddCourse } from '../../../../Core/interfaces/Course/iadd-course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css'
})
export class EditCourse implements OnInit {

  constructor(private service: CourseService , private route: ActivatedRoute , private cdr: ChangeDetectorRef , private allCategories:CategoryService , private routeTo :Router ) { }
  id: number = 0;
  CourseData!: IAllCourses;
  AllCategories: IAllCategories[] = [];

  EditCourseForm = new FormGroup({

  title: new FormControl(),
  description: new FormControl(),
  thumbnailUrl: new FormControl(),
  price: new FormControl(),
  isFree: new FormControl(),
  categoryId: new FormControl(),
  instructorId: new FormControl(2),

  })

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    this.allCategories.GetAllCategories().subscribe({
      next: (response) => {
        this.AllCategories = response;

      }
    })


    this.service.GetCourseById(this.id).subscribe({
      next: (response) => {
        this.CourseData = response;
        this.cdr.detectChanges();

      }
    })





  }



  UpdateCourse(id: number) {

    this.service.EditCourse(id, this.EditCourseForm.value as IAddCourse).subscribe({
      next: (response) => {
        console.log(response);
        console.log("Course Updated Successfully");
        Swal.fire({
        title: 'Updated Successfully!',
        text: 'The course has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.routeTo.navigate(['instructor/courses']);
        }
      });
    },
    error: (err) => {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while updating the course.',
        icon: 'error'
      });
    }
    });

  }


}

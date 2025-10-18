import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../Core/services/Category/category-service';
import { IAllCategories } from '../../../../Core/interfaces/Category/iall-categories';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../../../Core/services/jwt.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.css']
})
export class AddCourse implements OnInit {

  AllCategories: IAllCategories[] = [];
  selectedFile: File | null = null;

  // ✅ Strongly Typed Form
  AddCourseForm = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>(''),
    categoryId: new FormControl<number | null>(null, Validators.required),
    price: new FormControl<number>(0, Validators.required),
    isFree: new FormControl<boolean>(false),
  });

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    // ✅ Load Categories
    this.categoryService.GetAllCategories().subscribe({
      next: (response) => {
        this.AllCategories = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        Swal.fire('Error', 'Failed to load categories.', 'error');
      }
    });
  }

  // ✅ File Selection Handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // ✅ Save Course
  SaveCourse(): void {
    if (this.AddCourseForm.invalid) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      return;
    }

    const instructorId = this.jwtService.getEntityId(); // Retrieve instructor ID from token

    if (!instructorId) {
      Swal.fire('Error', 'Instructor ID not found.', 'error');
      return;
    }

    const formValue = this.AddCourseForm.value;
    const formData = new FormData();

    // ✅ Append form data
    formData.append('Title', formValue.title ?? '');
    formData.append('Description', formValue.description ?? '');
    formData.append('Price', `${formValue.price ?? 0}`);
    formData.append('IsFree', formValue.isFree ? 'true' : 'false');
    formData.append('CategoryId', `${formValue.categoryId ?? ''}`);
    formData.append('InstructorId', instructorId.toString());

    if (this.selectedFile) {
      formData.append('ThumbnailUrl', this.selectedFile, this.selectedFile.name);
    }
    // ✅ Submit to backend
    this.courseService.AddCourse(formData).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Good Job!',
          text: 'Course added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['instructor/courses']);
          }
        });
      },
      error: (err: any) => {
        console.error('Error creating course:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while adding the course. Please check all fields.',
          icon: 'error'
        });
      }
    });
  }
}

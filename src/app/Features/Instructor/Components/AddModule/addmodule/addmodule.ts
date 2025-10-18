import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleDto, ModuleService } from '../../../../../Core/services/module-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpClientModule } from '@angular/common/http';
import { CourseService } from '../../../../../Core/services/Course/course-service';
import { JwtService } from '../../../../../Core/services/jwt.service';

@Component({
  selector: 'app-addmodule',
  templateUrl: './addmodule.html',
  styleUrls: ['./addmodule.css'],
  imports: [CommonModule, FormsModule]
})
export class Addmodule implements OnInit {

  courses: any[] = [];
  moduleData: ModuleDto = {
    title: '',
    moduleArrangement: 1,
    courseId: 0
  };

  constructor(private moduleService: ModuleService, private router: Router, private courseservice: CourseService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {


    this.loadCourses();
  }

  loadCourses() {
    const instructorId = this.jwtService.getEntityId(); // ✅ get "id" from token
    if (!instructorId) {
      console.error('Instructor ID not found in token');
      return;
    }

    const id = Number(instructorId);
    this.courseservice.GetCoursesByInstructorId(id).subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error('Error loading courses', err)
    });
  }
  onCancel() {
    this.router.navigate(['/instructor/module']);
  }

  onSubmit() {
    if (!this.moduleData.title || !this.moduleData.courseId) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill all required fields'
      });
      return;
    }

    this.moduleService.addModule(this.moduleData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Module created successfully!'
        }).then(() => {
          this.router.navigate(['/instructor/module']);
        });
      },
      error: (err) => {
        if (err.error && err.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong while adding the module.'
          });
        }
        console.error('Error adding module', err);
      }
    });
  }


}

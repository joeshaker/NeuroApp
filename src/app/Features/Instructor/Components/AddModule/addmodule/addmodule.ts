import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleDto, ModuleService } from '../../../../../Core/services/module-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addmodule',
  templateUrl: './addmodule.html',
  styleUrls: ['./addmodule.css'],
  imports:[CommonModule,FormsModule]
})
export class Addmodule implements OnInit {

  courses: any[] = [];
  moduleData: ModuleDto = {
    title: '',
    moduleArrangement: 1,
    courseId: 0
  };

  constructor(private moduleService: ModuleService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.moduleService.getCourses().subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error('Error loading courses', err)
    });
  }

  onSubmit() {
    if (!this.moduleData.title || !this.moduleData.courseId) {
      alert('Please fill all required fields');
      return;
    }

    this.moduleService.addModule(this.moduleData).subscribe({
      next: () => {
        alert('Module created successfully!');
        this.router.navigate(['/instructor/module']);
      },
      error: (err) => console.error('Error adding module', err)
    });
  }
}

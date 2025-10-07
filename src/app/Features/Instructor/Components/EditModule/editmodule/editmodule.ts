import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleDto, ModuleService, UpdateModuleDto } from '../../../../../Core/services/module-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editmodule',
  standalone: true,
  templateUrl: './editmodule.html',
  styleUrls: ['./editmodule.css'],
  imports: [CommonModule, FormsModule]
})
export class Editmodule implements OnInit {

  moduleId!: number;
  courses: any[] = [];
  moduleData: UpdateModuleDto = {
    id: 0,
    title: '',
    moduleArrangement: 1,
    courseId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // get id from URL
    this.moduleId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCourses();
    this.loadModule();
    this.cdr.detectChanges(); // ensure view updates after async data load
  }

  loadCourses() {
    this.moduleService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.cdr.detectChanges(); // update view with loaded courses
      },
      error: (err) => console.error('Error loading courses', err)
    });
  }

  loadModule() {
    this.moduleService.getModuleById(this.moduleId).subscribe({
      next: (res) => {
        this.moduleData = res;
        this.cdr.detectChanges(); // update view with loaded module data
      },
      error: (err) => console.error('Error loading module', err)
    });
  }

  onSubmit() {
    this.moduleService.updateModule(this.moduleData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Module updated successfully.'
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
            text: 'Something went wrong while updating the module.'
          });
        }
      }
    });
  }

  onCancel() {
    this.router.navigate(['/instructor/module']);
  }
}

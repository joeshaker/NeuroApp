import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModuleService, ModuleDto } from '../../../../../Core/services/module-service';

@Component({
  selector: 'app-course-module',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-module.html',
  styleUrl: './course-module.css'
})
export class CourseModule implements OnInit {

  modules: any[] = [];   // will hold API data
  totalModules: number = 0;
  totalCourses: number = 0;
  totalVideos: number = 0;
  totalLearners: number = 0; // fake or from API later

  constructor(private moduleService: ModuleService, private cdr :ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules() {
    this.moduleService.getAllModules().subscribe({
      next: (res) => {
        console.log('Modules from API:', res);
        this.modules = res;

        // Calculate stats dynamically
        this.totalModules = res.length;
        this.totalVideos = res.reduce((acc, m) => acc + (m.videos?.length || 0), 0);
        this.totalCourses = new Set(res.map(m => m.course?.id)).size;
        this.totalLearners = 1243; // static for now, until backend provides
        this.cdr.detectChanges(); // ensure view updates
      },
      error: (err) => console.error('Error loading modules', err)
    });
  }
}

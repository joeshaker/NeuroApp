import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModuleService, ModuleDto } from '../../../../../Core/services/module-service';
import { JwtService } from '../../../../../Core/services/jwt.service';

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

  constructor(private moduleService: ModuleService, private cdr: ChangeDetectorRef, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.loadModules();

  }

  loadModules(): void {
    // ✅ get instructor ID from token
    const instructorId = this.jwtService.getEntityId();
    if (!instructorId) {
      console.error('Instructor ID not found in token');
      return;
    }

    // ✅ call API
    this.moduleService.getModulesByInstructorId(+instructorId).subscribe({
      next: (res) => {
        console.log('Modules from API:', res);
        this.modules = res;

        // ✅ dynamically calculate statistics
        this.totalModules = res.length;
        this.totalVideos = res.reduce((acc, m) => acc + (m.videos?.length || 0), 0);
        this.totalCourses = new Set(res.map(m => m.course?.id)).size;
        this.totalLearners = 1243; // replace with backend later

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading modules:', err);
      }
    });
  }
}

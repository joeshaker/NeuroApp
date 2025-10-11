import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../Services/admin.service';
import { IModule, IVideo, ICourse } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css'
})
export class AdminContent implements OnInit {
  modules: IModule[] = [];
  videos: IVideo[] = [];
  courses: ICourse[] = [];
  loading = false;
  activeTab = 'modules';

  constructor(private adminService: AdminService, private cdr:ChangeDetectorRef  ) {}

  ngOnInit() {
    this.loadCourses();
    this.loadModules();
    this.loadVideos();
    this.cdr.detectChanges();
  }

  loadCourses() {
    this.adminService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  loadModules() {
    this.loading = true;
    this.adminService.getModules().subscribe({
      next: (data) => {
        this.modules = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading modules:', error);
        this.loading = false;
      }
    });
  }

  loadVideos() {
    this.adminService.getVideos().subscribe({
      next: (data) => {
        this.videos = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading videos:', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.title : `Course #${courseId}`;
  }

  getModuleName(moduleId: number): string {
    const module = this.modules.find(m => m.moduleId === moduleId);
    return module ? module.moduleName : `Module #${moduleId}`;
  }

  deleteModule(moduleId: number) {
    if (confirm('Are you sure you want to delete this module? All associated videos will also be deleted.')) {
      this.adminService.deleteModule(moduleId).subscribe({
        next: () => {
          this.modules = this.modules.filter(m => m.moduleId !== moduleId);
          this.videos = this.videos.filter(v => v.moduleId !== moduleId);
          alert('Module deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting module:', error);
          alert('Failed to delete module');
        }
      });
    }
  }

  deleteVideo(videoId: number) {
    if (confirm('Are you sure you want to delete this video?')) {
      this.adminService.deleteVideo(videoId).subscribe({
        next: () => {
          this.videos = this.videos.filter(v => v.id !== videoId);
          alert('Video deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting video:', error);
          alert('Failed to delete video');
        }
      });
    }
  }

  getModuleVideosCount(moduleId: number): number {
    return this.videos.filter(v => v.moduleId === moduleId).length;
  }
}

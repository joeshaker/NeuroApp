import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VideoService } from '../../../../../Core/services/Videoservice/videoservice';
import { CourseDto, GetModuleDto, ModuleService } from '../../../../../Core/services/module-service';
import Swal from 'sweetalert2';
import { JwtService } from '../../../../../Core/services/jwt.service';
import { CourseService } from '../../../../../Core/services/Course/course-service';


@Component({
  selector: 'app-add-video',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-video.html',
  styleUrl: './add-video.css'
})
export class AddVideo implements OnInit {
  title: string = '';
  videoArrangement: number = 1;
  selectedCourseId: number | null = null;
  moduleId: number = 0;
  file: File | null = null;

  courses: CourseDto[] = [];
  modules: GetModuleDto[] = [];

  constructor(
    private videoService: VideoService,
    private moduleService: ModuleService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private jwtService: JwtService,
    private courseservice: CourseService
  ) {}

  ngOnInit() {

    const instructorId = this.jwtService.getEntityId(); // Get the instructor ID from the JWT token
    if (!instructorId) {
      console.error('Instructor ID not found in token');
      return;
    }
    const id = Number(instructorId);
    // Load all courses when page loads
    this.courseservice.GetCoursesByInstructorId(id).subscribe({
      next: (res) => {
        this.courses = res;
        this.cdr.detectChanges(); // update view with loaded courses
      },
      error: (err) => console.error('Error loading courses', err)
    });
  }

  onCourseChange(event: any) {
    const courseId = +event.target.value;
    this.selectedCourseId = courseId;

    // Fetch modules of selected course
    this.moduleService.getAllModulesByCourseId(courseId).subscribe({
      next: (res) => {
        this.modules = res;
        this.moduleId = 0;
        this.cdr.detectChanges(); // reset module selection
      },
      error: (err) => console.error('Error loading modules', err)
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.cdr.detectChanges(); // update view with selected file
  }

onSubmit() {
  if (!this.title || !this.selectedCourseId || !this.moduleId || !this.file) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill all required fields and select a video file',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  this.videoService.addVideo(this.file, this.title, this.moduleId, this.videoArrangement)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Video created successfully!',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/instructor/Videos']);
        });
      },
      error: (err) => {
        console.error('Error uploading video', err);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Something went wrong while creating the video.',
          confirmButtonColor: '#d33'
        });
      }
    });
}

}

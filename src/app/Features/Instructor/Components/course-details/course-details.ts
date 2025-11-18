import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { GetModuleDto, ModuleService } from '../../../../Core/services/module-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InstructorService } from '../../../../Core/services/Instructor/instructorservice';
import { VideoCreateDto, VideoService } from '../../../../Core/services/Videoservice/videoservice';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';
import { Footer } from "../../../Home/components/footer/footer";
import { Navbar } from "../../../Home/components/navbar/navbar/navbar";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-details',
  imports: [ RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

  constructor(private service: CourseService, private courseModules: ModuleService, private cdr :ChangeDetectorRef , private route:ActivatedRoute, private instructor:InstructorService , private video:VideoService, private router: Router) { }

  courseDetails!: IAllCourses;
  modules: GetModuleDto[]=[];
  id: number = 0;
  InstDetails: any;
  videos: VideoCreateDto[] = [];


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.GetCourseById(this.id).subscribe({
      next: (response) => {
        this.courseDetails = response;
        console.log(this.courseDetails);
      }
    })


    this.instructor.getAllInstructors().subscribe({
      next: (response) => {
        console.log(this.courseDetails.instructorId);

        this.InstDetails = response.find(i => i.id == this.courseDetails.instructorId);
        this.cdr.detectChanges();
        console.log(this.InstDetails);
      }
    })


    this.courseModules.getAllModulesByCourseId(this.id).subscribe({
      next: (response) => {
        this.modules = response;
        console.log(this.modules);
        this.cdr.detectChanges();
      }
    })


    this.video.getAllVideos().subscribe({
      next: (response) => {
        this.videos= response.filter(x => x.moduleId == 2) ;
        console.log(this.videos);
        this.cdr.detectChanges();
      }
    })
  }

  deleteCourse(): void {
    if (!this.id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // API: DELETE http://localhost:5075/api/Course/{courseId}
        // Prefer a proper method on CourseService, otherwise use HttpClient via the service.
        // @ts-ignore
        const http = (this.service as any).http;
        const base = (this.service as any).baseUrl;
        if (http && base) {
          http.delete(`${base}/${this.id}`).subscribe({
            next: () => {
              Swal.fire({ title: 'Deleted!', text: 'The course has been deleted.', icon: 'success', timer: 1800, showConfirmButton: false });
              this.router.navigate(['instructor/courses']);
            },
            error: () => {
              Swal.fire({ title: 'Error!', text: 'Failed to delete the course.', icon: 'error', confirmButtonText: 'OK' });
            }
          });
        } else {
          Swal.fire({ title: 'Error!', text: 'Delete endpoint not available in CourseService.', icon: 'error' });
        }
      }
    });
  }
}


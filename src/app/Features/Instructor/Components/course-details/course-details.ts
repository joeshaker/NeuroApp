import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../Core/services/Course/course-service';
import { GetModuleDto, ModuleService } from '../../../../Core/services/module-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InstructorService } from '../../../../Core/services/Instructor/instructorservice';
import { VideoCreateDto, VideoService } from '../../../../Core/services/Videoservice/videoservice';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';
import { Footer } from "../../../Home/components/footer/footer";
import { Navbar } from "../../../Home/components/navbar/navbar/navbar";

@Component({
  selector: 'app-course-details',
  imports: [Footer, Navbar , RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetails implements OnInit {

  constructor(private service: CourseService, private courseModules: ModuleService, private cdr :ChangeDetectorRef , private route:ActivatedRoute, private instructor:InstructorService , private video:VideoService) { }

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
}


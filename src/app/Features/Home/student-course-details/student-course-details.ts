import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetModuleDto, ModuleService } from '../../../Core/services/module-service';
import { CourseService } from '../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../Core/interfaces/Course/iall-courses';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IModule } from '../../Admin/Interfaces/admin.interface';
import { Navbar } from "../components/navbar/navbar/navbar";
import { Footer } from "../components/footer/footer";
import { InstructorService } from '../../../Core/services/Instructor/instructorservice';
import { VideoCreateDto, VideoService } from '../../../Core/services/Videoservice/videoservice';

@Component({
  selector: 'app-student-course-details',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './student-course-details.html',
  styleUrl: './student-course-details.css'
})
export class StudentCourseDetails implements OnInit {

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

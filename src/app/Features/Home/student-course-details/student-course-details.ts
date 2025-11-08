import { JwtService } from './../../../Core/services/jwt.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetModuleDto, ModuleService } from '../../../Core/services/module-service';
import { CourseService } from '../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../Core/interfaces/Course/iall-courses';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from "../components/navbar/navbar/navbar";
import { Footer } from "../components/footer/footer";
import { InstructorService } from '../../../Core/services/Instructor/instructorservice';
import { VideoCreateDto, VideoService } from '../../../Core/services/Videoservice/videoservice';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments.development';
import { EnrollmentService } from '../../../Core/services/enrollment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-course-details',
  imports: [Navbar, Footer, RouterLink, CommonModule],
  templateUrl: './student-course-details.html',
  styleUrls: ['./student-course-details.css']
})
export class StudentCourseDetails implements OnInit {

  courseDetails!: IAllCourses;
  modules: GetModuleDto[] = [];
  id: number = 0;
  InstDetails: any;
  videos: VideoCreateDto[] = [];
  isEnrolled: boolean = false; // Track enrollment status

  constructor(
    private service: CourseService,
    private courseModules: ModuleService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private instructor: InstructorService,
    private video: VideoService,
    private JwtService: JwtService,
    private http: HttpClient,
    private enrollmentService: EnrollmentService, // Inject EnrollmentService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Get course details
    this.service.GetCourseById(this.id).subscribe({
      next: (response) => {
        this.courseDetails = response;
        this.checkEnrollment(); // Check if student is enrolled
        this.cdr.detectChanges();
      }
    });

    // Get instructor details
    this.instructor.getAllInstructors().subscribe({
      next: (response) => {
        this.InstDetails = response.find(i => i.id == this.courseDetails.instructorId);
        this.cdr.detectChanges();
      }
    });

    // Get course modules
    this.courseModules.getAllModulesByCourseId(this.id).subscribe({
      next: (response) => {
        this.modules = response;
        this.cdr.detectChanges();
      }
    });

    // Get all videos for the course
    this.video.getAllVideos().subscribe({
      next: (response) => {
        this.videos = response.filter(x => this.modules.some(m => m.id == x.moduleId));
        this.cdr.detectChanges();
      }
    });
  }

  // Check if the student is already enrolled
  checkEnrollment() {
    const studentId = this.JwtService.getEntityId();
    this.enrollmentService.getUserEnrollments(studentId)
      .subscribe({
        next: (enrollments) => {
          console.log('Enrollments API Response:', enrollments);
          this.isEnrolled = enrollments.some(e => e.courseId == this.id);
          console.log('isEnrolled:', this.isEnrolled);
        },
        error: (err) => console.error('Failed to fetch enrollments', err)
      });

  }

  // Enroll & initiate payment
  enrollCourse() {
    if (this.isEnrolled) {
      alert('You are already enrolled in this course.');
      return;
    }

    if (!this.courseDetails) {
      alert('Course details not loaded yet.');
      return;
    }

    const payload = {
      CourseId: this.courseDetails.id,
      StudentId: this.JwtService.getEntityId(),
      PaymentMethod: "card"
    };

    this.http.post(`${environment.apiUrl}/payment/initiatePayment`, payload)
      .subscribe({
        next: (res: any) => {
          if (res.paymentUrl) window.location.href = res.paymentUrl;
          else alert('Payment initiated successfully!');
        },
        error: (err) => {
          console.error('Payment initiation failed:', err);
          alert('Failed to initiate payment. Please try again.');
        }
      });
  }

}

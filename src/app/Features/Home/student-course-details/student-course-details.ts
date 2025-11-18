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
import Swal from 'sweetalert2'; // ✅ SweetAlert2 import

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
  isEnrolled: boolean = false;

  constructor(
    private service: CourseService,
    private courseModules: ModuleService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private instructor: InstructorService,
    private video: VideoService,
    private JwtService: JwtService,
    private http: HttpClient,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Get course details
    this.service.GetCourseById(this.id).subscribe({
      next: (response) => {
        this.courseDetails = response;
        this.checkEnrollment();
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
    // ✅ 1. Check if the user is logged in
    const token = this.JwtService.getToken();
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must log in before enrolling in a course.',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    // ✅ 2. Prevent enrolling twice
    if (this.isEnrolled) {
      Swal.fire({
        icon: 'info',
        title: 'Already Enrolled',
        text: 'You are already enrolled in this course.',
        confirmButtonText: 'OK'
      });
      return;
    }

    // ✅ 3. Ensure course details are loaded
    if (!this.courseDetails) {
      Swal.fire({
        icon: 'error',
        title: 'Course Not Loaded',
        text: 'Course details are not loaded yet. Please try again later.',
      });
      return;
    }

    // ✅ 4. Proceed with payment
    const payload = {
      CourseId: this.courseDetails.id,
      StudentId: this.JwtService.getEntityId(),
      PaymentMethod: "card"
    };

    this.http.post(`${environment.apiUrl}/payment/initiatePayment`, payload)
      .subscribe({
        next: (res: any) => {
          if (res.paymentUrl) {
            Swal.fire({
              icon: 'success',
              title: 'Redirecting to Payment',
              text: 'Please wait while we take you to the payment page...',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.href = res.paymentUrl;
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Payment Initiated',
              text: 'Payment initiated successfully!',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (err) => {
          console.error('Payment initiation failed:', err);
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: 'Failed to initiate payment. Please try again.',
            confirmButtonText: 'Retry'
          });
        }
      });
  }

}

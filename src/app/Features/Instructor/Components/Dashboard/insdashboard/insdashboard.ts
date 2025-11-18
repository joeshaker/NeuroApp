import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from "@angular/router";
import { JwtService } from '../../../../../Core/services/jwt.service';
import { EnrollmentService } from '../../../../../Core/services/enrollment.service';

interface DashboardStats {
  courses: number;
  students: number;
  earnings: number;
  rating: number;
  coursesGrowth: number;
  studentsGrowth: number;
  earningsGrowth: number;
  ratingGrowth: number;
}

interface Activity {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string; // Added this property
  price: number;
  isFree: boolean;
  categoryId: number;
  instructorId: number;
  // Additional properties that might come from API
  students?: number;
  rating?: number;
  progress?: number;
  badge?: string;
}

interface UserData {
  id: number;
  name: string;
  role: string;
  avatar: string;
  greetingName: string;
  email: string;
}

interface Enrollment {
  id: number;
  enrollmentDate: string;
  progressPercentage: number;
  stdId: number;
  courseId: number;
  status: string;
  course?: Course;
}

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: string;
  linkedIn: string;
  qualifications: string;
  userId: string;
}

@Component({
  selector: 'app-insdashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './insdashboard.html',
  styleUrls: ['./insdashboard.css']
})
export class InsdashboardComponent implements OnInit {

  // Data properties that will be populated from API
  userData: UserData = {
    id: 0,
    name: '',
    role: 'Instructor',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    greetingName: '',
    email: ''
  };

  stats: DashboardStats = {
    courses: 0,
    students: 0,
    earnings: 0,
    rating: 4.8,
    coursesGrowth: 0,
    studentsGrowth: 0,
    earningsGrowth: 0,
    ratingGrowth: 0
  };

  recentActivities: Activity[] = [];
  topCourses: Course[] = [];
  courseProgress: Course[] = [];
  enrollments: Enrollment[] = [];

  isLoading: boolean = true;
  error: string = '';

  private readonly API_BASE = 'http://localhost:5075/api';

  constructor(private http: HttpClient, private jwt: JwtService, private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.loadCurrentUser();
  }
    getImageUrl(fileName: string): string {
    if (!fileName) {
      return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
    }

    // 👇 change this to your backend base URL
    const baseUrl = 'http://localhost:5075/uploads/Images/';
    return `${baseUrl}${fileName}`;
  }

  loadCurrentUser(): void {
    this.http.get<any>(`${this.API_BASE}/Auth/me`).subscribe({
      next: (user) => {
        this.userData = {
          id: user.id,
          name: `${user.fullName}`,
          role: 'Instructor',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          greetingName: user.firstName,
          email: user.email
        };

        this.loadInstructorData(user.id);
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.loadInstructorData(1);
      }
    });
  }

  loadInstructorData(userId: number): void {
    this.http.get<Instructor[]>(`${this.API_BASE}/Instructor`).subscribe({
      next: (instructors) => {
        const instructor = instructors.find(inst =>
          inst.email === this.userData.email || inst.userId === userId.toString()
        );

        if (instructor) {
          this.userData.id = instructor.id;
          this.loadInstructorDashboardData(instructor.id);
        } else {
          console.error('Instructor not found');
          this.error = 'Instructor profile not found';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading instructors:', error);
        this.loadInstructorDashboardData(1);
      }
    });
  }

  loadInstructorDashboardData(instructorId: number): void {
    this.http.get<Course[]>(`${this.API_BASE}/Course/GetCourseByInsId/${instructorId}`).subscribe({
      next: (courses) => {
        this.processCoursesData(courses, instructorId);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.processCoursesData([], instructorId);
      }
    });
  }

  processCoursesData(courses: Course[], instructorId: number): void {
    this.stats.courses = courses.length;

    // Set top courses with proper image handling
    this.topCourses = courses.slice(0, 4).map(course => ({
      ...course,
      image: this.getCourseImage(course),
      students: 0,
      rating: 4.8
    }));

    // Set course progress data
    this.courseProgress = courses.map(course => ({
      ...course,
      image: this.getCourseImage(course),
      progress: Math.floor(Math.random() * 30) + 70,
      students: 0,
      rating: 4.5 + (Math.random() * 0.5),
      badge: Math.random() > 0.5 ? 'Bestseller' : 'Popular'
    }));

    // Load enrollments to get student counts and earnings
    this.loadEnrollmentsData(courses, instructorId);

    // Compute earnings by instructor id using EnrollmentService
    this.enrollmentService.getInstructorEarnings(instructorId).subscribe({
      next: ({ total, monthly }) => {
        this.stats.earnings = total;
        // Optionally, if you show monthly somewhere, you can store it too
        // this.stats.monthlyEarnings = monthly; // add to interface if needed
      }
    });
  }

  loadEnrollmentsData(courses: Course[], instructorId: number): void {
    this.http.get<Enrollment[]>(`${this.API_BASE}/Enrollment/GetEnrollmentsByInstructorId/${instructorId}`).subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
        this.processEnrollmentsData(courses, enrollments);
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        this.processEnrollmentsData(courses, []);
      }
    });
  }

processEnrollmentsData(courses: Course[], enrollments: Enrollment[]): void {
  // Calculate total students (unique student IDs)
  const uniqueStudents = new Set(enrollments.map(e => e.stdId));
  this.stats.students = uniqueStudents.size;

  // ✅ Calculate total earnings for all paid/enrolled courses
  const paidEnrollments = enrollments.filter(e =>
    e.status?.toLowerCase() === 'paid' || e.status?.toLowerCase() === 'completed'
  );
    // Earnings are handled via EnrollmentService (paid, not canceled/deleted)

  this.stats.earnings = paidEnrollments.reduce((total, enrollment) => {
    const course = courses.find(c => c.id === enrollment.courseId);
    return total + (course?.price || 0);
  }, 0);

  // Update student counts in courses
  this.topCourses = this.topCourses.map(course => ({
    ...course,
    students: enrollments.filter(e => e.courseId === course.id).length
  }));

  this.courseProgress = this.courseProgress.map(course => ({
    ...course,
    students: enrollments.filter(e => e.courseId === course.id).length
  }));

  // Generate recent activities
  this.generateRecentActivities(enrollments, courses);

  this.isLoading = false;
}


  generateRecentActivities(enrollments: Enrollment[], courses: Course[]): void {
    const activities: Activity[] = [];

    // Recent enrollments as activities
    const recentEnrollments = enrollments
      .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
      .slice(0, 3);

    recentEnrollments.forEach(enrollment => {
      const course = courses.find(c => c.id === enrollment.courseId);
      activities.push({
        type: 'student',
        title: 'New student enrolled',
        description: course?.title || 'Course',
        timestamp: this.formatTimeAgo(new Date(enrollment.enrollmentDate)),
        icon: 'fas fa-user-plus'
      });
    });

    // Add sample activities if we don't have enough enrollments
    if (activities.length < 4) {
      activities.push(
        {
          type: 'course',
          title: 'New course published',
          description: courses[0]?.title || 'Your latest course',
          timestamp: '2 hours ago',
          icon: 'fas fa-book'
        },
        {
          type: 'earning',
          title: 'Payment received',
          description: `$${this.stats.earnings.toLocaleString()} from course sales`,
          timestamp: '1 day ago',
          icon: 'fas fa-dollar-sign'
        }
      );
    }

    this.recentActivities = activities.slice(0, 4);
  }

  private formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  // Safe method to get course image
  private getCourseImage(course: Course): string {
    // Use thumbnailUrl if available, otherwise use placeholder
    return course.thumbnailUrl || this.getPlaceholderImage(course.id);
  }

  // Get different placeholder images based on course ID for variety
  private getPlaceholderImage(courseId: number): string {
    const placeholders = [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80', // Web Dev
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80', // Data Science
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=500&q=80', // Mobile Dev
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=500&q=80'  // UI/UX
    ];
    return placeholders[courseId % placeholders.length];
  }

  formatGrowth(value: number): string {
    return value >= 0 ? `+${value}%` : `${value}%`;
  }

  getGrowthClass(value: number): string {
    return value >= 0 ? 'text-success' : 'text-danger';
  }

  getGrowthIcon(value: number): string {
    return value >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}

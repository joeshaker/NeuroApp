import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Core/services/Course/course-service';
import { CategoryService } from '../../../Core/services/Category/category-service';
import { IAllCourses } from '../../../Core/interfaces/Course/iall-courses';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from "../components/navbar/navbar/navbar";
import { Features } from "../components/Features/features/features";
import { Footer } from "../components/footer/footer";
import { JwtService } from '../../../Core/services/jwt.service';
import { EnrollmentService } from '../../../Core/services/enrollment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-courses',
  imports: [RouterLink, Navbar, Features, Footer,CommonModule],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.css'
})
export class AllCourses implements OnInit {
  allCourses: IAllCourses[] = [];
  filteredCourses: IAllCourses[] = [];
  categories: string[] = [];

  enrolledCourseIds: number[] = []; // 🔹 store enrolled course IDs
  searchTerm: string = '';
  selectedCategory: string = 'All';
  studentId: string | null = null;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private enrollmentService: EnrollmentService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    // ✅ Get current student ID from token
    this.studentId = this.jwtService.getEntityId();

    // 🟢 Load all courses
    this.courseService.GetAllCourses().subscribe({
      next: (response) => {
        this.allCourses = response;
        this.filteredCourses = response;
        this.cdr.detectChanges();
      },
    });

    // 🟢 Load categories dynamically
    this.categoryService.GetAllCategories().subscribe({
      next: (response) => {
        this.categories = response.map((cat: any) => cat.name);
        this.cdr.detectChanges();
      },
    });

    // 🟢 Load student's enrolled courses
    this.enrollmentService.getUserEnrollments(this.studentId).subscribe({
      next: (enrollments) => {
        this.enrolledCourseIds = enrollments.map(e => e.courseId);
        this.cdr.detectChanges();
      }
    });
  }

  showCourseDetails(id: number) {
    this.router.navigate(['/CourseDetails', id]);
  }

  getImageUrl(fileName: string): string {
    if (!fileName) {
      return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
    }
    const baseUrl = 'http://localhost:5075/uploads/Images/';
    return `${baseUrl}${fileName}`;
  }

  applyFilters() {
    this.filteredCourses = this.allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' ||
        course.categoryName.toLowerCase() === this.selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // 🔹 Check if student is enrolled
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  enroll(courseId: number) {
    // Redirect to course detail or payment page
    this.router.navigate(['/CourseDetails', courseId]);
  }
}

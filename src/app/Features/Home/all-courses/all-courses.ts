import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Core/services/Course/course-service';
import { CategoryService } from '../../../Core/services/Category/category-service';
import { IAllCourses } from '../../../Core/interfaces/Course/iall-courses';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from "../components/navbar/navbar/navbar";
import { Features } from "../components/Features/features/features";
import { Footer } from "../components/footer/footer";

@Component({
  selector: 'app-all-courses',
  imports: [RouterLink, Navbar, Features, Footer],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.css'
})
export class AllCourses implements OnInit {
  allCourses: IAllCourses[] = [];
  filteredCourses: IAllCourses[] = [];
  categories: string[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'All';

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        // assuming each category object has a "name" property
        this.categories = response.map((cat: any) => cat.name);
        this.cdr.detectChanges();
      },
    });
  }

  showCourseDetails(id: number) {
    this.router.navigate(['/CourseDetails', id]);
  }

  getImageUrl(fileName: string): string {
    if (!fileName) {
      return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
    }
    const baseUrl = 'https://82-29-190-91.sslip.io:5001/uploads/Images/';
    return `${baseUrl}${fileName}`;
  }

  // 🔍 Filter by search + category
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
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { ICourse, ICategory, IInstructor } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class AdminCourses implements OnInit {
  courses: ICourse[] = [];
  categories: ICategory[] = [];
  instructors: IInstructor[] = [];
  loading = true;
  searchTerm = '';
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedCourse: ICourse | null = null;

  newCourse: any = {
    title: '',
    description: '',
    thumbnailUrl: '',
    price: 0,
    isFree: true,
    instructorId: 0,
    categoryId: 0
  };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef  ) {}

  ngOnInit() {
    this.loadCourses();
    this.loadCategories();
    this.loadInstructors();
    this.cdr.detectChanges();
  }

  loadCourses() {
    this.loading = true;
    this.adminService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.loading = false;
        this.showErrorMessage('Failed to load courses');
      }
    });
  }

  loadCategories() {
    this.adminService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadInstructors() {
    this.adminService.getInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading instructors:', error);
      }
    });
  }

  showAddCourseModal() {
    this.newCourse = {
      title: '',
      description: '',
      thumbnailUrl: '',
      price: 0,
      isFree: true,
      instructorId: 0,
      categoryId: 0
    };
    this.showAddModal = true;
  }

  addCourse() {
    if (!this.newCourse.title || !this.newCourse.description || !this.newCourse.instructorId || !this.newCourse.categoryId) {
      this.showErrorMessage('Please fill in all required fields');
      return;
    }

    this.adminService.createCourse(this.newCourse).subscribe({
      next: (course) => {
        this.courses.push(course);
        this.showAddModal = false;
        this.showSuccessMessage('Course created successfully');
      },
      error: (error) => {
        console.error('Error creating course:', error);
        this.showErrorMessage('Failed to create course');
      }
    });
  }

  editCourse(course: ICourse) {
    this.selectedCourse = { ...course };
    this.showEditModal = true;
  }

 updateCourse() {
  if (this.selectedCourse?.id != null) { // ensures id is not undefined or null
    this.adminService.updateCourse(this.selectedCourse.id, this.selectedCourse).subscribe({
      next: () => {
        const index = this.courses.findIndex(c => c.id === this.selectedCourse?.id);
        if (index !== -1) {
          this.courses[index] = { ...this.selectedCourse! }; // non-null assertion
        }
        this.showEditModal = false;
        this.showSuccessMessage('Course updated successfully');
      },
      error: (error) => {
        console.error('Error updating course:', error);
        this.showErrorMessage('Failed to update course');
      }
    });
  } else {
    this.showErrorMessage('Invalid course ID for update.');
  }
}

deleteCourse() {
  if (this.selectedCourse?.id != null) {
    this.adminService.deleteCourse(this.selectedCourse.id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== this.selectedCourse?.id);
        this.showDeleteModal = false;
        this.showSuccessMessage('Course deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting course:', error);
        this.showErrorMessage('Failed to delete course');
      }
    });
  } else {
    this.showErrorMessage('Invalid course ID for delete.');
  }
}


  confirmDelete(course: ICourse) {
    this.selectedCourse = course;
    this.showDeleteModal = true;
  }



  getFilteredCourses() {
    if (!this.searchTerm) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.instructorName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.categoryName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  getInstructorName(instructorId: number): string {
    const instructor = this.instructors.find(i => i.id === instructorId);
    return instructor ? instructor.expertise : 'Unknown Instructor';
  }

  closeModals() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedCourse = null;
  }

  private showSuccessMessage(message: string) {
    // Using alert for now, can be replaced with toast notifications
    alert(message);
  }

  private showErrorMessage(message: string) {
    // Using alert for now, can be replaced with toast notifications
    alert(message);
  }
}

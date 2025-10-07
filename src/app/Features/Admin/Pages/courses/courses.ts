import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environments.development';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  isFree: boolean;
  instructorId: number;
  categoryId: number;
  createdAt?: Date;
}

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class AdminCourses implements OnInit {
  courses: Course[] = [];
  loading = true;
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.http.get<Course[]>(`${environment.apiUrl}/Course`).subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.loading = false;
      }
    });
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.http.delete(`${environment.apiUrl}/Course/${id}`).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== id);
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          alert('Failed to delete course');
        }
      });
    }
  }

  getFilteredCourses() {
    if (!this.searchTerm) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }
}

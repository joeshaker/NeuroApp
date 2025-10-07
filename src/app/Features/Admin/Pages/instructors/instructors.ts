import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environments.development';

interface Instructor {
  id: number;
  userId: string;
  expertise: string;
  bio: string;
  isVerified: boolean;
}

@Component({
  selector: 'app-admin-instructors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css'
})
export class AdminInstructors implements OnInit {
  instructors: Instructor[] = [];
  loading = true;
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    this.loading = true;
    this.http.get<Instructor[]>(`${environment.apiUrl}/Instructor`).subscribe({
      next: (data) => {
        this.instructors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading instructors:', error);
        this.loading = false;
      }
    });
  }

  verifyInstructor(id: number) {
    this.http.put(`${environment.apiUrl}/Instructor/verify/${id}`, {}).subscribe({
      next: () => {
        const instructor = this.instructors.find(i => i.id === id);
        if (instructor) {
          instructor.isVerified = true;
        }
      },
      error: (error) => {
        console.error('Error verifying instructor:', error);
        alert('Failed to verify instructor');
      }
    });
  }

  getFilteredInstructors() {
    if (!this.searchTerm) {
      return this.instructors;
    }
    return this.instructors.filter(instructor =>
      instructor.expertise?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      instructor.bio?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  getPendingCount(): number {
    return this.instructors.filter(i => !i.isVerified).length;
  }

  getVerifiedCount(): number {
    return this.instructors.filter(i => i.isVerified).length;
  }
}

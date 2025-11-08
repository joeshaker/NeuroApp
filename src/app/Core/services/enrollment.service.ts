import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private baseUrl = 'http://localhost:5075/api/Enrollment';

  constructor(private http: HttpClient) {}

  getUserEnrollments(): Observable<any[]> {
    // Replace 9 with the current logged-in student's ID dynamically if needed
    const studentId = 9;
    return this.http.get<any[]>(`${this.baseUrl}/GetEnrollmentsByStudentId/${studentId}`);
  }
}

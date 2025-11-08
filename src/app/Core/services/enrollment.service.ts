import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private baseUrl = 'http://localhost:5075/api/Enrollment';

  constructor(private http: HttpClient) {}

  getUserEnrollments(studentid : string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetEnrollmentsByStudentId/${studentid}`);
  }
  getInsEnrollments(instructorid : number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/GetEnrollmentsByInstructorId/${instructorid}`);
  }
}

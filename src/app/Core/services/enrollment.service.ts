import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

  // Compute total and monthly earnings for an instructor from enrollments API
  getInstructorEarnings(instructorId: number): Observable<{ total: number; monthly: number; paidCount: number; monthlyCount: number; }>{
    return this.getInsEnrollments(instructorId).pipe(
      map((enrollments: any[]) => {
        const now = new Date();
        const paidActive = enrollments.filter(e =>
          (e.status?.toLowerCase?.() === 'paid') && !e.isCanceled && !e.isDeleted
        );
        const total = paidActive.reduce((sum, e) => sum + (e.course?.price || 0), 0);
        const monthlyPaid = paidActive.filter(e => {
          const d = new Date(e.enrollmentDate);
          return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        });
        const monthly = monthlyPaid.reduce((sum, e) => sum + (e.course?.price || 0), 0);
        return { total, monthly, paidCount: paidActive.length, monthlyCount: monthlyPaid.length };
      })
    );
  }
}

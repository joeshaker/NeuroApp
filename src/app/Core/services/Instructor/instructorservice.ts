import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InstructorRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  linkedIn: string;
  qualifications: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5075/api/Instructor';

  /**
   * Register a new instructor (new account)
   */
  registerNewInstructor(data: InstructorRegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-new`, data);
  }

  /**
   * Register an instructor who already has an existing account
   */
  registerExistingInstructor(data: { email: string; qualifications: string; linkedIn: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-existing`, data);
  }

  /**
   * Get instructor by ID
   */
  getInstructorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all instructors
   */
  getAllInstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  /**
   * Verify an instructor by ID
   */
  verifyInstructor(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/verify/${id}`, {});
  }
}

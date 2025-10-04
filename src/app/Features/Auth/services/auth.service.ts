import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  gender: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  email: string;
  userName: string;
  role: string;
}

export interface OtpResponse {
  message: string;
  success?: boolean;
}

export interface VerifyOtpResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'https://localhost:7011/api/Auth';

  register(data: RegisterRequest): Observable<OtpResponse> {
        console.log(data);

    return this.http.post<OtpResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/login`, data);
  }

  verifyOtp(email: string, code: string): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.apiUrl}/verify-otp`, null, {
      params: { email, code }
    }).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  sendOtp(email: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/send-otp`, null, {
      params: { email }
    });
  }

  // Backward-compatible alias
  resendOtp(email: string): Observable<OtpResponse> {
    return this.sendOtp(email);
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private setUserInfo(email: string, userName: string, role: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from '../../../Core/services/jwt.service';

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
  private jwtService = inject(JwtService);
  private apiUrl = 'http://localhost:5075/api/Auth';

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
        this.handleSuccessfulAuth(response.token);
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

  /**
   * Handle successful authentication and redirect based on role
   */
  private handleSuccessfulAuth(token: string): void {
    // Save token
    this.jwtService.setToken(token);

    // Wait for token to be available before decoding
    setTimeout(() => {
      const decodedToken = this.jwtService.decodeToken();

      if (decodedToken && decodedToken.role) {
        console.log('✅ Auth successful, redirecting:', decodedToken.role);
        this.redirectBasedOnRole(decodedToken.role);
      } else {
        console.error('❌ Failed to decode token, redirecting to login');
        this.router.navigate(['/auth/login']);
      }
    }, 0);
  }

  /**
   * Redirect user based on their role after successful authentication
   */
  private redirectBasedOnRole(role: string): void {
    console.log(`Redirecting user with role: ${role}`);

    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'Instructor':
        this.router.navigate(['/instructor/dashboard']);
        break;
      case 'Student':
        this.router.navigate(['/home']);
        break;
      default:
        console.warn(`Unknown role: ${role}, redirecting to home`);
        this.router.navigate(['/home']);
    }
  }

  private setTokens(token: string, refreshToken: string): void {
    this.jwtService.setToken(token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private setToken(token: string): void {
    this.jwtService.setToken(token);
  }

  private setUserInfo(email: string, userName: string, role: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return this.jwtService.getToken();
  }

  isAuthenticated(): boolean {
    return this.jwtService.isAuthenticated();
  }

  getUserRole(): string | null {
    return this.jwtService.getUserRole();
  }

  logout(): void {
    this.jwtService.clearAuth();
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}

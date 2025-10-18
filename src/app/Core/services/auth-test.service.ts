import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

/**
 * Service for testing JWT authentication functionality
 * This service can be used to simulate login with different roles for testing
 */
@Injectable({
  providedIn: 'root'
})
export class AuthTestService {

  constructor(private jwtService: JwtService) {}

  /**
   * Create a test JWT token for a given role
   * This is for testing purposes only - in production, tokens come from the backend
   */
  createTestToken(role: 'Admin' | 'Instructor' | 'Student', email: string = 'test@example.com'): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      sub: '12345',
      email: email,
      name: `Test ${role}`,
      role: role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours from now
    };

    // Simple base64 encoding (not secure, just for testing)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = 'test-signature';

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  /**
   * Login as Admin for testing
   */
  loginAsAdmin(): void {
    const token = this.createTestToken('Admin', 'admin@test.com');
    this.jwtService.setToken(token);
    console.log('Logged in as Admin');
  }

  /**
   * Login as Instructor for testing
   */
  loginAsInstructor(): void {
    const token = this.createTestToken('Instructor', 'instructor@test.com');
    this.jwtService.setToken(token);
    console.log('Logged in as Instructor');
  }

  /**
   * Login as Student for testing
   */
  loginAsStudent(): void {
    const token = this.createTestToken('Student', 'student@test.com');
    this.jwtService.setToken(token);
    console.log('Logged in as Student');
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.jwtService.clearAuth();
    console.log('Logged out');
  }

  /**
   * Get current authentication status
   */
  getAuthStatus(): {
    isAuthenticated: boolean;
    role: string | null;
    email: string | null;
    isExpired: boolean;
  } {
    return {
      isAuthenticated: this.jwtService.isAuthenticated(),
      role: this.jwtService.getUserRole(),
      email: this.jwtService.getUserEmail(),
      isExpired: this.jwtService.isTokenExpired()
    };
  }
}
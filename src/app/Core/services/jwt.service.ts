import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface JwtPayload {
  sub: string;
    entityId?: string;  // the instructor or student ID from the token
// the instructor or student ID from the token
  role: string;
  email?: string;
  name?: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtHelper = new JwtHelperService();
  private readonly TOKEN_KEY = 'token';

  constructor() {}

  /**
   * Get the JWT token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Set the JWT token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Remove the JWT token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Decode the JWT token and return the payload
   */
  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return this.jwtHelper.decodeToken<JwtPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Get the user role from the JWT token
   */
  getUserRole(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.role || null;
  }

  /**
   * Get the user ID from the JWT token
   */
  getUserId(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.sub || null;
  }

  /**
   * Get the user email from the JWT token
   */
  getUserEmail(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.email || null;
  }

  /**
   * Get the user name from the JWT token
   */
  getUserName(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.name || null;
  }

  /**
   * Check if the JWT token is expired
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    try {
      return this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  /**
   * Check if the user is authenticated (has valid, non-expired token)
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired();
  }

    // ✅ Get entity ID (InstructorId / StudentId)
  getEntityId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.entityId || null;
  }

  /**
   * Check if the user has a specific role
   */
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  /**
   * Check if the user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole !== null && roles.includes(userRole);
  }

  /**
   * Get the token expiration date
   */
  getTokenExpirationDate(): Date | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return this.jwtHelper.getTokenExpirationDate(token);
    } catch (error) {
      console.error('Error getting token expiration date:', error);
      return null;
    }
  }

  /**
   * Clear all authentication data
   */
  clearAuth(): void {
    this.removeToken();
  }
}

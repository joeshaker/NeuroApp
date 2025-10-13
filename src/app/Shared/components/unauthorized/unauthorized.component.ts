import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../../Core/services/jwt.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  userRole: string | null = null;

  constructor(
    private router: Router,
    private jwtService: JwtService
  ) {
    this.userRole = this.jwtService.getUserRole();
  }

  goToLogin(): void {
    this.jwtService.clearAuth();
    this.router.navigate(['/auth/login']);
  }

  goBack(): void {
    window.history.back();
  }

  goToHome(): void {
    // Redirect based on user role
    const role = this.jwtService.getUserRole();
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
        this.router.navigate(['/auth/login']);
    }
  }
}
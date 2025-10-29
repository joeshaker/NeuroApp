import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
// import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check auth status initially
    this.isAuthenticated = this.authService.isAuthenticated();

    // (Optional) If you use events or observables to track login/logout state,
    // you could subscribe to that here for real-time updates.
  }
  isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}


  logout(): void {
    this.authService.logout(); // Calls logout method in AuthService
    this.isAuthenticated = false; // Update UI
  }
}

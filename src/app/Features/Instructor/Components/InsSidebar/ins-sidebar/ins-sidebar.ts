import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthTestService } from '../../../../../Core/services/auth-test.service'; // adjust path as needed

@Component({
  selector: 'app-ins-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ins-sidebar.html',
  styleUrl: './ins-sidebar.css'
})
export class InsSidebar {
   isSidebarOpen = false;
  constructor(
    private authTestService: AuthTestService,
    private router: Router
  ) {}
    /** Toggle sidebar open/close */
  toggleSidebar(forceClose: boolean | null = null): void {
    if (forceClose === false) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  logout() {
    this.authTestService.logout(); // clear token
    this.router.navigate(['/login']); // redirect to login page
  }
}

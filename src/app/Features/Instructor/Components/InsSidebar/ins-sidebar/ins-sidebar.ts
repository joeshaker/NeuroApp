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
  constructor(
    private authTestService: AuthTestService,
    private router: Router
  ) {}

  logout() {
    this.authTestService.logout(); // clear token
    this.router.navigate(['/login']); // redirect to login page
  }
}

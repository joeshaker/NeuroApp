import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-container',
  standalone: true,
  imports: [AdminSidebar, RouterOutlet],
  templateUrl: './admin-container.html',
  styleUrl: './admin-container.css'
})
export class AdminContainer {

}

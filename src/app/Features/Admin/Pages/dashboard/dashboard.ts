import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../Admin/Services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboard implements OnInit {
  stats = {
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalInstructors: 0,
    activeStudents: 0,
    pendingInstructors: 0,
    totalCategories: 0
  };

  recentEnrollments: any[] = [];
  loading = true;

  constructor(private adminService: AdminService,private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDashboardData();
    this.cdr.detectChanges();
  }

  loadDashboardData() {
    this.loading = true;

    this.adminService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = {
          totalStudents: data.totalStudents,
          totalCourses: data.totalCourses,
          totalEnrollments: data.totalEnrollments,
          totalInstructors: data.totalInstructors,
          activeStudents: data.activeStudents,
          pendingInstructors: data.pendingInstructors,
          totalCategories: data.totalCategories
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
        // fallback minimal stats to keep UI working
        this.stats = {
          totalStudents: 0,
          totalCourses: 0,
          totalEnrollments: 0,
          totalInstructors: 0,
          activeStudents: 0,
          pendingInstructors: 0,
          totalCategories: 0
        };
        this.loading = false;
      }
    });

    this.adminService.getAnalytics().subscribe({
      next: (data) => {
        this.recentEnrollments = data.recentEnrollments || [];
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
      }
    });
  }


  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Active': 'success',
      'Completed': 'primary',
      'In Progress': 'info',
      'Cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
  }
}

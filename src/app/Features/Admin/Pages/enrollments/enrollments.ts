import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { IEnrollment } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollments.html',
  styleUrl: './enrollments.css'
})
export class AdminEnrollments implements OnInit {
  enrollments: IEnrollment[] = [];
  filteredEnrollments: IEnrollment[] = [];
  loading = false;
  searchTerm = '';
  statusFilter = 'All';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef  ) {}

  ngOnInit() {
    this.loadEnrollments();
    this.cdr.detectChanges();
  }

  loadEnrollments() {
    this.loading = true;
    this.adminService.getEnrollments().subscribe({
      next: (data) => {
        this.enrollments = data;
        this.filteredEnrollments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        this.loading = false;
      }
    });
  }

  filterEnrollments() {
    this.filteredEnrollments = this.enrollments.filter(enrollment => {
      const matchesSearch = !this.searchTerm ||
        enrollment.courseName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        enrollment.studentName?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.statusFilter === 'All' || enrollment.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filterEnrollments();
  }

  onStatusFilter(status: string) {
    this.statusFilter = status;
    this.filterEnrollments();
  }

  cancelEnrollment(enrollmentId: number) {
    if (confirm('Are you sure you want to cancel this enrollment?')) {
      this.adminService.cancelEnrollment(enrollmentId).subscribe({
        next: () => {
          const enrollment = this.enrollments.find(e => e.enrollmentId === enrollmentId);
          if (enrollment) {
            enrollment.status = 'Cancelled';
          }
          this.filterEnrollments();
        },
        error: (error) => {
          console.error('Error cancelling enrollment:', error);
          alert('Failed to cancel enrollment');
        }
      });
    }
  }

  deleteEnrollment(enrollmentId: number) {
    if (confirm('Are you sure you want to delete this enrollment? This action cannot be undone.')) {
      this.adminService.deleteEnrollment(enrollmentId).subscribe({
        next: () => {
          this.enrollments = this.enrollments.filter(e => e.enrollmentId !== enrollmentId);
          this.filterEnrollments();
          alert('Enrollment deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting enrollment:', error);
          alert('Failed to delete enrollment');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Active': 'success',
      'Completed': 'primary',
      'Cancelled': 'danger'
    };
    return statusMap[status] || 'secondary';
  }

  getStatusCount(status: string): number {
    if (status === 'All') return this.enrollments.length;
    return this.enrollments.filter(e => e.status === status).length;
  }
}

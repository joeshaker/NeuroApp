import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../Services/admin.service';
import { IAnalytics } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class AdminAnalytics implements OnInit {
  analytics: IAnalytics | null = null;
  loading = false;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAnalytics();
    this.cdr.detectChanges();
  }

  loadAnalytics() {
    this.loading = true;
    this.adminService.getAnalytics().subscribe({
      next: (data) => {
        this.analytics = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
        this.setMockAnalytics();
        this.loading = false;
      }
    });
  }


  getMaxEnrollments(): number {
    if (!this.analytics?.enrollmentsByMonth) return 0;
    return Math.max(...this.analytics.enrollmentsByMonth.map(e => e.enrollments));
  }

  getEnrollmentPercentage(enrollments: number): number {
    const max = this.getMaxEnrollments();
    return max > 0 ? (enrollments / max) * 100 : 0;
  }

  getTotalCoursesCount(): number {
    if (!this.analytics?.coursesByCategory) return 0;
    return this.analytics.coursesByCategory.reduce((sum, cat) => sum + cat.coursesCount, 0);
  }

  getCategoryPercentage(count: number): number {
    const total = this.getTotalCoursesCount();
    return total > 0 ? (count / total) * 100 : 0;
  }

  getCategoryColor(index: number): string {
    const colors = ['#4361ee', '#10b981', '#f72585', '#f59e0b', '#8b5cf6', '#06b6d4'];
    return colors[index % colors.length];
  }

  // Fallback analytics in case API fails
  setMockAnalytics() {
    this.analytics = {
      totalStudents: 0,
      totalCourses: 12,
      totalEnrollments: 85,
      totalInstructors: 8,
      activeStudents: 48,
      pendingInstructors: 2,
      totalCategories: 5,
      recentEnrollments: [],
      enrollmentsByMonth: [
        { month: 'May 2025', enrollments: 10, completions: 3 },
        { month: 'Jun 2025', enrollments: 12, completions: 5 },
        { month: 'Jul 2025', enrollments: 14, completions: 6 },
        { month: 'Aug 2025', enrollments: 16, completions: 8 },
        { month: 'Sep 2025', enrollments: 18, completions: 9 },
        { month: 'Oct 2025', enrollments: 15, completions: 7 }
      ],
      coursesByCategory: [
        { categoryName: 'Programming', coursesCount: 4 },
        { categoryName: 'AI/ML', coursesCount: 3 },
        { categoryName: 'Design', coursesCount: 2 },
        { categoryName: 'Business', coursesCount: 3 }
      ],
      topInstructors: []
    };
  }
}

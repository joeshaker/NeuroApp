import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../Core/services/enrollment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../components/navbar/navbar/navbar";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-learning',
  imports: [CommonModule, RouterModule, Navbar, FormsModule],
  templateUrl: './my-learning.html',
  styleUrls: ['./my-learning.css']
})
export class MyLearningComponent implements OnInit {
  enrollments: any[] = [];
  filteredEnrollments: any[] = [];
  loading = true;
  selectedStatus: string = 'paid'; // default: show only paid

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit() {
  this.enrollmentService.getUserEnrollments().subscribe({
    next: (data: any[]) => {
      this.enrollments = data;
      this.applyFilter();
      this.loading = false;
    },
    error: (err: any) => {
      console.error(err);
      this.loading = false;
    }
  });
}


  applyFilter() {
    if (this.selectedStatus === 'paid') {
      this.filteredEnrollments = this.enrollments.filter(
        e => e.status.toLowerCase() === 'paid' && !e.isCanceled && !e.isDeleted
      );
    } else {
      this.filteredEnrollments = this.enrollments.filter(
        e => !e.isCanceled && !e.isDeleted
      );
    }
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.applyFilter();
  }
}

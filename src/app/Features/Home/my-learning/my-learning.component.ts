import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EnrollmentService } from '../../../Core/services/enrollment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../components/navbar/navbar/navbar";
import { FormsModule } from '@angular/forms';
import { JwtService } from '../../../Core/services/jwt.service';
import { Enrollment } from './enrollment.model';

@Component({
  selector: 'app-my-learning',
  imports: [CommonModule, RouterModule, Navbar, FormsModule],
  templateUrl: './my-learning.html',
  styleUrls: ['./my-learning.css']
})
export class MyLearningComponent implements OnInit {
  enrollments: Enrollment[] = [];
  filteredEnrollments: Enrollment[] = [];
  loading = true;
  selectedStatus: string = 'paid'; // default: show only paid

  constructor(private enrollmentService: EnrollmentService,private cdr: ChangeDetectorRef,
    private JwtService: JwtService
  ) {}

  ngOnInit() {

    const studentId = this.JwtService.getEntityId();
  this.enrollmentService.getUserEnrollments(studentId).subscribe({
    next: (data: any[]) => {
      this.enrollments = data;
      this.cdr.detectChanges();
      console.log('Enrollments fetched:', this.enrollments);
      this.enrollments.forEach(enrollment => {
        console.log('Enrollment Course Image:', enrollment.courseImageUrl);
      });
      this.applyFilter();
      this.loading = false;
    },
    error: (err: any) => {
      console.error(err);
      this.loading = false;
    }
  });
}

  getImageUrl(fileName: string): string {
    if (!fileName) {
      return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
    }

    // 👇 change this to your backend base URL
    const baseUrl = 'http://localhost:5075/uploads/Images/';
    console.log(fileName)
    return `${baseUrl}${fileName}`;
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

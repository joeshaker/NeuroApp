import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { IInstructor, IInstructorRegister } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-instructors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css'
})
export class AdminInstructors implements OnInit {
  instructors: IInstructor[] = [];
  loading = true;
  searchTerm = '';
  showAddModal = false;
  showVerifyModal = false;
  selectedInstructor: IInstructor | null = null;

  newInstructor: IInstructorRegister = {
    email: '',
    password: '',
    name: '',
    expertise: '',
    bio: ''
  };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef  ) {}

  ngOnInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    this.loading = true;
    this.adminService.getInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading instructors:', error);
        this.loading = false;
        this.showErrorMessage('Failed to load instructors');
      }
    });
  }

  showAddInstructorModal() {
    this.newInstructor = {
      email: '',
      password: '',
      name: '',
      expertise: '',
      bio: ''
    };
    this.showAddModal = true;
  }

  addInstructor() {
    if (!this.newInstructor.email || !this.newInstructor.password || !this.newInstructor.name || !this.newInstructor.expertise) {
      this.showErrorMessage('Please fill in all required fields');
      return;
    }

    this.adminService.registerInstructor(this.newInstructor).subscribe({
      next: (instructor) => {
        this.instructors.push(instructor);
        this.showAddModal = false;
        this.showSuccessMessage('Instructor registered successfully');
      },
      error: (error) => {
        console.error('Error registering instructor:', error);
        this.showErrorMessage('Failed to register instructor');
      }
    });
  }

  confirmVerify(instructor: IInstructor) {
    this.selectedInstructor = instructor;
    this.showVerifyModal = true;
  }

  verifyInstructor() {
    if (this.selectedInstructor) {
      this.adminService.verifyInstructor(this.selectedInstructor.id).subscribe({
        next: () => {
          const instructor = this.instructors.find(i => i.id === this.selectedInstructor?.id);
          if (instructor) {
            instructor.isVerified = true;
          }
          this.showVerifyModal = false;
          this.showSuccessMessage('Instructor verified successfully');
        },
        error: (error) => {
          console.error('Error verifying instructor:', error);
          this.showErrorMessage('Failed to verify instructor');
        }
      });
    }
  }

  getFilteredInstructors() {
    if (!this.searchTerm) {
      return this.instructors;
    }
    return this.instructors.filter(instructor =>
      instructor.expertise?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      instructor.bio?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      instructor.userId?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  getPendingCount(): number {
    return this.instructors.filter(i => !i.isVerified).length;
  }

  getVerifiedCount(): number {
    return this.instructors.filter(i => i.isVerified).length;
  }

  closeModals() {
    this.showAddModal = false;
    this.showVerifyModal = false;
    this.selectedInstructor = null;
  }

  private showSuccessMessage(message: string) {
    // Using alert for now, can be replaced with toast notifications
    alert(message);
  }

  private showErrorMessage(message: string) {
    // Using alert for now, can be replaced with toast notifications
    alert(message);
  }
}

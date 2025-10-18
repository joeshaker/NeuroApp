import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InstructorService } from '../../../../../Core/services/Instructor/instructorservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registerinstructor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registerinstructor.html',
  styleUrl: './registerinstructor.css'
})
export class Registerinstructor {
  registerForm!: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private instructorService: InstructorService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      linkedIn: ['', Validators.required],
      qualifications: ['', Validators.required],
    });
  }

  // ✅ Form getters
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get address() { return this.registerForm.get('address'); }
  get gender() { return this.registerForm.get('gender'); }
  get linkedIn() { return this.registerForm.get('linkedIn'); }
  get qualifications() { return this.registerForm.get('qualifications'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.instructorService.registerNewInstructor(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Instructor registered successfully:', response);
        this.isLoading = false;

        // ✅ Show SweetAlert success popup
        Swal.fire({
          title: 'Success!',
          text: 'Instructor registered successfully. You can now log in.',
          icon: 'success',
          confirmButtonText: 'Go to Login',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          // ✅ Navigate to login after user clicks "Go to Login"
          this.router.navigate(['/auth/login']);
        });

        this.registerForm.reset();
      },
      error: (error) => {
        console.error('Error registering instructor:', error);
        this.isLoading = false;

        // ❌ Show error popup
        Swal.fire({
          title: 'Registration Failed',
          text: error.error || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}

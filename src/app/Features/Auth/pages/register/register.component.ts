import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor() {
    this.registerForm = this.fb.group({
      // New API fields
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address: [''],
      gender: [''],
      // Legacy fields kept temporarily for compatibility with current template
      userName: ['', [Validators.required, Validators.minLength(3)]],
      role: ['student', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // New API fields
  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get role() {
    return this.registerForm.get('role');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const raw = this.registerForm.value as any;
      const firstName = raw.firstName?.trim() || (raw.userName?.trim()?.split(' ')[0] || '');
      const lastName = raw.lastName?.trim() || (raw.userName?.trim()?.split(' ').slice(1).join(' ') || '');
      const payload = {
        firstName,
        lastName,
        email: raw.email,
        password: raw.password,
        address: raw.address || '',
        gender: raw.gender || ''
      };

      this.authService.register(payload as any).subscribe({
        next: () => {
          this.authService.sendOtp(this.registerForm.value.email).subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/auth/otp-verification'], {
                queryParams: { email: this.registerForm.value.email }
              });
            },
            error: (err) => {
              this.isLoading = false;
              this.errorMessage = err.error?.message || 'Failed to send OTP. Please try again.';
            }
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}

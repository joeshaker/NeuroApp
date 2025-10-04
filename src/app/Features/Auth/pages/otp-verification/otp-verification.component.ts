import { Component, inject, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  otpForm: FormGroup;
  email = '';
  isLoading = false;
  isResending = false;
  errorMessage = '';
  successMessage = '';
  canResend = true;
  resendCountdown = 0;
  private resendInterval: any;

  constructor() {
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      if (!this.email) {
        this.router.navigate(['/auth/register']);
      }
    });
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && /^[0-9]$/.test(value)) {
      if (index < 5) {
        const inputs = this.otpInputs.toArray();
        inputs[index + 1].nativeElement.focus();
      }
    }

    this.errorMessage = '';
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const inputs = this.otpInputs.toArray();
      inputs[index - 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');

    if (pastedData && /^[0-9]{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      const inputs = this.otpInputs.toArray();

      digits.forEach((digit, index) => {
        this.otpForm.get(`digit${index + 1}`)?.setValue(digit);
        if (index < 5) {
          inputs[index + 1].nativeElement.focus();
        }
      });
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const otp = Object.values(this.otpForm.value).join('');

      this.authService.verifyOtp(this.email, otp).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Verification successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Invalid OTP. Please try again.';
          this.clearOtp();
        }
      });
    } else {
      this.errorMessage = 'Please enter all 6 digits.';
    }
  }

  resendOtp(): void {
    if (!this.canResend) return;

    this.isResending = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.resendOtp(this.email).subscribe({
      next: (response) => {
        this.isResending = false;
        this.successMessage = 'OTP sent successfully! Check your email.';
        this.startResendCountdown();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.isResending = false;
        this.errorMessage = error.error?.message || 'Failed to resend OTP. Please try again.';
      }
    });
  }

  private startResendCountdown(): void {
    this.canResend = false;
    this.resendCountdown = 60;

    this.resendInterval = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        this.canResend = true;
        clearInterval(this.resendInterval);
      }
    }, 1000);
  }

  private clearOtp(): void {
    this.otpForm.reset();
    const inputs = this.otpInputs.toArray();
    if (inputs.length > 0) {
      inputs[0].nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }
}

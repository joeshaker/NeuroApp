# Authentication API Documentation

## Backend API Endpoints

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "userName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "role": "student"
}
```

**Response (Success - 200):**
```json
{
  "message": "Registration successful. OTP sent to your email.",
  "success": true
}
```

**Response (Error - 400):**
```json
{
  "message": "Email already exists",
  "success": false
}
```

---

### 2. Verify OTP
**Endpoint:** `POST /api/auth/verify-otp`

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "john@example.com",
  "userName": "John Doe",
  "role": "student"
}
```

**Response (Error - 400):**
```json
{
  "message": "Invalid or expired OTP"
}
```

---

### 3. Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "john@example.com",
  "userName": "John Doe",
  "role": "student"
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 4. Resend OTP
**Endpoint:** `POST /api/auth/resend-otp`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (Success - 200):**
```json
{
  "message": "OTP sent successfully",
  "success": true
}
```

**Response (Error - 400):**
```json
{
  "message": "Failed to send OTP"
}
```

---

## Authentication Flow

### Registration Flow:
1. User fills registration form (`/auth/register`)
2. Frontend sends POST request to `/api/auth/register`
3. Backend creates user and sends OTP to email
4. User is redirected to `/auth/otp-verification?email=user@example.com`
5. User enters 6-digit OTP
6. Frontend sends POST request to `/api/auth/verify-otp`
7. Backend verifies OTP and returns JWT tokens
8. Tokens saved to localStorage
9. User redirected to `/home`

### Login Flow:
1. User fills login form (`/auth/login`)
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials and returns JWT tokens
4. Tokens saved to localStorage
5. User redirected to `/home`

---

## JWT Token Usage

All authenticated requests automatically include the JWT token in the Authorization header via the `authInterceptor`:

```typescript
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Storage (localStorage):
- `token` - JWT access token
- `refreshToken` - Refresh token for token renewal
- `email` - User email
- `userName` - User full name
- `role` - User role (student/instructor)

---

## Frontend Components

### Login Component
**Path:** `/auth/login`
**Component:** `LoginComponent`
**Features:**
- Email and password validation
- Show/hide password toggle
- Loading spinner during authentication
- Error message display
- Auto-redirect to `/home` on success

### Register Component
**Path:** `/auth/register`
**Component:** `RegisterComponent`
**Features:**
- Full name, email, password validation
- Password confirmation with matching validation
- Role selection (Student/Instructor)
- Show/hide password toggles
- Loading spinner during registration
- Error message display
- Auto-redirect to OTP verification on success

### OTP Verification Component
**Path:** `/auth/otp-verification`
**Component:** `OtpVerificationComponent`
**Features:**
- 6 individual digit inputs with auto-focus
- Paste support for 6-digit codes
- Backspace navigation between inputs
- Resend OTP with 60-second countdown
- Loading states for verify and resend
- Success/error message display
- Auto-redirect to `/home` on successful verification

---

## NeuroTech Design System

### Color Palette:
- **Primary Blue:** `#011c31`, `#042E4E`, `#14213d`
- **Golden Yellow:** `#FFD049`, `#efc042`, `#ffc221`
- **Light Blue:** `#32c3f5`
- **Error Red:** `#ff6b6b`, `rgba(220, 53, 69, 0.6)`
- **Success Green:** `#4caf50`, `rgba(40, 167, 69, 0.3)`

### Typography:
- **Font Family:** Cairo (Google Fonts)
- **Font Weights:** 300, 400, 600, 700
- **Line Height:** 1.86 for body text

### Design Features:
- Glassmorphism effects with backdrop blur
- Gradient backgrounds
- Smooth transitions and animations
- Rounded corners (8-16px border radius)
- Golden border accents
- Box shadows with glow effects
- Responsive design (mobile-first)
- Hover states with transform effects

### Animations:
- Fade-in-up on page load
- Shake on error
- Pulse on icon elements
- Smooth transitions (0.3s ease)
- Loading spinners

---

## Service Architecture

### AuthService
**Location:** `src/app/Features/Auth/services/auth.service.ts`

**Methods:**
- `register(data: RegisterRequest): Observable<OtpResponse>`
- `login(data: LoginRequest): Observable<AuthResponse>`
- `verifyOtp(data: VerifyOtpRequest): Observable<AuthResponse>`
- `resendOtp(email: string): Observable<OtpResponse>`
- `getToken(): string | null`
- `isAuthenticated(): boolean`
- `logout(): void`

---

## HTTP Interceptor

**Location:** `src/app/Core/interceptors/interceptors/auth-interceptor.ts`

The interceptor automatically:
- Retrieves JWT token from localStorage
- Attaches `Authorization: Bearer {token}` header to all HTTP requests
- Passes through requests without modification if no token exists

---

## Usage Example

### Accessing Protected Routes:
```typescript
// The auth guard will check if user is authenticated
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

### Making Authenticated API Calls:
```typescript
// No need to manually add token - interceptor handles it
this.http.get('https://localhost:7284/api/courses').subscribe(data => {
  console.log(data);
});
```

### Checking Authentication Status:
```typescript
constructor(private authService: AuthService) {
  if (this.authService.isAuthenticated()) {
    // User is logged in
  }
}
```

---

## Notes

- API base URL is configured in `auth.service.ts`: `https://localhost:7284/api/Auth`
- All forms use Angular Reactive Forms with validation
- FontAwesome icons are loaded via CDN
- Cairo font is loaded via Google Fonts CDN
- Components are standalone and lazy-loaded for optimal performance

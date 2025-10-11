# Admin Dashboard - AI Courses Platform

## Overview
The Admin Dashboard is a comprehensive management interface for administrators to oversee and manage all aspects of the AI Courses Platform including courses, instructors, students, enrollments, categories, and analytics.

## Features

### 1. Dashboard (Home)
- **Overview Statistics**: Display total students, courses, enrollments, and instructors
- **Recent Activity**: Show recent enrollments and course activities
- **Quick Actions**: Fast access to common administrative tasks
- **Real-time Metrics**: Active students, pending instructor verifications, course categories

### 2. Analytics
- **Enrollment Overview**: Monthly enrollment trends with visual representation
- **Student Distribution**: Breakdown of active vs enrolled students
- **Performance Metrics**: Course completion rates, student satisfaction, growth rates
- **Top Performers**: Popular courses and top instructors

### 3. Course Management
- **View All Courses**: Comprehensive course listing with search and filter capabilities
- **Course Actions**:
  - Add new courses
  - Edit course information (title, description, price, category, instructor)
  - Delete courses (with confirmation)
  - Manage course categories and pricing

### 4. Instructor Management
- **View All Instructors**: List of all platform instructors
- **Instructor Actions**:
  - Register new instructors
  - Verify instructor credentials
  - View instructor expertise and bio
  - Monitor instructor course assignments

### 5. Enrollment Management
- **View All Enrollments**: Track student course enrollments
- **Enrollment Actions**:
  - Monitor enrollment status (Active, Completed, Cancelled)
  - Cancel enrollments when needed
  - Track student progress
  - View enrollment history by student or instructor

### 6. Category Management
- **View All Categories**: Organize courses into categories
- **Category Actions**:
  - Add new course categories
  - Edit category information
  - Activate/Deactivate categories
  - Monitor courses per category

### 7. Content Management (Modules & Videos)
- **Module Management**: Organize course content into modules
- **Video Management**: Upload and manage course videos
- **Content Actions**:
  - Add modules to courses
  - Upload videos to modules
  - Organize content order
  - Delete outdated content

## Structure

```
Admin/
├── Components/
│   ├── admin-container/     # Main container with sidebar
│   └── admin-sidebar/        # Navigation sidebar with logout
├── Pages/
│   ├── dashboard/           # Main dashboard overview
│   ├── analytics/           # Analytics and reports
│   ├── courses/            # Course management
│   ├── instructors/        # Instructor management
│   ├── enrollments/        # Enrollment management
│   ├── categories/         # Category management
│   └── content/            # Content management (modules & videos)
├── Services/
│   └── admin.service.ts    # API service for all admin operations
├── Interfaces/
│   └── admin.interface.ts  # TypeScript interfaces
└── admin.routes.ts         # Admin routing configuration
```

## Routing

```typescript
/admin
├── /dashboard          - Main dashboard
├── /analytics         - Analytics & reports
├── /courses          - Course management
├── /instructors      - Instructor management
├── /enrollments      - Enrollment management
├── /categories       - Category management
└── /content          - Content management (modules & videos)
```

## Design

### Layout
- **Sidebar Navigation**: Fixed left sidebar with icon-based menu
- **Main Content Area**: Responsive content area with header
- **Header**: Search bar, notifications, and user profile dropdown
- **Responsive**: Mobile-friendly with collapsible sidebar

### Styling
- **Color Scheme**: Professional blue (#4361ee) with accent colors
- **Typography**: Poppins font family
- **Components**: Bootstrap 5 with custom styling
- **Icons**: Font Awesome 6
- **Cards**: White cards with subtle shadows
- **Animations**: Smooth transitions and hover effects

### Key Design Features
- Amazon-like professional UI
- Consistent with the instructor dashboard
- Clean, modern aesthetic
- Intuitive navigation
- Clear visual hierarchy

## API Integration

### Admin Service Methods

**Course Management:**
- `getCourses()` - Get all courses
- `getCourseById(id)` - Get single course
- `createCourse(course)` - Create new course
- `updateCourse(id, course)` - Update course
- `deleteCourse(id)` - Delete course

**Instructor Management:**
- `getInstructors()` - Get all instructors
- `getInstructorById(id)` - Get single instructor
- `registerInstructor(instructor)` - Register new instructor
- `verifyInstructor(id)` - Verify instructor credentials

**Enrollment Management:**
- `getEnrollments()` - Get all enrollments
- `getEnrollmentsByStudent(studentId)` - Get enrollments by student
- `getEnrollmentsByInstructor(instructorId)` - Get enrollments by instructor
- `addEnrollment(enrollment)` - Add new enrollment
- `cancelEnrollment(id)` - Cancel enrollment
- `deleteEnrollment(id)` - Delete enrollment

**Category Management:**
- `getCategories()` - Get all categories
- `getCategoryById(id)` - Get single category
- `createCategory(category)` - Create new category
- `updateCategory(id, category)` - Update category
- `deleteCategory(id)` - Delete category

**Content Management:**
- `getModules()` - Get all modules
- `getModulesByCourse(courseId)` - Get modules by course
- `createModule(module)` - Create new module
- `updateModule(module)` - Update module
- `deleteModule(id)` - Delete module
- `getVideos()` - Get all videos
- `uploadVideo(file, title, moduleId, order)` - Upload video
- `updateVideo(video)` - Update video
- `deleteVideo(id)` - Delete video

**Analytics:**
- `getAnalytics()` - Get comprehensive analytics
- `getDashboardStats()` - Get dashboard statistics

## Error Handling

Each page includes proper error handling and fallback states when API calls fail. Loading states and user feedback are provided for all operations.

## Authentication

- Logout functionality integrated in sidebar
- Clears tokens and user data from localStorage
- Redirects to login page

## Security Notes

- Role-based access control (commented in routes)
- API endpoints should verify admin permissions
- Sensitive operations require confirmation modals
- Token-based authentication with HTTP interceptors

## Usage

1. **Navigate to Admin Dashboard:**
   ```
   http://localhost:4200/admin/dashboard
   ```

2. **Development:**
   - Components are standalone with imports
   - Uses Angular 17+ features
   - Lazy loading for optimal performance

3. **Customization:**
   - Update `admin.service.ts` with actual API endpoints
   - Modify `admin.interface.ts` to match backend DTOs
   - Adjust styling in component CSS files

## Dependencies

- Angular 17+
- Bootstrap 5
- Font Awesome 6
- RxJS
- Angular Router
- Angular Forms

## Future Enhancements

- Real-time dashboard updates with WebSockets
- Export data to CSV/PDF
- Advanced filtering and sorting
- Bulk operations for courses and enrollments
- Email notification system for instructor verification
- Activity logs and audit trails
- Advanced analytics with charts library (Chart.js/D3.js)
- Course recommendation engine
- Student progress tracking
- Automated course completion certificates

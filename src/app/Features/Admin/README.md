# Admin Dashboard

## Overview
The Admin Dashboard is a comprehensive management interface for administrators to oversee and manage all aspects of the platform including users, products, orders, categories, and analytics.

## Features

### 1. Dashboard (Home)
- **Overview Statistics**: Display total users, products, orders, and revenue
- **Recent Activity**: Show recent users and orders
- **Quick Actions**: Fast access to common administrative tasks
- **Real-time Metrics**: Active users, pending orders, low stock alerts

### 2. Analytics
- **Sales Overview**: Monthly sales chart with visual representation
- **User Distribution**: Breakdown of users by role (Student, Instructor, Admin, etc.)
- **Performance Metrics**: Conversion rates, customer satisfaction, growth rates
- **Top Performers**: Best-selling products and top instructors

### 3. User Management
- **View All Users**: Paginated table with search and filter capabilities
- **User Actions**:
  - Activate/Deactivate users
  - Edit user information (name, email, phone, role, status)
  - Delete users (with confirmation)
- **Role Management**: Assign roles (Student, Instructor, Admin, Seller, Customer)
- **Status Control**: Active, Inactive, Suspended

### 4. Product Management
- **View All Products**: Searchable product list with details
- **CRUD Operations**:
  - Create new products
  - Edit product details (name, description, price, stock, status)
  - Delete products
  - Approve pending products
- **Stock Monitoring**: Track product inventory levels
- **Status Management**: Draft, Published, Archived

### 5. Order Management
- **View All Orders**: Complete order history with search
- **Order Details**: View full order information including items and customer data
- **Status Updates**: 
  - Mark orders as Processing, Shipped, Delivered, or Cancelled
  - Track payment status (Pending, Paid, Failed, Refunded)
- **Customer Information**: Access customer details for each order

### 6. Category Management
- **View Categories**: Grid layout of all product categories
- **CRUD Operations**:
  - Add new categories
  - Edit category details
  - Delete categories
  - Toggle active/inactive status
- **Product Count**: Display number of products per category

## Structure

```
Admin/
├── Components/
│   ├── admin-container/     # Main container with sidebar
│   └── admin-sidebar/        # Navigation sidebar with logout
├── Pages/
│   ├── dashboard/           # Main dashboard overview
│   ├── analytics/           # Analytics and reports
│   ├── users/              # User management
│   ├── products/           # Product management
│   ├── orders/             # Order management
│   └── categories/         # Category management
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
├── /users            - User management
├── /products         - Product management
├── /orders           - Order management
└── /categories       - Category management
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

**User Management:**
- `getUsers(params)` - Get paginated users
- `getUserById(id)` - Get single user
- `createUser(user)` - Create new user
- `updateUser(id, user)` - Update user
- `deleteUser(id)` - Delete user
- `activateUser(id)` - Activate user
- `deactivateUser(id)` - Deactivate user

**Product Management:**
- `getProducts(params)` - Get paginated products
- `getProductById(id)` - Get single product
- `createProduct(product)` - Create product
- `updateProduct(id, product)` - Update product
- `deleteProduct(id)` - Delete product
- `approveProduct(id)` - Approve product

**Order Management:**
- `getOrders(params)` - Get paginated orders
- `getOrderById(id)` - Get single order
- `updateOrder(id, order)` - Update order
- `deleteOrder(id)` - Delete order

**Category Management:**
- `getCategories(params)` - Get categories
- `getCategoryById(id)` - Get single category
- `createCategory(category)` - Create category
- `updateCategory(id, category)` - Update category
- `deleteCategory(id)` - Delete category

**Analytics:**
- `getAnalytics()` - Get comprehensive analytics
- `getDashboardStats()` - Get dashboard statistics

## Mock Data

Each page includes mock data fallback for development/testing when API is unavailable. This allows frontend development to proceed independently.

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
- Bulk operations for users/products
- Email notification system
- Activity logs and audit trails
- Advanced analytics with charts library (Chart.js/D3.js)
- Role and permission management system

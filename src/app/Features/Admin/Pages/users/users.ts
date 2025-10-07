import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { IUser, IPaginationParams } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class AdminUsers implements OnInit {
  users: IUser[] = [];
  loading = false;
  searchTerm = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;

  // Filters
  selectedRole = '';
  selectedStatus = '';

  // Modal states
  showDeleteModal = false;
  showEditModal = false;
  selectedUser: IUser | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    const params: IPaginationParams = {
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchTerm
    };

    this.adminService.getUsers(params).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.setMockUsers();
        this.loading = false;
      }
    });
  }

  setMockUsers() {
    this.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Student',
        status: 'Active',
        createdAt: new Date('2024-01-15'),
        lastLogin: new Date('2024-10-01'),
        phone: '+1234567890'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Instructor',
        status: 'Active',
        createdAt: new Date('2024-02-20'),
        lastLogin: new Date('2024-10-03'),
        phone: '+1234567891'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        role: 'Student',
        status: 'Inactive',
        createdAt: new Date('2024-03-10'),
        lastLogin: new Date('2024-09-15'),
        phone: '+1234567892'
      }
    ];
    this.totalCount = 3;
    this.totalPages = 1;
  }

  onSearch() {
    this.currentPage = 1;
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  activateUser(user: IUser) {
    this.adminService.activateUser(user.id).subscribe({
      next: () => {
        user.status = 'Active';
        alert('User activated successfully');
      },
      error: (error) => {
        console.error('Error activating user:', error);
        alert('Failed to activate user');
      }
    });
  }

  deactivateUser(user: IUser) {
    this.adminService.deactivateUser(user.id).subscribe({
      next: () => {
        user.status = 'Inactive';
        alert('User deactivated successfully');
      },
      error: (error) => {
        console.error('Error deactivating user:', error);
        alert('Failed to deactivate user');
      }
    });
  }

  editUser(user: IUser) {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }

  confirmDelete(user: IUser) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  deleteUser() {
    if (this.selectedUser) {
      this.adminService.deleteUser(this.selectedUser.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== this.selectedUser?.id);
          this.showDeleteModal = false;
          this.selectedUser = null;
          alert('User deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      });
    }
  }

  saveUser() {
    if (this.selectedUser) {
      this.adminService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.showEditModal = false;
          this.selectedUser = null;
          alert('User updated successfully');
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user');
        }
      });
    }
  }

  closeModals() {
    this.showDeleteModal = false;
    this.showEditModal = false;
    this.selectedUser = null;
  }

  getRoleBadgeClass(role: string): string {
    const roleMap: { [key: string]: string } = {
      'Student': 'primary',
      'Instructor': 'success',
      'Admin': 'danger',
      'Seller': 'warning',
      'Customer': 'info'
    };
    return roleMap[role] || 'secondary';
  }

  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Active': 'success',
      'Inactive': 'secondary',
      'Suspended': 'danger'
    };
    return statusMap[status] || 'secondary';
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin.service';
import { ICategory } from '../../Interfaces/admin.interface';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class AdminCategories implements OnInit {
  categories: ICategory[] = [];
  loading = false;

  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedCategory: ICategory | null = null;

  newCategory: any = {
    name: '',
    description: '',
    isActive: true
  };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCategories();
    this.cdr.detectChanges();
  }

  loadCategories() {
    this.loading = true;
    this.adminService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.map((cat: any) => ({
          id: cat.id as number,
          name: cat.name,
          description: cat.description || '',
          isActive: cat.isActive,
          coursesCount: cat.coursesCount || 0,
          createdAt: cat.createdAt || new Date()
        } as ICategory));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading = false;
      }
    });
  }


  showAddCategoryModal() {
    this.newCategory = {
      name: '',
      description: '',
      isActive: true
    };
    this.showAddModal = true;
  }

  addCategory() {
    const categoryData = {
      name: this.newCategory.name,
      description: this.newCategory.description,
      isActive: this.newCategory.isActive
    };

    this.adminService.createCategory(categoryData).subscribe({
      next: (category: any) => {
        this.categories.push({
          id: category.id as number,
          name: category.name,
          description: category.description || '',
          isActive: category.isActive,
          coursesCount: 0,
          createdAt: new Date()
        } as ICategory);
        this.showAddModal = false;
        alert('Category created successfully');
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error creating category:', error);
        alert('Failed to create category');
      }
    });
  }

  editCategory(category: ICategory) {
    this.selectedCategory = { ...category };
    this.showEditModal = true;
  }

  updateCategory() {
    if (this.selectedCategory) {
      const updateData = {
        id: this.selectedCategory.id,
        name: this.selectedCategory.name,
        description: this.selectedCategory.description,
        isActive: this.selectedCategory.isActive
      };

      this.adminService.updateCategory(this.selectedCategory.id, updateData).subscribe({
        next: (updated: any) => {
          const index = this.categories.findIndex(c => c.id === this.selectedCategory?.id);
          if (index !== -1) {
            this.categories[index] = {
              id: updated.id as number,
              name: updated.name,
              description: updated.description || '',
              isActive: updated.isActive,
              coursesCount: this.categories[index].coursesCount,
              createdAt: updated.createdAt || this.categories[index].createdAt
            } as ICategory;
          }
          this.showEditModal = false;
          alert('Category updated successfully');
        },
        error: (error) => {
          console.error('Error updating category:', error);
          alert('Failed to update category');
        }
      });
    }
  }

  confirmDelete(category: ICategory) {
    this.selectedCategory = category;
    this.showDeleteModal = true;
  }

  deleteCategory() {
    if (this.selectedCategory) {
      this.adminService.deleteCategory(this.selectedCategory.id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== this.selectedCategory?.id);
          this.showDeleteModal = false;
          alert('Category deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          alert('Failed to delete category');
        }
      });
    }
  }

  closeModals() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedCategory = null;
  }
}

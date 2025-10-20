import { Component, OnInit } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar/navbar";
import { Hero } from "../../components/HeroSection/hero/hero";
import { Features } from "../../components/Features/features/features";
import { CourseService } from '../../../../Core/services/Course/course-service';
import { IAllCourses } from '../../../../Core/interfaces/Course/iall-courses';
import { CategoryService } from '../../../../Core/services/Category/category-service';
import { IAllCategories } from '../../../../Core/interfaces/Category/iall-categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homecontainer',
  imports: [Navbar, Hero, Features, RouterLink],
  templateUrl: './homecontainer.html',
  styleUrl: './homecontainer.css'
})
export class Homecontainer implements OnInit {
  constructor(private service: CourseService, private categoryService: CategoryService) {}

  FilterCoursesByCategory: IAllCourses[] = [];
  FilterCoursesByFirstCategory: IAllCourses[] = [];
  FilterCoursesBySecondCategory: IAllCourses[] = [];

  firstCategoryIndex: number = 0;
  secondCategoryIndex: number = 0;
  allCategories: IAllCategories[] = [];

  currentCategory!: IAllCategories;
  secondCategory!: IAllCategories;

  allCategoriesName: string[] = [];

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response as [];
        this.allCategoriesName = response.map(cat => cat.name);

        // Prevent crash if there are no categories
        if (this.allCategoriesName.length < 2) return;

        // Pick two random categories
        this.firstCategoryIndex = Math.floor(Math.random() * this.allCategoriesName.length);
        this.secondCategoryIndex = Math.floor(Math.random() * this.allCategoriesName.length);
        while (this.secondCategoryIndex === this.firstCategoryIndex) {
          this.secondCategoryIndex = Math.floor(Math.random() * this.allCategoriesName.length);
        }

        // Load courses for first category
        this.service.GetCourseByCategoryName(this.allCategoriesName[this.firstCategoryIndex]).subscribe({
          next: (response) => {
            this.currentCategory = this.allCategories.find(c => c.name === this.allCategoriesName[this.firstCategoryIndex])!;
            this.FilterCoursesByFirstCategory = response.slice(0, 6);
          }
        });

        // Load courses for second category
        this.service.GetCourseByCategoryName(this.allCategoriesName[this.secondCategoryIndex]).subscribe({
          next: (response) => {
            this.secondCategory = this.allCategories.find(c => c.name === this.allCategoriesName[this.secondCategoryIndex])!;
            this.FilterCoursesBySecondCategory = response.slice(0, 6);
          }
        });
      }
    });
  }
  getImageUrl(fileName: string): string {
  if (!fileName) {
    return 'https://tse2.mm.bing.net/th/id/OIP.Ct30McAoRmpZ0OH8ii6oeAHaHa?pid=Api&P=0&h=220';
  }

  // 👇 change this to your backend base URL
  const baseUrl = 'http://localhost:5075/uploads/';
  return `${baseUrl}${fileName}`;
}

}

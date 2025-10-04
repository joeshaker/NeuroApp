import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../Core/services/Category/category-service';
import { IAllCategories } from '../../../../Core/interfaces/Category/iall-categories';

@Component({
  selector: 'app-add-course',
  imports: [],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse implements OnInit {

  AllCategories: IAllCategories[] = [];

  constructor(private service: CategoryService , private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
   this.service.GetAllCategories().subscribe({
      next: (response) => {
       console.log(response);
       this.cdr.detectChanges();
       this.AllCategories = response;

      }

    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllCourses } from '../../interfaces/Course/iall-courses';
import { IAddCourse } from '../../interfaces/Course/iadd-course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  /**
   *
   */
  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:5075/api/Course';


  GetAllCourses():Observable<IAllCourses[]> {
    return this.http.get<IAllCourses[]>(this.baseUrl);
  }



  AddCourse(course : IAddCourse) {
    this.http.post(this.baseUrl, course);
  }
}

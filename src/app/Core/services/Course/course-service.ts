import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllCourses } from '../../interfaces/Course/iall-courses';
import { IAddCourse } from '../../interfaces/Course/iadd-course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:5075/api/Course';


  GetAllCourses():Observable<IAllCourses[]> {
    return this.http.get<IAllCourses[]>(this.baseUrl);
  }


  // AddCourse(course : IAddCourse) : any  {
  //    return  this.http.post(this.baseUrl, course);
  // }

AddCourse(courseForm: FormData): any {
  return this.http.post(this.baseUrl, courseForm);
}

  ViewCourseDetails(id:number):Observable<IAllCourses[]> {
    return this.http.get<IAllCourses[]>(`${this.baseUrl}/${id}`);
  }

  EditCourse(id:number , EditCourse :IAddCourse ):Observable<IAddCourse> {
    return this.http.put<IAddCourse>(`${this.baseUrl}/${id}`, EditCourse);
  }


  GetCourseById(id: number):Observable<IAllCourses> {
  return  this.http.get<IAllCourses>(`${this.baseUrl}/${id}`)
  }

  GetCoursesByInstructorId(id: number):Observable<IAllCourses[]> {
    return this.http.get<IAllCourses[]>(`${this.baseUrl}/GetCourseByInsId/${id}`);
  }


  GetCourseByCategoryName(categoryName:string) :Observable<IAllCourses[]>  {
   return this.http.get<IAllCourses[]>(`${this.baseUrl}/GetByCategoryName/${categoryName}`)
  }


}

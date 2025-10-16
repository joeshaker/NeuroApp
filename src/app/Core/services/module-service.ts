import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface VideoDto {
  id: number;
  title: string;
  filePath: string;
  duration: number;
  videoArrangement: number;
}

export interface CourseDto {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  isFree: boolean;
  instructorId: number;
}

export interface GetModuleDto {
  id: number;
  title: string;
  moduleArrangement: number;
  courseId: number;
  course?: CourseDto;   // optional (if included in API response)
  videos?: VideoDto[];  // optional (if included in API response)
}

export interface ModuleDto {
  title: string;
  moduleArrangement: number;
  courseId: number;
}

export interface UpdateModuleDto {
  id: number;
  title: string;
  moduleArrangement: number;
  courseId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = 'http://localhost:5075'; // change if different

  constructor(private http: HttpClient) {}

  addModule(data: ModuleDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Module`, data);
  }

  // Get a single module by ID (uses GetModuleDto because backend returns full data)
  getModuleById(id: number): Observable<GetModuleDto> {
    return this.http.get<GetModuleDto>(`${this.baseUrl}/api/Module/${id}`);
  }

  // Get all modules (also GetModuleDto)
  getAllModules(): Observable<GetModuleDto[]> {
    return this.http.get<GetModuleDto[]>(`${this.baseUrl}/api/Module`);
  }

updateModule(module: UpdateModuleDto & { id: number }): Observable<any> {
  return this.http.put(`${this.baseUrl}/api/Module`, module);
}


  // Get all courses


  // Get all courses
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Course`);
  }

  getAllModulesByCourseId(courseId: number): Observable<GetModuleDto[]> {
    return this.http.get<GetModuleDto[]>(`${this.baseUrl}/api/Module/GetModulesByCrsID/${courseId}`);
  }

  getModulesByInstructorId(instructorId: number): Observable<GetModuleDto[]> {
    return this.http.get<GetModuleDto[]>(`${this.baseUrl}/api/Module/GetModulesByInstID/${instructorId}`);
  }
}

// src/app/Core/services/video-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VideoCreateDto {
  id?: number;
  title: string;
  filePath?: string;          // backend sets after upload
  duration?: number;          // backend sets after upload
  videoArrangement: number;
  moduleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:5075'; // adjust if different

  constructor(private http: HttpClient) {}

  // ✅ Upload a video with file + metadata
  addVideo(file: File, title: string, moduleId: number, videoArrangement: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('moduleId', moduleId.toString());
    formData.append('videoarrang', videoArrangement.toString());

    return this.http.post(`${this.baseUrl}/api/Video/upload`, formData);
  }

  getAllVideos(): Observable<VideoCreateDto[]> {
    return this.http.get<VideoCreateDto[]>(`${this.baseUrl}/api/Video/GetAllVideos`);
  }

  getVideoById(id: number): Observable<VideoCreateDto> {
    return this.http.get<VideoCreateDto>(`${this.baseUrl}/api/Video/GetVideoById${id}`);
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/Video/DeleteVideo/${id}`);
  }

  getVideosByInstructorId(instructorId: number): Observable<VideoCreateDto[]> {
    return this.http.get<VideoCreateDto[]>(`${this.baseUrl}/api/Video/GetByInsId/${instructorId}`);
  }
}

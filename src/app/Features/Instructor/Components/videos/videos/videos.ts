import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoCreateDto, VideoService } from '../../../../../Core/services/Videoservice/videoservice';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { JwtService } from '../../../../../Core/services/jwt.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './videos.html',
  styleUrl: './videos.css'
})
export class Videos implements OnInit {
  videos: VideoCreateDto[] = [];
  gridView: boolean = true;
  searchText: string = '';
  loading: boolean = true;

  constructor(private videoService: VideoService , private cdr: ChangeDetectorRef,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    const instructorId = this.jwtService.getEntityId(); // Get the instructor ID from the JWT token
    if (!instructorId) {
      console.error('Instructor ID not found in token');
      this.loading = false;
      return;
    }
    const id = Number(instructorId);
    this.videoService.getVideosByInstructorId(id).subscribe({
      next: (data) => {
        this.videos = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
        this.loading = false;
      }
    });
  }

deleteVideo(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.videoService.deleteVideo(id).subscribe({
        next: () => {
          this.videos = this.videos.filter(v => v.id !== id);
          this.cdr.detectChanges();

          Swal.fire({
            title: 'Deleted!',
            text: 'The video has been deleted.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting the video.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  });
}
openVideo(videoUrl: string): void {
  if (!videoUrl) {
    Swal.fire({
      icon: 'error',
      title: 'No video URL found',
      text: 'This video does not have a valid link.',
    });
    return;
  }

  const fullUrl = `http://localhost:5075${videoUrl}`;
  console.log('Opening video URL:', fullUrl);
  const iframePage = `
    <html>
      <head>
        <title>Video Player</title>
        <style>
          body { margin: 0; background-color: #000; display: flex; justify-content: center; align-items: center; height: 100vh; }
          iframe { width: 80%; height: 80%; border: none; border-radius: 10px; box-shadow: 0 0 20px rgba(255,255,255,0.2); }
        </style>
      </head>
      <body>
        <iframe src="${fullUrl}" allowfullscreen></iframe>
      </body>
    </html>
  `;

  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(iframePage);
    newWindow.document.close();
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Popup Blocked',
      text: 'Please allow popups to open the video in a new tab.',
    });
  }
}



  toggleView(isGrid: boolean): void {
    this.gridView = isGrid;
  }

  get filteredVideos(): VideoCreateDto[] {
    if (!this.searchText) return this.videos;
    return this.videos.filter(v =>
      v.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  get totalDuration(): number {
  return this.videos.reduce((sum, v) => sum + (v.duration || 0), 0);
}

}

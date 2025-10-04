import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VideoService } from '../../../../../Core/services/Videoservice/videoservice';

@Component({
  selector: 'app-add-video',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-video.html',
  styleUrl: './add-video.css'
})
export class AddVideo {
  title: string = '';
  videoArrangement: number = 1;
  moduleId: number = 0;
  file: File | null = null;

  constructor(private videoService: VideoService, private router: Router) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (!this.title || !this.moduleId || !this.file) {
      alert('Please fill all required fields and select a video file');
      return;
    }

    this.videoService.addVideo(this.file, this.title, this.moduleId, this.videoArrangement)
      .subscribe({
        next: () => {
          alert('Video created successfully!');
          this.router.navigate(['/instructor/Videos']); // adjust route if needed
        },
        error: (err) => {
          console.error('Error uploading video', err);
          alert('Failed to create video');
        }
      });
  }
}

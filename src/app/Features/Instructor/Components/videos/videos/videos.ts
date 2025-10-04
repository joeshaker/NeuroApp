import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoCreateDto, VideoService } from '../../../../../Core/services/Videoservice/videoservice';
import { FormsModule } from '@angular/forms';

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

  constructor(private videoService: VideoService , private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getAllVideos().subscribe({
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
    if (confirm('Are you sure you want to delete this video?')) {
      this.videoService.deleteVideo(id).subscribe(() => {
        this.videos = this.videos.filter(v => v.id !== id);
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Navbar } from "../Home/components/navbar/navbar/navbar";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Navbar],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isLoading = true;
  error: string | null = null;
  private readonly API_BASE = 'http://localhost:5075/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(`${this.API_BASE}/Auth/me`).subscribe({
      next: (u) => {
        this.user = u;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user profile';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  get avatarUrl(): string {
    return 'https://randomuser.me/api/portraits/men/41.jpg';
  }
}

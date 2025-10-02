import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Instructorcontainer } from "./Features/Instructor/InstructorContainer/instructorcontainer/instructorcontainer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Instructorcontainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NeuroApp');
}

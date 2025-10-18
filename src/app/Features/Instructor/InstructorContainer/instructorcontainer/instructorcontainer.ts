import { Component } from '@angular/core';
import { InsSidebar } from "../../Components/InsSidebar/ins-sidebar/ins-sidebar";
import { InsdashboardComponent } from "../../Components/Dashboard/insdashboard/insdashboard";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-instructorcontainer',
  imports: [InsSidebar,RouterOutlet],
  templateUrl: './instructorcontainer.html',
  styleUrl: './instructorcontainer.css'
})
export class Instructorcontainer {

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InsSidebar } from '../../../../Features/Instructor/Components/InsSidebar/ins-sidebar/ins-sidebar';

@Component({
  selector: 'app-simple-layout',
  imports: [RouterOutlet,InsSidebar],
  templateUrl: './simple-layout.html',
  styleUrl: './simple-layout.css'
})
export class SimpleLayout {

}

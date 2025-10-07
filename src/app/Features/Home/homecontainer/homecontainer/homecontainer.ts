import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar/navbar";
import { Hero } from "../../components/HeroSection/hero/hero";
import { Features } from "../../components/Features/features/features";

@Component({
  selector: 'app-homecontainer',
  imports: [Navbar, Hero, Features],
  templateUrl: './homecontainer.html',
  styleUrl: './homecontainer.css'
})
export class Homecontainer {

}

import { Component } from '@angular/core';
import { BannerHomeComponent } from './section/banner-home/banner-home.component';
import { GalleryHomeComponent } from './section/gallery-home/gallery-home.component';
import { NavHomeComponent } from "./section/nav-home/nav-home.component";
import { FooterHomeComponent } from "./section/footer-home/footer-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerHomeComponent, GalleryHomeComponent, NavHomeComponent, FooterHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

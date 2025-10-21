import { Component, OnInit } from '@angular/core';
import { BannerHomeComponent } from './section/banner-home/banner-home.component';
import { GalleryHomeComponent } from './section/gallery-home/gallery-home.component';
import { NavHomeComponent } from "./section/nav-home/nav-home.component";
import { FooterHomeComponent } from "./section/footer-home/footer-home.component";
import { BlockUrlService } from '@/app/provider/services/block-url.service';


@Component({
  selector: 'app-home',
  imports: [BannerHomeComponent, GalleryHomeComponent, NavHomeComponent, FooterHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  cartItems: any[] = []
  wishlistCount: number = 0;

  constructor(private blockurl: BlockUrlService) { }
  ngOnInit(): void {
    this.blockurl.revokeAcess()
  }

  updateWishlistCount(count: number) {
    this.wishlistCount = count;  // Updates wishlist count
  }

  updateAddtocart(item: any[]) {
    this.cartItems = item;
  }
}

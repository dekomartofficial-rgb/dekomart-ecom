import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gallery-home',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.css',
})
export class GalleryHomeComponent implements OnInit {

 @Output() wishlistUpdated = new EventEmitter<number>() 
 @Output() addToCartUpdated = new EventEmitter<number>() 


  imageCircle = [
    { name: 'Metal Wall Art', image: 'assets/landing-page-images/metal-wall.jpg' },
    { name: 'Designer Shelves', image: 'assets/landing-page-images/shelves.jpg' },
    { name: 'Wall Clocks', image: 'assets/landing-page-images/home-round1.jpg' },
    { name: 'Designer Tables', image: 'assets/landing-page-images/table-round.jpg' },
    { name: 'Photo Frame Sets', image: 'assets/landing-page-images/photo-frame.jpg' },
    { name: 'Wallpaper', image: 'assets/landing-page-images/wallpaper.jpg' },
    { name: 'Temples', image: 'assets/landing-page-images/temple.jpg' },
  ];

  productvdio = [
    { video: 'assets/landing-page-images/hsv-temple.mp4' },
    { video: 'assets/landing-page-images/hmetal-art.mp4' },
    { video: 'assets/landing-page-images/hv-shelves.mp4' },
    { video: 'assets/landing-page-images/hv-clock.mp4' },
    { video: 'assets/landing-page-images/hv-table.mp4' },
    { video: 'assets/landing-page-images/hv-temple.mp4' },
  ];

  bestSelling = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Vintage Mirror',
      image: 'assets/landing-page-images/wallpaper.jpg',
      description: 'Classic wall mirror',
      originalPrice: 3499,
      offerPrice: 2799,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false,
      addToCart: false
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false,
      addToCart: false

    },
  ];

  canvasPaintings = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    }
  ];
     loungeChairs = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    }
  ];

  getDiscount(original: number, offer: number): number {
    return Math.round(((original - offer) / original) * 100);
  }

//wishlist
  toggleWishlist(item: any) {

    item.wishlisted = !item.wishlisted; 

     // Update the bestSelling array with the modified item
   this.bestSelling = this.bestSelling.map((product) =>
    product.name === item.name ? { ...product, wishlisted: item.wishlisted } : product

  );


  const wishlistCount = this.bestSelling.filter(product => product.wishlisted).length;
  
  this.wishlistUpdated.emit(wishlistCount);  

  } 

  // add-to-cart
  ToggleAddToCart(item:any){

    item.addToCart = !item.addToCart
    console.log(item)

    const addtocartCount = this.bestSelling.filter(product => product.addToCart).length;
    this.addToCartUpdated.emit(addtocartCount)

  }
  

  ngOnInit() {}
}
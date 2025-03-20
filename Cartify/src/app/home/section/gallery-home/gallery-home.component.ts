import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  reviewCount: number;
  isNew: boolean;
}
@Component({
  selector: 'app-gallery-home',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.css',
})
export class GalleryHomeComponent implements OnInit {

 @Output() wishlistUpdated = new EventEmitter<number>() 


  imageCircle = [
    { name: 'Metal Wall Art', image: 'assets/landing-page-assets/landing-page-images/metal-wall.jpg' },
    { name: 'Designer Shelves', image: 'assets/landing-page-assets/landing-page-images/shelves.jpg' },
    { name: 'Wall Clocks', image: 'assets/landing-page-assets/landing-page-images/home-round1.jpg' },
    { name: 'Designer Tables', image: 'assets/landing-page-assets/landing-page-images/table-round.jpg' },
    { name: 'Photo Frame Sets', image: 'assets/landing-page-assets/landing-page-images/photo-frame.jpg' },
    { name: 'Wallpaper', image: 'assets/landing-page-assets/landing-page-images/wallpaper.jpg' },
    { name: 'Temples', image: 'assets/landing-page-assets/landing-page-images/temple.jpg' },
  ];

  productvdio = [
<<<<<<< HEAD
    // { video: 'assets/landing-page-assets/landing-page-images/v-temple.mp4' },
    // { video: 'assets/landing-page-assets/landing-page-images/metal-art.mp4' },
    // { video: 'assets/landing-page-assets/landing-page-images/v-shelves.mp4' },
    // { video: 'assets/landing-page-assets/landing-page-images/v-clock.mp4' },
    // { video: 'assets/landing-page-assets/landing-page-images/v-table.mp4' },
    // { video: 'assets/landing-page-assets/landing-page-images/v-temple.mp4' },
=======
    { video: 'asset/images/v-temple.mp4' },
    { video: 'asset/images/metal-art.mp4' },
    { video: 'asset/images/v-shelves.mp4' },
    { video: 'asset/images/v-clock.mp4' },
    { video: 'asset/images/v-table.mp4' },
    { video: 'asset/images/v-temple.mp4' },
>>>>>>> a0ad46f8a3d7d0f4be6f5b171b0c68b1084e9281
  ];

  bestSelling = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
    },
    {
      name: 'Vintage Mirror',
      image: 'assets/landing-page-assets/landing-page-images/wallpaper.jpg',
      description: 'Classic wall mirror',
      originalPrice: 3499,
      offerPrice: 2799,
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
    },
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
    },
  ];

  canvasPaintings = [
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false
    },
    {
      name: 'Designer Lamp',
      image: 'assets/landing-page-images/metal-wall.jpg',
      description: 'Ambient LED lamp',
      originalPrice: 1299,
      offerPrice: 999,
<<<<<<< HEAD
    }
  ];
     loungeChairs = [
=======
      wishlisted: false
    },
    {
      name: 'Vintage Mirror',
      image: 'assets/landing-page-images/wallpaper.jpg',
      description: 'Classic wall mirror',
      originalPrice: 3499,
      offerPrice: 2799,
      wishlisted: false
    },
    {
      name: 'Wooden Wall Shelf',
      image: 'assets/landing-page-images/shelves.jpg',
      description: 'Stylish wooden shelf',
      originalPrice: 1999,
      offerPrice: 1499,
      wishlisted: false
    },
>>>>>>> a0ad46f8a3d7d0f4be6f5b171b0c68b1084e9281
    {
      name: 'Luxury Wall Clock',
      image: 'assets/landing-page-images/home-round1.jpg',
      description: 'Premium wooden clock',
      originalPrice: 2999,
      offerPrice: 2499,
      wishlisted: false
    },
    {
      name: 'Modern Art Painting',
      image: 'assets/landing-page-images/photo-frame.jpg',
      description: 'Canvas painting for home',
      originalPrice: 4499,
      offerPrice: 3999,
      wishlisted: false

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

  toggleWishlist(item: any) {

    item.wishlisted = !item.wishlisted; 

     // Update the bestSelling array with the modified item
  this.bestSelling = this.bestSelling.map((product) =>
    product.name === item.name ? { ...product, wishlisted: item.wishlisted } : product

  );


  const wishlistCount = this.bestSelling.filter(product => product.wishlisted).length;
  
  this.wishlistUpdated.emit(wishlistCount);  

  }  
  ngOnInit() {}
}

import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gallery-home',
  imports: [CarouselModule, CommonModule, DialogModule, ButtonModule, CardModule],
  templateUrl: './gallery-home.component.html',
  styleUrl: './gallery-home.component.css',
})
export class GalleryHomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  @ViewChild('reelVideo') reelVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;


  currentPage = 0;
  productsPerPage = 4;
  selectedProduct: any;
  selectedVariant: any;
  productCardWidth = 180;
  isPaused: boolean = false;
  selectedSize: string = '';
  displayModal: boolean = false;
  displayDialog: boolean = false;
  filter: string = 'BEST SELLER';
  sizes = ['S - 38', 'M - 40', 'L - 42', 'XL - 44', '2XL - 46'];

  @Output() wishlistUpdated = new EventEmitter<number>()
  @Output() addToCartUpdated = new EventEmitter<any[]>()
  wishlistedItems = new Set<number>();
  cartItems = new Set<number>();

  variants = [
    { id: 1, color: 'Grey', image: 'assets/grey-variant.jpg' },
    { id: 2, color: 'Black', image: 'assets/black-variant.jpg' },
    { id: 3, color: 'Blue', image: 'assets/blue-variant.jpg' }
  ];

  listingProducts = [
    {
      image: 'assets/landing-page-images/carpet.png',
      title: 'Carpet',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/indian-blue-pottery-rug.png',
      title: 'Indian Blue Pottery Rug',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/minimalist-wooden-altar.png',
      title: 'Mininalist Wooden Altar',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/office-sofa-set.png',
      title: 'Office Sofa Set',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/parametric-wood-wall.png',
      title: 'Parametric Wood Wall',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/photo-border.png',
      title: 'Photo Border',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/photo-frame.png',
      title: 'Photo Frame',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/sustainable-carry-bags.png',
      title: 'Sustainable Carry Bags',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/T-shirt.png',
      title: 'Black Printed T-Shirt',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/carpet.png',
      title: 'Carpet',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/indian-blue-pottery-rug.png',
      title: 'Indian Blue Pottery Rug',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/minimalist-wooden-altar.png',
      title: 'Mininalist Wooden Altar',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/office-sofa-set.png',
      title: 'Office Sofa Set',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/parametric-wood-wall.png',
      title: 'Parametric Wood Wall',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/photo-border.png',
      title: 'Photo Border',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/photo-frame.png',
      title: 'Photo Frame',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/sustainable-carry-bags.png',
      title: 'Sustainable Carry Bags',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/T-shirt.png',
      title: 'Black Printed T-Shirt',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
  ];

  sections = [
  {
    header: 'FEATURED COLLECTION',
    subheader: 'CASUAL',
    products: [
    {
      image: 'assets/landing-page-images/carpet.png',
      title: 'Carpet',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/indian-blue-pottery-rug.png',
      title: 'Indian Blue Pottery Rug',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/minimalist-wooden-altar.png',
      title: 'Mininalist Wooden Altar',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/office-sofa-set.png',
      title: 'Office Sofa Set',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/parametric-wood-wall.png',
      title: 'Parametric Wood Wall',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/photo-border.png',
      title: 'Photo Border',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/photo-frame.png',
      title: 'Photo Frame',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/sustainable-carry-bags.png',
      title: 'Sustainable Carry Bags',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/T-shirt.png',
      title: 'Black Printed T-Shirt',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    ]
  },
  {
    header: 'SUMMER SPECIAL',
    subheader: 'BEACHWEAR',
    products: [
    {
      image: 'assets/landing-page-images/carpet.png',
      title: 'Carpet',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/indian-blue-pottery-rug.png',
      title: 'Indian Blue Pottery Rug',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/minimalist-wooden-altar.png',
      title: 'Mininalist Wooden Altar',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/office-sofa-set.png',
      title: 'Office Sofa Set',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/parametric-wood-wall.png',
      title: 'Parametric Wood Wall',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/photo-border.png',
      title: 'Photo Border',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/photo-frame.png',
      title: 'Photo Frame',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/sustainable-carry-bags.png',
      title: 'Sustainable Carry Bags',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/T-shirt.png',
      title: 'Black Printed T-Shirt',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    ]
  },
   {
    header: 'SUMMER SPECIAL',
    subheader: 'BEACHWEAR',
    products: [
    {
      image: 'assets/landing-page-images/carpet.png',
      title: 'Carpet',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/indian-blue-pottery-rug.png',
      title: 'Indian Blue Pottery Rug',
      brand: 'Lujo',
      price: 2599,
      tag: 'BEST SELLER',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/minimalist-wooden-altar.png',
      title: 'Mininalist Wooden Altar',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/office-sofa-set.png',
      title: 'Office Sofa Set',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/parametric-wood-wall.png',
      title: 'Parametric Wood Wall',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/photo-border.png',
      title: 'Photo Border',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/photo-frame.png',
      title: 'Photo Frame',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    {
      image: 'assets/landing-page-images/sustainable-carry-bags.png',
      title: 'Sustainable Carry Bags',
      brand: 'Lujo',
      price: 2799,
      tag: 'BEST SELLER',
      isWishlisted: true,
    },
    {
      image: 'assets/landing-page-images/T-shirt.png',
      title: 'Black Printed T-Shirt',
      brand: 'Saddy',
      price: 2599,
      tag: 'NEW ARRIVAL',
      isWishlisted: false,
    },
    ]
  }
  // more sections...
];

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = this.reelVideoRef.nativeElement;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.8 });

    observer.observe(this.reelVideoRef.nativeElement);
  }

  togglePlay() {
    const video = this.reelVideoRef.nativeElement;
    if (video.paused) {
      video.play();
      this.isPaused = false;
    } else {
      video.pause();
      this.displayModal = true;
      this.isPaused = true;
    }
  }

  openModal() {
    this.displayModal = true;
  }

  closeModel() {
    this.displayDialog = false;
    this.displayModal = false;
  }

  get filteredProducts() {
    return this.listingProducts.filter((p) => p.tag === this.filter);
  }

  scrollLeft(section: any) {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  }

  scrollRight(section: any) {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  }

  goToProductListing() {
  return this.router.navigateByUrl('/user/product-listing');
}

  isWishlisted(item: any): boolean {
    return this.wishlistedItems.has(item.id);
  }

  isInCart(item: any): boolean {
    return this.cartItems.has(item.id);
  }

  toggleWishlist(product: any) {
    product.isWishlisted = !product.isWishlisted;
    // Add your wishlist logic here
  }

  addToCart(product: any) {
    // Add your cart logic here
    console.log('Added to cart:', product);
  }

  showProductDetails(product: any) {
    this.selectedProduct = this.listingProducts[0];
    console.log('Selected Product:', this.selectedProduct);
    this.displayDialog = true;
    this.selectedSize = '40- M';
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
  }
}
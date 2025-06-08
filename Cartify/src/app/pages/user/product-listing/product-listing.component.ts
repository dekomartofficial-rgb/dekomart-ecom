import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  imports: [CommonModule, CardModule, ButtonModule, RatingModule, FormsModule, DropdownModule, InputNumberModule, ToolbarModule, SplitButtonModule, BreadcrumbModule,DividerModule],
  standalone: true,
  styleUrl:'./product-listing.component.css'
})
export class ProductListingComponent {
  product = {
    name: 'PALE ORANGE DIGI PRINT SHIRT',
    price: 1249.00,
    description: 'Hemmis pale orange digital print shirt. Blend of polyester and viscose slim fit shirt.',
    sizes: ['S', 'M', 'L', 'XL', 'ZXL', '3XL'],
    selectedSize: 'M',
    quantity: 1,
    images: [
      'assets/landing-page-images/photo-frame.png',
      'assets/landing-page-images/photo-frame.png',
      'assets/landing-page-images/photo-frame.png'
    ],
    activeIndex: 0
  };

  relatedProducts = [
    { name: 'PINK DIGI PRINT SHIRT', price: 1149.00, image: 'assets/landing-page-images/T-shirt.png' },
    { name: 'PEACH DIGI PRINT SHIRT', price: 1249.00, image: 'assets/landing-page-images/T-shirt.png' },
    { name: 'BLUE DIGI PRINT SHIRT', price: 1149.00, image: 'assets/landing-page-images/T-shirt.png' },
    { name: 'OFF WHITE DIGI PRINT SHIRT', price: 1249.00, image: 'assets/landing-page-images/T-shirt.png' }
  ];

  activeAccordion: string | null = 'description';

  toggleAccordion(section: string) {
    this.activeAccordion = this.activeAccordion === section ? null : section;
  }
  
}
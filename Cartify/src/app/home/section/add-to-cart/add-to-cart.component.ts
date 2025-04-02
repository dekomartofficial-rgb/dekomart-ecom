import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output ,Input} from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
@Output() closeCart = new EventEmitter<void>(); 
@Input () cartItems: any[] = []

close() {
  console.log("Closing cart...");
  this.closeCart.emit();
}

getTotalPrice(): number {
        return this.cartItems.reduce((total, item) => {
          return total + (item?.offerPrice || 0); 
        }, 0);
}


}

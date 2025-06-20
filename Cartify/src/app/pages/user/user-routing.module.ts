import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { CartComponent } from './cart/cart.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: 'user-account', component: UserAccountComponent},
  { path: 'user-orders', component: UserOrdersComponent},
  { path: 'user-cart', component: CartComponent},
  { path: 'user-wishlist', component: UserWishlistComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

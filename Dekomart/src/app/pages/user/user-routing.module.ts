import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { CartComponent } from './cart/cart.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AuthGuard } from '../../provider/guard/auth.guard'
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent, canActivate: [AuthGuard] },
  { path: 'user-account', component: UserAccountComponent, canActivate: [AuthGuard] },
  { path: 'user-orders', component: UserOrdersComponent, canActivate: [AuthGuard] },
  { path: 'user-cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'user-wishlist', component: UserWishlistComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-sucessfully', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'product-detail', component: ProductDetailComponent},
  { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-home/user-account/user-account.component';
import { ProductListingComponent } from './product-listing/product-listing.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent },
  { path: 'user-account-settings', component: UserAccountComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'product-listing', component: ProductListingComponent },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

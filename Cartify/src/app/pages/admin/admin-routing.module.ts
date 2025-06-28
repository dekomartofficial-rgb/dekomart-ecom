import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ReferenceDataComponent } from './reference-data/reference-data.component';
import { RoleAccessComponent } from './role-access/role-access.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SystemParamComponent } from './system-param/system-param.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'product-details', component: ProductDetailsComponent }, // Fixed component
  { path: 'user-registration', component: UserRegistrationComponent }, // Removed extra slashes
  { path: 'product-dashboard', component: ProductDashboardComponent }, // Fixed component
  { path: 'reference-data', component: ReferenceDataComponent },
  { path: 'role-access', component: RoleAccessComponent },
  { path: 'add-products', component: AddProductComponent },
  { path: 'system-parm', component: SystemParamComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders-detials', component: OrdersDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

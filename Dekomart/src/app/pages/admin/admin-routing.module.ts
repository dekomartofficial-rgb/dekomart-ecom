import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReferenceDataComponent } from './reference-data/reference-data.component';
import { RoleAccessComponent } from './role-access/role-access.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SystemParamComponent } from './system-param/system-param.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { AuthGuard } from '../../provider/guard/auth.guard'


const routes: Routes = [
  { path: '', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'product-details', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'user-registration', component: UserRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'product-dashboard', component: ProductDashboardComponent, canActivate: [AuthGuard] },
  { path: 'reference-data', component: ReferenceDataComponent, canActivate: [AuthGuard] },
  { path: 'role-access', component: RoleAccessComponent, canActivate: [AuthGuard] },
  { path: 'add-products', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'system-parm', component: SystemParamComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders-detials', component: OrdersDetailsComponent, canActivate: [AuthGuard] },
  { path: 'admin-login', component: AdminLoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

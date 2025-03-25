import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ReferenceDataComponent } from './reference-data/reference-data.component';
import { RoleAccessComponent } from './role-access/role-access.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'product-details', component: ProductDetailsComponent }, // Fixed component
  { path: 'user-registration', component: UserRegistrationComponent }, // Removed extra slashes
  { path: 'product-dashboard', component: ProductDashboardComponent }, // Fixed component
  { path: 'reference-data', component: ReferenceDataComponent },
  { path: 'role-access', component: RoleAccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

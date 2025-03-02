import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "admin", component: AdminLoginComponent }
];

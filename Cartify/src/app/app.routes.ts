import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';  


export const routes: Routes = [ 
    { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
    { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent }, 
    { path: "nav", component: NavbarComponent }, 
    { path: '**', component: NotFoundComponent },

];

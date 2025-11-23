import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { FooterpagerenderComponent } from './shared/@windowsrender/footerpagerender/footerpagerender.component';
import { SectionPageComponent } from './home/section/section-page/section-page.component';


export const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
    { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: "windowrender/:htcode", component: FooterpagerenderComponent },
    { path: 'section/:htcode', component: SectionPageComponent },
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: '**', component: NotFoundComponent }
];



import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginComponent } from './pages/login/login.component';
import { ToastModule } from 'primeng/toast';
import { ProductDashboardComponent } from './pages/admin/product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './pages/admin/product-details/product-details.component';
import { UserRegistrationComponent } from './pages/admin/user-registration/user-registration.component';
import { HttpClientService } from './provider/services/http-client.service';
import { CommonModule, Location } from '@angular/common';
import { LoaderComponent } from "./shared/loader/loader.component"; // Import this
import { LoaderService } from './provider/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  LoggerId: boolean = false;
  UserId: number = 0
  public href: string = "";
  isSidebarVisible: boolean = false;

  constructor(private httpClient: HttpClientService, private router: Router, private loaderService: LoaderService) { }
  ngOnInit(): void {
    // this.IsLoggedUser()
  }

  receiveData(event: boolean) {
    this.isSidebarVisible = event;
  }

  isLoggedUser() {
    let userData = this.httpClient.getUserData()
    return userData && userData.UserId > 0 && !['/login', '/', '/home'].includes(this.router.url)
  }

  // IsHome() {
  //   if (this.Location.path() === '' || this.Location.path() === '/login') {
  //     return true
  //   }
  //   return false
  // }

  validateInspect() {
    let date = Date.now();
    debugger
    let newDate = Date.now();
    let differ = (newDate - date);
    if (differ > 100) {
      localStorage.removeItem('userData');
      this.router.navigateByUrl('/');
    }
    return true;
  }

}

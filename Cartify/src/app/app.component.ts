import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginComponent } from './pages/login/login.component';
import { ToastModule } from 'primeng/toast';
import { ProductDashboardComponent } from './pages/admin/product-dashboard/product-dashboard.component';
import { ProductDetailsComponent } from './pages/admin/product-details/product-details.component';
import { UserRegistrationComponent } from './pages/admin/user-registration/user-registration.component';
import { HttpClientService } from './provider/services/http-client.service';
import { CommonModule, Location } from '@angular/common'; // Import this


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, LoginComponent, NavbarComponent, ToastModule, ProductDashboardComponent, ProductDetailsComponent, UserRegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  LoggerId: boolean = false;
  UserId: number = 0
  public href: string = "";

  constructor(private httpClient: HttpClientService, private Location: Location) { }
  ngOnInit(): void {
    this.IsLoggedUser()

  }

  IsLoggedUser() {
    this.UserId = this.httpClient.getUserId()
    if (this.UserId > 0) {
      return this.LoggerId = true
    }
    console.log(this.IsLoggedUser)
    return this.LoggerId = false
  }

  IsHome() {
    if (this.Location.path() === '' || this.Location.path() === '/login') {
      return true
    }
    return false
  }
}

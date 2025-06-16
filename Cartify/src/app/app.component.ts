import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ToastModule } from 'primeng/toast';
import { HttpClientService } from './provider/services/http-client.service';
import { CommonModule } from '@angular/common';
import { LoaderService } from './provider/services/loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { ToasterComponent } from './shared/toaster/toaster.component';
import { ConfirmationDialogComponent } from "./shared/confirmation-dialog/confirmation-dialog.component";
import { LoaderComponent } from "./shared/loader/loader.component"; 

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, NavbarComponent, ToastModule, FontAwesomeModule, ToasterComponent, ConfirmationDialogComponent, LoaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  LoggerId: boolean = false;
  isSidebarVisible: boolean = true;
  isLeftSidebarCollapsed = signal<boolean>(false);
  constructor(private httpClient: HttpClientService, private router: Router, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.isLoggedUser()
  }

  receiveData(event: boolean) {
    this.isSidebarVisible = event;
  }

  isLoggedUser() {
    let userData = this.httpClient.getUserData()
    return userData && userData.UserId > 0 && !['/login', '/', '/home'].includes(this.router.url)
  }

  isAdmin() {
    let userData = this.httpClient.getUserData()
    return userData && userData.UserRole !== 'CU'
  }
  
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

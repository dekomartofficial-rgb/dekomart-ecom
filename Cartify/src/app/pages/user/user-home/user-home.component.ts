import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterHomeComponent } from '@/app/home/section/footer-home/footer-home.component';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { UserAccountComponent } from '../user-account/user-account.component';
import { UserOrdersComponent } from '../user-orders/user-orders.component';
import { CartComponent } from '../cart/cart.component';
import { UserWishlistComponent } from '../user-wishlist/user-wishlist.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-home',
  imports: [CommonModule, RouterModule, FooterHomeComponent, UserAccountComponent, UserOrdersComponent, CartComponent, UserWishlistComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  LoggedUserId: number = 0;
  UserProfile: any[] = []
  ScreenList: any[] = []
  UserRole: any
  mainNavLinks = [
    { path: '/', label: 'NEW IN' },
    { path: '/', label: 'DINING' },
    { path: '/', label: 'BEDROOM' },
    { path: '/', label: 'BATHROOM' },
    { path: '/', label: 'FURNITURE' },
    { path: '/', label: 'DECOR' },
    { path: '/', label: 'CLOCK' },
    { path: '/', label: 'GIFT' }
  ];
  cartCount = 3
  selectedScreenCode: string = ''

  constructor(private httpClient: HttpClientService, private Loader: LoaderService) { }
  async ngOnInit() {
    this.LoggedUserId = await this.httpClient.getUserId();
    await this.getUserProfile(this.LoggedUserId)
    await this.GetScreenList()
  }

  getUserProfile(id: number) {
    this.Loader.show()
    this.httpClient.get<any[]>('user/GetUserProfiler', { UserId: id }).subscribe((res) => {
      this.UserProfile = res
      this.Loader.hide()
    })
  }

  GetScreenList(): Promise<void> {
    this.Loader.show();
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>('user/GetUserRoleScreens', { UserId: this.LoggedUserId })
        .subscribe({
          next: (res) => {
            this.selectedScreenCode = res[0]?.ScreenCode;
            this.ScreenList = res;
            this.Loader.hide();
            resolve();
          },
          error: (err) => {
            this.Loader.hide();
            reject(err);
          }
        });
    });
  }


  changeScreen(code: string) {
    this.Loader.show();           // Show loader
    this.selectedScreenCode = ''; // Reset component
    setTimeout(() => {
      this.selectedScreenCode = code;
      this.Loader.hide();         // Hide after switching
    }, 300); // Delay lets loader show briefly
  }

  isUserLogged() {
    return this.httpClient.isLoggedIn()
  }

  Logout(){
    this.httpClient.LogOut()
  }
}

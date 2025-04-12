import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientService } from '@/app/provider/services/http-client.service';


@Component({
    selector: 'app-user-nav-bar',
    imports: [RouterModule],
    templateUrl: './user-nav-bar.component.html',
    styleUrl: './user-nav-bar.component.css'
})
export class UserNavBarComponent {
  constructor(private http: HttpClientService) { }

  onLogout() {
    this.http.LogOut()
  }

}

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-home.component.html',
  styleUrl: './nav-home.component.css'
})
export class NavHomeComponent {
  @Input() wishlistCount: number = 0;
  @Input () cartCount: number =0;
  constructor(private http: HttpClientService, private router: Router) { }

  onLogin() {
    return this.http.getUserData() ? this.router.navigateByUrl('/admin') : this.router.navigateByUrl('/login')
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClientService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!this.http.getToken(); // Example: check token
    const currentUrl = state.url;
    const firstSegment = currentUrl.split('/')[1]; 

    if (isLoggedIn) {
      if (firstSegment.toUpperCase() === 'ADMIN' && this.http.isAdmin()) {
        return true;
      } else if (firstSegment.toUpperCase() === 'USER' && !this.http.isAdmin()) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
    } else {
      this.router.navigate(['/login']); // redirect to login
      return false;
    }
  }
}

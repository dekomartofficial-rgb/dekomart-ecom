import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { HttpClientService } from '../../provider/services/http-client.service';
import { ScreenList, } from '../../provider/interface/AdminInterface';
import { UserProfile } from '../../provider/interface/AdminInterface'
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, AvatarModule, OverlayBadgeModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ScreenList: ScreenList[] = []; 
  UserProfile: UserProfile[] = [];  
  activeUrl: string = '';
  expandedGroups: { [key: string]: boolean } = {};
  isCollapsed = false;
  activeHeader: string | null = null;
  UserId: number = 0;
  constructor(private router: Router, private httpClient: HttpClientService) { }

  ngOnInit(): void {
    this.UserId = this.httpClient.getUserId();
    this.getUserProfile()
    this.GetScreenList()
  }

  getUserProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const userId = this.httpClient.getUserData()?.UserId;
      this.httpClient.get<UserProfile[]>('user/GetUserProfiler', { UserId: userId })
        .subscribe(
          (res) => {
            this.UserProfile = res;
            resolve(res); 
          },
          (error) => {
            reject(error);
          }
        );
    });
  }


  GetScreenList() {
    if (this.UserId) {
      this.httpClient.get<any>('user/GetScreenList', { UserId: this.UserId })
        .subscribe((res) => {
          this.ScreenList = res.screenList;
        });
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleGroup(groupName: string) {
    this.expandedGroups[groupName] = !this.expandedGroups[groupName];
  }

  isGroupExpanded(groupName: string): boolean {
    return this.expandedGroups[groupName] === true;
  }

  setActive(url: string) {
    this.activeUrl = url;
  }

  isActive(url: string): boolean {
    return this.activeUrl === url;
  }

  Logout() {
    this.httpClient.LogOut()
  }


}

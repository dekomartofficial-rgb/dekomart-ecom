import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink } from '@angular/router';
import { HttpClientService } from '../../provider/services/http-client.service';
import { ScreenList } from '../../provider/interface/AdminInterface';
import { UserProfile } from '../../provider/interface/AdminInterface'
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; 
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { take } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, Toolbar, AvatarModule, SharedModule, ButtonModule, InputIcon, InputTextModule, IconField, FormsModule, OverlayPanelModule, InputSwitchModule, DropdownModule, SidebarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() sendDataToParent: EventEmitter<boolean> = new EventEmitter<boolean>();
  ScreenList: ScreenList[] = [];
  UserProfile: UserProfile[] = [];
  activeUrl: string = '';
  expandedGroups: { [key: string]: boolean } = {};
  isCollapsed = false;
  activeHeader: string | null = null;
  UserId: number = 0;
  sidebarVisible: boolean = false;
  allowNotifications = true;
  accountVisible: boolean = false;
  notificationVisible: boolean = false;
  selectedType: any = '';
  notificationTypes = [
    { label: 'All Notification', value: 'all' },
    { label: 'Unread', value: 'unread' },
    { label: 'Read', value: 'read' }
  ];

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Messages', icon: 'pi pi-envelope' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { label: 'Logout', icon: 'pi pi-sign-out' }
  ];

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
        .pipe(take(1))
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

  sidrBarDialog() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sendDataToParent.emit(this.sidebarVisible);
  }

  preventClosing() {
    this.sidebarVisible = true;
  }

  accountDialog() {
    this.accountVisible = true;
  }

  notificationDialog() {
    this.notificationVisible = true;
  }

  GetScreenList() {
    if (this.UserId) {
      this.httpClient.get<any>('user/GetScreenList', { UserId: this.UserId })
        .pipe(take(1))
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

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientService } from '../../provider/services/http-client.service';
import { ScreenList } from '../../provider/interface/AdminInterface';
import { UserProfile } from '../../provider/interface/AdminInterface'
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';


@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule, TooltipModule, AvatarModule, FormsModule, InputSwitchModule, DropdownModule, SidebarModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() sendDataToParent: EventEmitter<boolean> = new EventEmitter<boolean>();
  ScreenList: ScreenList[] = [];
  UserProfile: UserProfile[] = [];
  activeUrl: string = '';
  expandedGroups: string[] = []; // Changed to string array for simpler management
  isCollapsed = false;
  UserId: number = 0;
  sidebarVisible: boolean = true;
  notificationVisible: boolean = false;
  selectedType: any = '';
  isMobile: boolean = false;
  userRole: string = ''


  constructor(private router: Router, private httpClient: HttpClientService) { }

  ngOnInit(): void {
    this.UserId = this.httpClient.getUserId();
    this.GetScreenList();
  }

  isLoggedUser() {
    let userData = this.httpClient.getUserData()
    return userData && userData.UserId > 0 && !['/login', '/', '/home'].includes(this.router.url)
  }


  sidrBarDialog() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sendDataToParent.emit(this.sidebarVisible);
  }

  notificationDialog() {
    this.notificationVisible = true;
  }

  GetScreenList() {
    if (this.UserId) {
      this.userRole = this.httpClient.getUserData().UserRole as string;
      if (this.userRole.includes(',') && this.userRole.split(',').includes('AD')) {
        this.userRole = 'AD'
      }
      this.httpClient.get<any>('user/GetScreenList', { UserId: this.UserId, RoleCode: this.userRole })
        .subscribe((res) => {
          this.ScreenList = Array.isArray(res.screenList) ? res.screenList : [];
        });
    }
  }



  toggleGroup(groupName: string) {
    if (this.expandedGroups.includes(groupName)) {
      this.expandedGroups = this.expandedGroups.filter(name => name !== groupName);
    } else {
      this.expandedGroups.push(groupName);
    }
  }

  isGroupExpanded(groupName: string): boolean {
    return this.expandedGroups.includes(groupName);
  }

  setActive(url: string) {
    this.activeUrl = url;
  }

  Logout() {
    this.httpClient.LogOut();
  }



}
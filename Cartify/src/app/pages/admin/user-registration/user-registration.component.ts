import { Component,  ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@/app/provider/interface/UserInfterface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { ToastService } from '@/app/provider/services/toast.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { LoaderService } from '@/app/provider/services/loader.service';


@Component({
    selector: 'app-user-registration',
    imports: [CommonModule, FloatLabel, TableModule, MultiSelectModule, ButtonModule, FormsModule, InputTextModule, InputIconModule, DatePicker, PasswordModule, IconFieldModule, ReactiveFormsModule, Checkbox, FormsModule, TagModule],
    templateUrl: './user-registration.component.html',
    styleUrl: './user-registration.component.css',
    encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent {
  isModalOpen: boolean = false;
  userToSendDob: Date = new Date();
  UserForm: FormGroup
  UserRole: any[] = [];
  SelectedUserRole: any[] = [];
  User: User = new User();
  Users: any | User;


  constructor(private fb: FormBuilder, private http: HttpClientService, private toastService: ToastService, private LoaderService: LoaderService) {
    this.UserForm = this.fb.group({
    })
  }

  ngOnInit() {  
    this.getUser(0)
  }
  openModal(): void {
    this.isModalOpen = true;
    this.getUserRole()
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetUser()
    this.SelectedUserRole = []
  }
  getUser(id?: number) {
    this.LoaderService.show()
    this.http.get<User[]>('user/GetUser', { User: id ? id : 0 }).subscribe({
      next: (res) => {
        this.Users = res
        this.SelectedUserRole = this.Users.UserRole && this.Users.UserRole.includes(',') ? this.Users.UserRole.split(',') : this.Users.UserRole
        this.LoaderService.hide()
      },
      error: (err) => {
         this.toastService.show('Error', err)
      }
    })
  }

  get f() {
    return this.UserForm.controls
  }

  getUserRole() {
    this.LoaderService.show()
    this.http.getUserRole(0).subscribe({
      next: (res: any[]) => {
        this.UserRole = res;
        this.LoaderService.hide()
      }
    });
  }

  onSaveUser() {
    this.LoaderService.show()
    this.User.DateOfBirth = new Date(this.userToSendDob.getTime() - this.userToSendDob.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    this.User.OpsMode = this.User.UserId > 0 ? 'UPDATE' : 'INSERT';
    this.User.ProfileImage = 'https://www.w3schools.com/howto/img_avatar.png';
    this.User.UserRole = this.SelectedUserRole.join(',')
    this.User.Password = this.User.Password.toString()
    this.User.UserStatus = this.User.UserStatus === 1 ? 'A' : 'I'
    this.User.DateOfBirth = this.User.DateOfBirth
    this.http.post<any>('user/SaveUser', this.User).subscribe({
      next: (res) => {
        if (res.MessageType === 2) {
          this.toastService.show('Success', res.Message);
          this.resetUser()
          this.getUser()
          this.closeModal();
          this.LoaderService.hide()
        } else {
           this.toastService.show('Error', res.Message);
        }
      },
      error: (err) => {
        this.toastService.show('Error', err);
      }
    })

  }

  resetUser(): void {
    this.User = new User(); // Reset to a new instance of User class
  }
  editUser(UserId: number) {
    this.LoaderService.show()
    this.http.get<User>('user/GetUser', { UserId: UserId }).subscribe({
      next: (res) => {
        this.User = res;
        const dateParts = this.User.DateOfBirth.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        this.userToSendDob = new Date(formattedDate + "T00:00:00");
        this.User.UserStatus = this.User.UserStatus === 'A' ? 1 : 0
        this.SelectedUserRole = this.User.UserRole ? this.User.UserRole.includes(',') ? this.User.UserRole.split(',').filter(role => role) : [this.User.UserRole] : [];
        this.isModalOpen = true;
        this.getUserRole()
        this.LoaderService.hide()
      },
      error: (err) => {
         this.toastService.show('Error', err);
      }
    });
  }

  deleteUser(userId: number) {
    this.Users = this.Users.filter((user: { UserId: number; }) => user.UserId !== userId);
  }

}

import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@/app/provider/interface/UserInfterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { ToastService } from '@/app/provider/services/toast.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FloatLabel, TableModule, MultiSelectModule, ButtonModule, FormsModule, InputTextModule, InputIconModule, DatePicker, PasswordModule, IconFieldModule, ReactiveFormsModule, Checkbox, TagModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  isModalOpen: boolean = false;
  UserForm: FormGroup
  UserRole: any[] = [];
  SelectedUserRole: any[] = [];
  User: User = new User();
  Users: any | User;


  constructor(private fb: FormBuilder, private http: HttpClientService, private toastService: ToastService) {
    this.UserForm = this.fb.group({
      FirstName: new FormControl("", [Validators.required])
    })
  }

  ngOnInit() {
    this.getUser()
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
  getUser() {
    this.http.get<User[]>('user/GetUser', { User: 0 }).subscribe({
      next: (res) => {
        this.Users = res
      },
      error: (err) => {
        this.toastService.showError('Error', err)
      }
    })
  }

  get f() {
    return this.UserForm.controls
  }

  getUserRole() {
    this.http.getUserRole(this.User ? this.User.UserId : 0).subscribe({
      next: (res: any[]) => {
        this.UserRole = res || [];
      }
    });
  }

  onSaveUser() { 
    if (this.UserForm.valid) {
      this.User.OpsMode = this.User.UserId > 0 ? 'UPDATE' : 'INSERT';
      this.User.ProfileImage = 'https://www.w3schools.com/howto/img_avatar.png';
      this.User.UserRole = this.SelectedUserRole.join(',')
      this.http.post<any>('user/SaveUser', this.User).subscribe({
        next: (res) => {
          if (res.MessageType === 2) {
            this.toastService.showSuccess('Success', res.Message);
            this.resetUser()
            this.getUser()
            this.closeModal();
          } else {
            this.toastService.showError('Error', res.Message);
          }
        },
        error: (err) => {
          this.toastService.showError('Error', err);
        }
      })
    } else {
      this.UserForm.markAllAsTouched(); // Highlight all errors
      console.log('Form is invalid');
    }

  }

  resetUser(): void {
    this.User = new User(); // Reset to a new instance of User class
  }

  editUser(user: any) {
    console.log('Editing user:', user);
}

deleteUser(userId: number) {
    this.Users = this.Users.filter((user: { UserId: number; }) => user.UserId !== userId);
}

}

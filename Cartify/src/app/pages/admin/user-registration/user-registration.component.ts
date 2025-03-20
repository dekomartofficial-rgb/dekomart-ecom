import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@/app/provider/interface/UserInfterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { ToastService } from '@/app/provider/services/toast.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, FloatLabel, TableModule, ButtonModule, FormsModule, InputTextModule, DatePicker, PasswordModule, InputMask, ReactiveFormsModule, Checkbox],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  isModalOpen: boolean = false;
  UserForm: FormGroup
  User: any | User;

  constructor(private fb: FormBuilder, private http: HttpClientService, private toastService: ToastService) {
    this.UserForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit() {
    this.getUser()
  }
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  getUser() {
    this.http.get<User>('user/GetUser', { User: 0 }).subscribe({
      next: (res) => {
        this.User = res
        console.log(res)
      },
      error: (err) => {
        this.toastService.showError('Error', err)
      }
    })
  }

  onSaveUser() {
    this.User.OpsMode = this.User.UserId > 0 ? 'UPDATE' : 'INSERT';
    this.User.DateOfBirth = this.User.DateOfBirth.toLocaleString();
    this.User.ProfileImage = 'https://www.w3schools.com/howto/img_avatar.png';
    this.User.IsActiveStatus = this.User.IsActiveStatus ? 'Y' : 'N';
    this.User.IsMailVerified = 1;
    this.User.IsPhoneVerified = 1;

    this.http.post<any>('user/SaveUser', this.User).subscribe({
      next: (res) => {
        if (res.MessageType === 2) {
          this.toastService.showSuccess('Success', res.Message);
          this.closeModal();
        } else {
          this.toastService.showError('Error', res.Message);
        }
      },
      error: (err) => {
        this.toastService.showError('Error', err);
      }
    })
  }

}

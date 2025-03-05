// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../provider/interface/AdminInterface';
import { HttpClientService } from '../../provider/services/http-client.service';
import { Router } from '@angular/router';
import { ToastService } from '../../provider/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage = '';
  Login: Login = {
    EmailId: '',
    Password: '',
    AuthType: ''
  }

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClientService, private router: Router, private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    if (this.httpClient.getUserId()) {
      this.router.navigate(['/nav']);
    }
  }
  // Getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit(Login: Login) {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.Login.AuthType = 'W'
    if (this.Login.EmailId && this.Login.Password) {
      this.httpClient.post<any>('user/Validateuser', this.Login)
        .subscribe({
          next: (res) => {
            if (res.MessageType === 2) {
              this.toastService.showSuccess('Success', res.Message);
              const UserData = {
                UserId: res.UserId,
                Token: res.Token
              }
              localStorage.setItem('userData', JSON.stringify(UserData));
              this.router.navigate(['/admin/']);
            } else {
              this.toastService.showError('Error', res.Message)
            }
          },
          error: (err) => { throw err }
        })
    }
  }
}
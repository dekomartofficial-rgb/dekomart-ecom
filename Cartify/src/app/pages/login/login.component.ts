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
  isAdmin: string = 'AD'
  isValueExists: any;
  Login: Login = {
    EmailId: '',
    Password: '',
    AuthType: ''
  }

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClientService, private router: Router, private toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  ngOnInit(): void {
    this.navigateLogin()
  }
  // Getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  navigateLogin() {
    if (this.httpClient.getUserData()?.UserId > 0) {
      if (this.httpClient.getUserData().UserId === 'UR') {
        return this.router.navigate(['user/']);
      } else {
        return this.router.navigate(['admin/']);
      }
    }
    return null
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
              this.toastService.show('Success', res.Message);
              const UserData = { UserId: res.UserId, Token: res.Token, UserRole: res.UserRole }
              localStorage.setItem('userData', JSON.stringify(UserData)); 
              if (this.checkAdmin(res.UserRole)) {
                this.router.navigate(['/admin/']);
              } else {
                this.router.navigate(['/user/'])
              }
            } else {
               this.toastService.show('Error', res.Message)
            }
          },
          error: (err) => { throw err }
        })
    }
  }

  checkAdmin(data: string): boolean {
    const parts: string[] = data.split(',');
    const adExists: boolean = parts.includes(this.isAdmin)
    return adExists
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AdminLogin } from '@/app/provider/class/UserClass';
import { LoaderService } from '@/app/provider/services/loader.service';
import { HttpClientService } from '../../../provider/services/http-client.service';
import { Router } from '@angular/router';
import { CommonService } from '@/app/provider/services/common.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  showPassword: boolean = false;
  isSubmitted: boolean = false;
  loginForm: FormGroup;
  isShowOtp: boolean = false
  AdminLogin: AdminLogin = new AdminLogin()
  errorMessage = '';
  Otp1!: string
  Otp2!: string
  Otp3!: string
  Otp4!: string
  Otp5!: string
  Otp6!: string
  OtpColumnIndex: any = [];
  OtpColumn: number = 0

  constructor(private formBuilder: FormBuilder, private loader: LoaderService, private httpClient: HttpClientService, private router: Router, private commonService: CommonService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
      // otp: ['', [Validators.required, Validators.minLength(1)]]
    });

  }
  ngOnInit(): void {
    this.loader.show()
    setTimeout(() => {
      this.loader.hide()
    }, 2000);
  }

  get formControls() {
    return this.loginForm.controls;
  }

  getOtpColumnIndex(): void {
    this.commonService.getSystemParmForAdmin('OTP_INDEX').subscribe((OtpColumnIndexString: any[]) => {
      this.OtpColumn = OtpColumnIndexString[0]?.parmValue
      this.OtpColumnIndex = Array.from({ length: this.OtpColumn }, (_, i) => ({ index: i }));
    });
  }

  sendOtp(mode: string) {
    if (mode === 'SEND_OTP') {
      if (this.loginForm.value.email === undefined && this.loginForm.value.password === undefined) {
        this.isSubmitted = true
        return
      } else {
        this.loader.show()
        this.httpClient.post<any>('user/Validateuser', { EmailId: this.AdminLogin.EmailAddress, Password: this.AdminLogin.Password, AuthType: 'SENT_OTP' }).subscribe((res) => {
          if (res && res.MessageType === 2) {
            this.getOtpColumnIndex()
            this.isShowOtp = true
            this.AdminLogin.UserId = res.UserId
            this.errorMessage = res.Message
            this.loader.hide()
          } else {
            this.isShowOtp = false
            this.errorMessage = res.Message
            this.loader.hide()
          }
        })
      }
    } else {
      if (this.loginForm.value.otp === undefined) {
        this.isSubmitted = true
        return
      }
      this.AdminLogin.Otp = (this.Otp1 ?? '') + (this.Otp2 ?? '') + (this.Otp3 ?? '') + (this.Otp4 ?? '') + (this.Otp5 ?? '') + (this.Otp6 ?? '');
      this.httpClient.post<any>('admin/SaveValidateAdminOtp', { UserId: this.AdminLogin.UserId, Otp: this.AdminLogin.Otp }).subscribe((res) => {
        if (res && res.MessageType === 2) {
          if (this.httpClient.getToken()) {
            localStorage.clear()
          }
          this.isShowOtp = true
          const AdminData = { UserId: res.UserId ?? this.AdminLogin.UserId, Token: res.Token, UserRole: res.UserRole }
          localStorage.setItem('userData', JSON.stringify(AdminData));
          this.loader.show()
          setTimeout(() => {
            this.router.navigate(['/admin/']);
            this.loader.hide()
          }, 200);
          this.errorMessage = res.Message
          this.loader.hide()
        } else {
          this.errorMessage = res.Message
          this.loader.hide()
        }
      })
    }
  }
}

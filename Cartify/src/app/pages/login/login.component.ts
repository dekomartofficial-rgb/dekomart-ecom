// login.component.ts
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../../provider/interface/AdminInterface';
import { HttpClientService } from '../../provider/services/http-client.service';
import { Router } from '@angular/router';
import { ToastService } from '../../provider/services/toast.service';
import { NavHomeComponent } from '../../home/section/nav-home/nav-home.component'
import { FooterHomeComponent } from '@/app/home/section/footer-home/footer-home.component';
import { LoaderService } from '@/app/provider/services/loader.service';
import { CustomerReg } from '@/app/provider/class/UserClass';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NavHomeComponent, FooterHomeComponent],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  CustomerReg: CustomerReg = new CustomerReg();
  loginForm: FormGroup;
  RegistraionForm: FormGroup
  isSubmitted = true;
  isRegNewUser = true;
  errorMessage = '';
  isAdmin: string = 'AD'
  isValueExists: any;
  Login: Login = {
    EmailId: '',
    Password: '',
    AuthType: ''
  }
  isAgeValid: boolean = true;
  showPassword: boolean = false


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClientService, private router: Router, private toastService: ToastService, private loader: LoaderService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.RegistraionForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\S]{3,}$')],
      cpassword: ['', [Validators.required], Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\S]{3,}$')],
      phone: ['', [Validators.required], [Validators.pattern('^[0-9]{10}$')]],
    })
  }
  ngOnInit(): void {
    this.navigateLogin()
  }
  // Getter for easy access to form fields
  get formControls() {
    return this.loginForm.controls;
  }

  validateAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      this.isAgeValid = age - 1 >= 18;
    } else {
      this.isAgeValid = age >= 18;
    }
  }


  navigateLogin() {
    if (this.httpClient.getUserData()?.UserId > 0) {
      if (this.httpClient.getUserData().UserId === 'US') {
        return this.router.navigate(['user/']);
      } else {
        return this.router.navigate(['admin/']);
      }
    }
    return null
  }

  onSubmit(Login: Login) {
    this.loader.show()
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
              const UserData = { UserId: res.UserId, Token: res.Token, UserRole: res.UserRole }
              localStorage.setItem('userData', JSON.stringify(UserData));
              if (this.checkAdmin(res.UserRole)) {
                this.errorMessage = res.Message 
                setTimeout(() => {
                  this.router.navigate(['/admin/']);
                  this.loader.hide()
                }, 200);
              } else {
                this.errorMessage = res.Message
                setTimeout(() => {
                  this.router.navigate(['/user'])
                  this.loader.hide()
                }, 3000);
              }
            } else {
              this.toastService.show('Error', res.Message)
              this.loader.hide()
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

  changeToUserReg() {
    this.loader.show()
    this.isRegNewUser = !this.isRegNewUser;
    this.CustomerReg = new CustomerReg()
    this.loader.hide()
  }

  get Reg() {
    return this.RegistraionForm.controls;
  }

  saveNewCustom(CustomerReg?: CustomerReg) {
    this.isSubmitted = true; 
    this.loader.show()
    this.CustomerReg.OpsMode = 'INSERT'
    this.CustomerReg.UserId = 0
    this.httpClient.post<any>('user/SaveCustomer', this.CustomerReg)
      .subscribe({
        next: (res) => {
          if (res.MessageType === 2) {
            this.toastService.show('Success', res.Message);
            this.resetCustomer()
            this.router.navigate(['/']);
            this.loader.hide()
          } else {
            this.toastService.show('Error', res.Message);
            this.loader.hide()
          }
        },
        error: (err) => { throw err }
      })
  }

  resetCustomer() {
    this.CustomerReg = new CustomerReg()
  }
} 
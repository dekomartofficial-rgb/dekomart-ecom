import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomerReg, ResetPassword } from '@/app/provider/class/UserClass';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { Router } from '@angular/router';
import { ToastService } from '@/app/provider/services/toast.service';
import { LoaderService } from '@/app/provider/services/loader.service';

@Component({
  selector: 'app-user-account',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent implements OnInit {
  CustomerReg: CustomerReg = new CustomerReg();
  ResetPasswordForm: ResetPassword = new ResetPassword();
  isSubmitted = true;
  RegistraionForm: FormGroup
  isAgeValid: boolean = true;
  LoggedUserId: number = 0;
  showModal: boolean = false

  async ngOnInit() {
    this.LoggedUserId = await this.httpClient.getUserId();
    if (this.LoggedUserId > 0) {
      this.getUserProfile(this.LoggedUserId)
    }
  }

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClientService, private router: Router, private toastService: ToastService, private loader: LoaderService) {
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

  getUserProfile(id: number) {
    this.loader.show()
    this.httpClient.get<any[]>('user/GetUserProfiler', { UserId: id }).subscribe((res) => {
      if (res) {
        this.CustomerReg.UserId = res[0]?.userId
        this.CustomerReg.FirstName = res[0]?.firstName
        this.CustomerReg.SecondName = res[0]?.LastName
        this.CustomerReg.Dob = res[0]?.Dob ? this.formatDate(res[0].Dob) : null;
        this.CustomerReg.Email = res[0]?.Email
        this.CustomerReg.Password = res[0]?.Password
        this.CustomerReg.PhoneNumber = res[0]?.PhoneNummber 
      }
      this.loader.hide()
    })
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }
  saveNewCustom(CustomerReg?: CustomerReg) {
    this.isSubmitted = true;
    this.loader.show()
    this.CustomerReg.OpsMode = this.CustomerReg.UserId === 0 ? 'INSERT' : 'UPDATE';
    this.httpClient.post<any>('user/SaveCustomer', this.CustomerReg)
      .subscribe({
        next: (res) => {
          if (res.MessageType === 2) {
            this.toastService.show('Success', res.Message);
            this.getUserProfile(this.LoggedUserId)
            this.loader.hide()
          } else {
            this.toastService.show('Error', res.Message);
            this.loader.hide()
          }
        },
        error: (err) => { throw err }
      })
  }

  ResetPassword(ResetForm?: ResetPassword) {
    this.isSubmitted = true;
    this.ResetPasswordForm.OpsMode = 'RESET'
    this.httpClient.post<any>('user/ResetPassword',  this.ResetPasswordForm).subscribe({
      next: (res) => {
        if (res.MessageType === 2) {
          this.showModal = false
          this.toastService.show('Success', res.Message);
          this.getUserProfile(this.LoggedUserId)
          this.loader.hide()
        } else {
          this.toastService.show('Error', res.Message);
          this.loader.hide()
        }
      }
    })
  }

}

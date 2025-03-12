import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { PasswordModule } from 'primeng/password';
import { InputMask } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FloatLabel, TableModule, ButtonModule, FormsModule, InputTextModule, DatePicker, PasswordModule, InputMask, ReactiveFormsModule, Checkbox],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  isModalOpen: boolean = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


  users = [
    { firstName: 'John', secondName: 'Doe', dob: '1990-01-01', email: 'john.doe@example.com', phone: '+1234567890' },
    { firstName: 'Jane', secondName: 'Smith', dob: '1992-05-12', email: 'jane.smith@example.com', phone: '+9876543210' },
    { firstName: 'Alex', secondName: 'Johnson', dob: '1988-11-25', email: 'alex.johnson@example.com', phone: '+1122334455' },
    { firstName: 'Emily', secondName: 'Davis', dob: '1995-07-19', email: 'emily.davis@example.com', phone: '+5566778899' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' },
    { firstName: 'Michael', secondName: 'Brown', dob: '1985-03-30', email: 'michael.brown@example.com', phone: '+6677889900' }
  ];
}

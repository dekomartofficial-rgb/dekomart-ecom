import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [RouterModule, FormsModule, InputTextModule, FloatLabel],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  value3: string | undefined;

}

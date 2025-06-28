import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [RouterModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit {
  IsHaveScreenPermistion: boolean = false
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.IsHaveScreenPermistion = history.state['IsHaveScreenPermistion'];
    if (!this.IsHaveScreenPermistion) {
      this.router.navigate(['user/not-found'])
      return;
    }
  }
}

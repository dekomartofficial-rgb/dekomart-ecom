import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { BlockUrlService } from '@/app/provider/services/block-url.service';
import { LoaderService } from '@/app/provider/services/loader.service';



@Component({
  selector: 'app-order-success',
  imports: [RouterModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit {
  IsHaveScreenPermistion: boolean = false
  constructor(private router: Router, private blockurl: BlockUrlService, private loader: LoaderService) { }

  ngOnInit(): void {
    if (!this.blockurl.checkHaveAcess()) {
      this.loader.show()
      this.router.navigate(['/'])
      this.loader.hide()
    }
  }

}

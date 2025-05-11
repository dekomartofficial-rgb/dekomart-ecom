import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { Rating } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { CommonService } from '@/app/provider/services/common.service';



@Component({
  selector: 'app-product-details',
  imports: [CommonModule, Rating, FormsModule, TooltipModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  ProductDetails: any[] = [];
  ProductDashboard: any[] = [];
  Rating: any[] = [];
  constructor(private httpService: HttpClientService, private Loader: LoaderService, private CommonService: CommonService) { }

  ngOnInit(): void {
    this.getProductsHeader();
  }

  getProductsHeader() {
    this.Loader.show()
    this.httpService.get('admin/GetProductsDashboard', { SearchKeyword: '' }).subscribe((res: any) => {
      this.ProductDashboard = res[0];
      this.ProductDetails = res[1]; 
      this.Loader.hide()
    });
  }

  getColorLight(value: string) : string { 
    return this.CommonService.getLightColour(value, 0.6);
  }



}

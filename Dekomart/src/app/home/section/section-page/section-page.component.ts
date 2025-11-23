import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FooterHomeComponent } from "../footer-home/footer-home.component";
import { NavHomeComponent } from "../nav-home/nav-home.component";
import { baseUrl } from '../../../../assets/config.json'
import { LoaderService } from '@/app/provider/services/loader.service';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { InrPipe } from "../../../provider/pipe/inr.pipe";


@Component({
  selector: 'app-section-page',
  imports: [FooterHomeComponent, NavHomeComponent, InrPipe],
  templateUrl: './section-page.component.html',
  styleUrl: './section-page.component.css'
})
export class SectionPageComponent implements OnInit {
  htCode: string = ''
  baseUrl: string = baseUrl
  displayDialog: boolean = false;
  ClickedProduct: any[] = []
  ClickedProductImage: any[] = []
  ClickedImage: string = ''
  AvailableSize: any[] = []
  HomeData: any[] = []
  HomeHeaderData: any[] = []
  UserId: number = 0

  constructor(private route: ActivatedRoute, private Loader: LoaderService, private httpClient: HttpClientService) { }

  ngOnInit(): void {
    this.UserId = this.httpClient.getUserId() ?? 0
    this.route.paramMap.subscribe(params => {
      this.htCode = params.get('htcode')!! 
      if(this.htCode){
        this.GetSectionData()
      }
    }); 

  }

  GetProductDetails(ProductId: number) {
    this.displayDialog = true
    this.Loader.show()
    this.httpClient.get<any>('user/GetProductDetails', { ProductId: ProductId })
      .subscribe((res) => {
        this.ClickedProduct = res[0]
        this.ClickedProductImage = res[1]
        this.ClickedImage = this.ClickedProductImage[0].ProductImagePath
        this.AvailableSize = this.ClickedProduct[0]?.ProductSize.split(',')
        this.Loader.hide()
      });
  }

  GetSectionData() {
    this.Loader.show()
    this.httpClient.get<any>('user/GetSectionDetails', { UserId: this.UserId, Section: this.htCode })
      .subscribe((res) => {
        this.HomeHeaderData = res[0]
        this.HomeData = res[1];
        this.Loader.hide()
      });
  }

  filterByHeaderTitle(headerTitle: string): any[] {
    return this.HomeData.filter(item => item.HeaderTitle === headerTitle);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHomeComponent } from '@/app/home/section/nav-home/nav-home.component';
import { FooterHomeComponent } from "@/app/home/section/footer-home/footer-home.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { SafestringhtmlPipe } from '@/app/provider/pipe/string-to-html/safestringhtml.pipe';
import { LoaderService } from '@/app/provider/services/loader.service';

@Component({
  selector: 'app-footerpagerender',
  imports: [NavHomeComponent, FooterHomeComponent, SafestringhtmlPipe, CommonModule],
  templateUrl: './footerpagerender.component.html',
  styleUrl: './footerpagerender.component.css'
})
export class FooterpagerenderComponent implements OnInit {
  htCode: string = '';
  resValue: any;


  constructor(private route: ActivatedRoute, private http: HttpClientService, private LoaderService: LoaderService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.htCode = params.get('htcode')!!
      this.getWindowRenderValue(this.htCode) 
    });
  }

  getWindowRenderValue(htcode: string) {
    this.LoaderService.show()
    this.http.get<any[]>('user/GetDynamicWindowRenderValue', { GroupName: 'Footer', HtCode: htcode }).subscribe((res) => {
      if (res) {
        this.resValue = res
        this.LoaderService.hide()
      }
    })
  }


}

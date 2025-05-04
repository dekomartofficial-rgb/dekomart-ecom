import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProductDetails, ProductVairant } from '@/app/provider/class/ProductClass';
import { DropdownModule } from 'primeng/dropdown';
import { CommonService } from '@/app/provider/services/common.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastService } from '@/app/provider/services/toast.service';
import { LoaderService } from '@/app/provider/services/loader.service';
import { HttpClientService } from '@/app/provider/services/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaModule,
    RadioButtonModule,
    DropdownModule,
    FileUploadModule,
    ColorPickerModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  ProductDetails: ProductDetails = new ProductDetails();
  ProductVariants: ProductVairant[] = [new ProductVairant()];
  ClickedImage: number = 0;
  DiscountType: any[] = [];
  Gender: any[] = [];
  ClothingSize: any[] = [];
  Category: any[] = [];
  AddVariantsRow: any[] = [0];
  ProductImages: any[] = [];
  selectedFiles: File[] = [];
  imagePreviews: any[] = [];
  imageHover: boolean = false;

  selectedGender: string = '';
  productForm = new FormGroup({
    ProductName: new FormControl(''),
    ProductDesc: new FormControl(''),
    ProductSize: new FormControl(''),
    ProductColor: new FormControl(''),
    Gender: new FormControl(''),
    BasePricing: new FormControl(0),
    Stock: new FormControl(0),
    Discount: new FormControl(0),
    DiscountType: new FormControl(''),
    Catogery: new FormControl(''),
    Price: new FormControl(0),
  })


  constructor(private commonService: CommonService, private _messageservice: ToastService, private loader: LoaderService, private httpService: HttpClientService, private Router: Router) { }
  ngOnInit() {
    this.GetRefData();
  }
  GetRefData() {
    this.commonService.getRefGroupData('DISCOUNT_TYPE,CLOTH_SIZE,GENDER,CATEGORY').subscribe({
      next: (res: any[]) => {
        this.DiscountType = res.filter(item => item.groupName === 'DISCOUNT_TYPE');
        this.ClothingSize = res.filter(item => item.groupName === 'CLOTH_SIZE');
        this.Gender = res.filter(item => item.groupName === 'GENDER');
        this.Category = res.filter(item => item.groupName === 'CATEGORY');
      }
    });
  }

  changeImage(index: number) {
    this.ClickedImage = index
  }

  addProductVariantRow() {
    let newVariant = new ProductVairant();
    this.ProductVariants.push(newVariant);
  }

  removeProductVaiantRow(index: number) {
    this.loader.show()
    this.ProductVariants.splice(index, 1);
    this._messageservice.show('Success', 'Product Variant Removed Successfully!');
    this.loader.hide()
  }

  selectProductSize(size: any) {
    let sizes = this.ProductDetails.ProductSize ? this.ProductDetails.ProductSize.split(',').filter(s => s.trim() !== '') : [];
    const index = sizes.indexOf(size);
    if (index > -1) {
      sizes.splice(index, 1);
    } else {
      sizes.push(size);
    }
    this.ProductDetails.ProductSize = sizes.join(',');
  }

  saveProductDetails() {
    this.ProductDetails.OpsMode = 'INSERT';
    this.saveProduct();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);

      for (let file of newFiles) {
        const isDuplicate = this.selectedFiles.some(
          existingFile => existingFile.name === file.name && existingFile.size === file.size
        );

        if (!isDuplicate) {
          this.selectedFiles.push(file);

          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreviews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  saveProduct() {
    this.loader.show() 
    this.httpService.post('admin/SaveProductHeader',  { ProductDetails: this.ProductDetails, ProductVariants: this.ProductVariants }).subscribe((res: any) => {
      if (res.MessageType === 2) {
        this._messageservice.show('Success', res.Message);
        this.loader.hide()
        this.Router.navigate(['/admin/product-details']);
      } else {
        this._messageservice.show('Error', res.Message);
        this.loader.hide()
      }
    });
  }

}


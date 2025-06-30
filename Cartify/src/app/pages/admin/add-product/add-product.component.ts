import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogService } from '@/app/provider/services/confirmation-dialog.service';



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
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  ProductDetails: ProductDetails = new ProductDetails();
  Product: any[] = [];
  Variants: any[] = [];
  ProductVariants: ProductVairant[] = new Array<ProductVairant>();
  ClickedImage: number = 0;
  DiscountType: any[] = [];
  Gender: any[] = [];
  ClothingSize: any[] = [];
  Catogery: any[] = [];
  AddVariantsRow: any[] = [0];
  ProductImages: any[] = [];
  selectedFiles: File[] = [];
  imagePreviews: any[] = [];
  imageHover: boolean = false;
  isVariantValidate: boolean = false;
  selectedGender: any[] = [];
  productForm: FormGroup;
  SizeArray: any[] = []
  DocumentId: number = 0
  ProductId: number = 0

  constructor(private commonService: CommonService, private _messageservice: ToastService, private loader: LoaderService, private httpService: HttpClientService, private _router: Router,
    private fb: FormBuilder, private http: HttpClient, private ConfirmationService: ConfirmationDialogService) {
    this.productForm = this.fb.group({
      ProductName: ['', Validators.required],
      ProductDesc: ['', Validators.required],
      BasePricing: ['', Validators.required],
      Catogery: ['', Validators.required],
      ProductSize: ['', Validators.required],
      Gender: ['', Validators.required],
      Discount: ['', Validators.required],
      DiscountTypeModel: [''],
      description: ['', Validators.required],
      Stock: [''],
      Price: ['', Validators.required],
      variants: this.fb.array([]),
    });

  }
  ngOnInit() {
    // this.addProductVariantRow();
    this.ProductId = history.state['productId'];
    if (this.ProductId ?? this.ProductId > 0) {
      this.getProductVariantDetails(this.ProductId);
      this.getProductImage(this.ProductId)
    }
    this.GetRefData();
  }
  GetRefData() {
    this.commonService.getRefGroupData('DISCOUNT_TYPE,CLOTH_SIZE,GENDER,CATEGORY').subscribe({
      next: (res: any[]) => {
        this.DiscountType = res.filter(item => item.groupName === 'DISCOUNT_TYPE');
        this.ClothingSize = res.filter(item => item.groupName === 'CLOTH_SIZE');
        this.Gender = res.filter(item => item.groupName === 'GENDER');
        this.Catogery = res.filter(item => item.groupName === 'CATEGORY');
      }
    });
  }

  getProductImage(ProductId: number) {
    this.loader.show()
    this.commonService.getDocument(ProductId, 'PRODUCT').then((files: any[]) => {
      this.imagePreviews = files.map(file => file.docPath);
      this.ProductImages = files
      this.loader.hide();
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

  selectProductSize(size: string) {
    if (!size) return;
    this.SizeArray = this.ProductDetails.ProductSize?.includes(',') ? this.ProductDetails.ProductSize.split(',') : this.ProductDetails.ProductSize ? [this.ProductDetails.ProductSize] : [];

    // Trim whitespace from sizes
    this.SizeArray = this.SizeArray.map(s => s.trim());
    const index = this.SizeArray.indexOf(size);

    if (index > -1) {
      this.SizeArray.splice(index, 1);
    } else {
      this.SizeArray.push(size);
    }
    this.ProductDetails.ProductSize = this.SizeArray.join(',');
    this.selectedGender = [this.ProductDetails.ProductSize]
  }

  isCheckedProduct(size: string): boolean {
    this.SizeArray = this.ProductDetails.ProductSize?.includes(',') ? this.ProductDetails.ProductSize.split(',') : this.ProductDetails.ProductSize ? [this.ProductDetails.ProductSize] : [];

    this.SizeArray = this.SizeArray.map(s => s.trim());
    const index = this.SizeArray.indexOf(size);

    if (index > -1) {
      return true
    } else {
      return false
    }
  }


  saveProductDetails() {
    this.ProductDetails.OpsMode = 'INSERT';
    this.saveProduct();
  }

  getProductVariantDetails(productId: number) {
    this.loader.show()
    this.httpService.get('admin/GetProductAndVariant', { ProductId: productId }).subscribe((res: any) => {
      this.Product = res[0];
      this.Variants = res[1];
      this.ProductDetails.ProductID = this.Product[0].ProductId;
      this.ProductDetails.ProductName = this.Product[0].ProductName;
      this.ProductDetails.ProductNo = this.Product[0].ProductNo;
      this.ProductDetails.ProductDesc = this.Product[0].ProductDesc;
      this.ProductDetails.ProductSize = this.Product[0].ProductSize;
      this.ProductDetails.Gender = this.Product[0].Genders;
      this.ProductDetails.BasePricing = this.Product[0].TotalStock;
      this.ProductDetails.BasePricing = this.Product[0].BasePrice
      this.ProductDetails.Stock = this.Product[0].TotalStock;
      this.ProductDetails.Discount = this.Product[0].Discount;
      this.ProductDetails.DiscountType = this.Product[0].DiscountType;
      this.ProductDetails.Catogery = this.Product[0].Category;
      this.ProductVariants = [];
      this.ProductVariants.push(...this.Variants)
      this.loader.hide()
    });

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

  validateProductVariant() {
    this.isVariantValidate = true;
    if (this.ProductVariants.length > 0 && this.ProductVariants.some((variant) => variant.Colour.length > 0)) {
      return this.isVariantValidate = true;
    }
    for (let i = 0; i < this.ProductVariants.length; i++) {
      const variant = this.ProductVariants[i];
      if (!variant.Colour || !variant.Price || !variant.Size || !variant.Stock) {
        this.isVariantValidate = false;
        this._messageservice.show('Error', 'Atleast one product variant is required!');
        this.loader.hide()
        break;
      }
    }
    return this.isVariantValidate;
  }

  saveProduct() {
    let fd = new FormData();
    this.loader.show()
    for (var i = 0; i < this.selectedFiles.length; i++) {
      fd.append("ProductUpload", this.selectedFiles[i], this.selectedFiles[i].name);
    }
    fd.append('ProductDetails', JSON.stringify(this.ProductDetails));
    fd.append('ProductVariants', JSON.stringify(this.ProductVariants));

    this.httpService.post('admin/SaveProductHeader', fd).subscribe((res: any) => {
      if (res.MessageType === 2) {
        this._messageservice.show('Success', res.Message);
        this.getProductVariantDetails(this.ProductId)
        this.getProductImage(this.ProductId)
        this.loader.hide() 
      } else {
        this._messageservice.show('Error', res.Message);
        this.loader.hide()
      }
    });
  }

  resetProdct() {
    this.ProductDetails = new ProductDetails;
    this.ProductVariants = new Array<ProductVairant>();
    this.ProductImages = []
  }
  deleteProduct() {
    this.ConfirmationService.confirm({
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this Product?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        let fd = new FormData();
        this.ProductDetails.OpsMode = 'DELETE'
        fd.append('ProductDetails', JSON.stringify(this.ProductDetails));
        this.httpService.post('admin/SaveProductHeader', fd).subscribe((res: any) => {
          if (res.MessageType === 2) {
            this._messageservice.show('Success', res.Message);
            this.loader.hide()
            this._router.navigate(['/admin/product-details']);
          } else {
            this._messageservice.show('Error', res.Message);
            this.loader.hide()
          }
        });
      }
    });
  }
  deleteAttachment() {
    this.ConfirmationService.confirm({
      title: 'Delete Confirmation',
      message: 'Are you sure you want to delete this Product Image?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        const index = this.ClickedImage;
        if (this.ProductImages && this.ProductImages[index]) {
          this.DocumentId = this.ProductImages[index].docId;
        }

        this.httpService.post('admin/DeleteAttachment', { DocumentId: this.DocumentId, filePath: this.ProductImages[index].Actualpath }).subscribe((res: any) => {
          if (res.MessageType === 2) {
            this._messageservice.show('Success', res.Message);
            this.getProductVariantDetails(this.ProductId);
            this.getProductImage(this.ProductId)
            this.ClickedImage = 0;
            this.loader.hide()
          } else {
            this._messageservice.show('Error', res.Message);
            this.loader.hide()
          }
        });
      }

    });
  }
}


import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FilterMatchMode } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { FieldsetModule } from 'primeng/fieldset';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@/app/provider/services/toast.service';
import { Product, ProductVariant } from '@/app/provider/interface/AdminInterface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, Dialog, InputTextModule, FormsModule, FloatLabel, RatingModule, TagModule, TextareaModule, ImageModule, FileUploadModule, DropdownModule, CardModule, FieldsetModule, DividerModule, ReactiveFormsModule, ColorPickerModule, MultiSelectModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  selectedImages: string[] = [];
  addProductDialog: boolean = false;
  selectedColor: string = '#ff0000';
  imagePreviews: string[] = [];
  variantCount : number = 1;
  filters: any;
  statusOptions = [
    { label: 'In Stock', value: 'In Stock' },
    { label: 'Low Stock', value: 'Low Stock' },
    { label: 'Out of Stock', value: 'Out of Stock' }
  ];
  products: any[] = [
    { id: '1000', name: 'Macbook Pro', category: 'Electronics', quantity: 10, inventoryStatus: 'IN STOCK', rating: 3, price: 2500 },
    { id: '1001', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'OUT OF STOCK', rating: 5 },
  ];
  categories = [
    { name: 'Electronics', code: 'ELEC' },
    { name: 'Clothing', code: 'CLOTH' }
  ];
  brands = [
    { name: 'Nike', code: 'NIKE' },
    { name: 'Apple', code: 'APPLE' }
  ];
  colors = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' }
  ];
  sizes = [
    { name: 'Small', code: 'S' },
    { name: 'Medium', code: 'M' },
    { name: 'Large', code: 'L' }
  ];

  selectedSize: any = '';
  productForm: FormGroup;
  
  savedProduct: Product = {
    ProductId: 0,
    ProductName: '',
    CategoryCode: '',
    BrandCode: '',
    CompanyId: 0,
    About: '',
    LoggedUserId: 0,
    OpsMode: '',
    Variants: []
  };

  productVariantDetails: ProductVariant = {
    VariantId: 0,
    VariantName: '',
    Description: '',
    Price: 0,
    Stock: 0,
    Color: '',
    Size: '',
    imageUrl: ''
  }

  constructor(private fb: FormBuilder,  private toastService: ToastService) {

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: [null, Validators.required],
      brand: [null, Validators.required],
      color: [[], Validators.required],
      size: [[], Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      variants: this.fb.array([])
    });
  }

  ngOnInit() {

    this.filters = {
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      price: { value: null, matchMode: FilterMatchMode.EQUALS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      inventoryStatus: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
  }

 
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  addVariant(): void {
    this.variantCount++;
  }

  removeVariant(): void {
    this.variantCount--; 
  }

  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    const mapping: { [key: string]: 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined } = {
      'in stock': 'success',
      'low stock': 'warn',
      'OUT OF STOCK': 'danger'
    };
    return mapping[status] || 'info';
  }

  showDialog() {
    this.addProductDialog = true;
  }

  onImageSelect(event: any) {
    if (event.target.files) {
      const files = Array.from(event.target.files) as File[];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
  }


}

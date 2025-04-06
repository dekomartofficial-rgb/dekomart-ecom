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
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '@/app/provider/services/http-client.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, Dialog, InputTextModule, FormsModule, FloatLabel, RatingModule, TagModule, TextareaModule, ImageModule, FileUploadModule, DropdownModule, CardModule, FieldsetModule, DividerModule, ReactiveFormsModule, ColorPickerModule, MultiSelectModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  imagePreviews: { [key: number]: string[] } = {};
  imageFiles: { [key: number]: File[] } = {};
  addProductDialog: boolean = false;
  selectedColor: string = '#ff0000';
  variantCount: number = 0;
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

  constructor(private fb: FormBuilder, private http: HttpClientService, private toastService: ToastService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: [null, Validators.required],
      brand: [null, Validators.required],
      variants: this.fb.array([this.createVariantGroup()])
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

  addVariant() {
    this.variants.push(this.createVariantGroup());
  }

  removeVariant(index: number) {
    this.variants.removeAt(index);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();

      const productData = this.productForm.value;
      formData.append('productId', '0');
      formData.append('productName', productData.productName);
      formData.append('category', productData.category);
      formData.append('brand', productData.brand);
      formData.append('OPSMode', 'INSERT');
  
      const variants = productData.variants.map((variant: any, i: number) => {
        const variantData = {
          color: variant.color,
          size: variant.size,
          price: variant.price,
          stock: variant.stock,
        };
  
        if (this.imageFiles[i]) {
          this.imageFiles[i].forEach((file, index) => {
            formData.append(`variantImages[${i}]`, file, file.name);
          });
        }
        return variantData;
      });
      formData.append('variants', JSON.stringify(variants));

      interface SaveProductResponse {
        MessageType: number;
        Message: string;
      }
  
      this.http.post<SaveProductResponse>('admin/SaveProduct', formData).subscribe({
        next: (res: SaveProductResponse) => {
        if (res.MessageType === 2) {
          this.toastService.show('Success', res.Message);
        } else {
          this.toastService.show('Error', res.Message);
        }
        },
        error: (err: string) => {
        this.toastService.show('Error', err);
        }
      });
    } else {
      this.toastService.show('Error', 'Please fill all required fields.');
    }
    
  }

  createVariantGroup(): FormGroup {
    return this.fb.group({
      color: [[]],
      size: [[]],
      price: [0],
      stock: [0],
      imageUrl: [[]]
    });
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

  onImageSelect(event: Event, variantIndex: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    this.imageFiles[variantIndex] = files;
    this.imagePreviews[variantIndex] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews[variantIndex].push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(variantIndex: number, imageIndex: number): void {
    this.imagePreviews[variantIndex].splice(imageIndex, 1);
    this.imageFiles[variantIndex].splice(imageIndex, 1);
  }


}

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
  sizes: any[] = [];
  imagePreviews: string[] = [];
  productName: string = '';
  productId: string = '';
  productPrice: string = '';
  productCategory: string = '';
  productBrand: string = '';
  productColor: string = '';
  productVariant: string = '';
  productSize: string = '';
  productStock: string = '';
  description: string = '';

  filters: any;
  statusOptions = [
    { label: 'In Stock', value: 'In Stock' },
    { label: 'Low Stock', value: 'Low Stock' },
    { label: 'Out of Stock', value: 'Out of Stock' }
  ];

  products: any[] = [
    { id: '1000', name: 'Macbook Pro', category: 'Electronics', quantity: 10, inventoryStatus: 'IN STOCK', rating: 3, price: 2500 },
    { id: '1001', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'OUT OF STOCK', rating: 5 },];

  selectedCategory: any = '';
  categoryes = [
    { name: 'Clothing', code: 'CL' },
    { name: 'Electronics', code: 'EL' },
    { name: 'Foods', code: 'FOD' },
    { name: 'Toyes', code: 'TOY' },
  ];

  colors = [
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#008000' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Yellow', value: '#FFFF00' },
    { label: 'Black', value: '#000000' },
    { label: 'White', value: '#FFFFFF' }
  ];

  selectedSize: any = '';


  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sizes = [
      { name: 'Small', code: 'S' },
      { name: 'Medium', code: 'M' },
      { name: 'Large', code: 'L' },
      { name: 'Xtra Large', code: 'XL' },
    ];

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      variants: this.fb.array([])
    });

    this.addVariant();
  }

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  addVariant(): void {
    const variantForm = this.fb.group({
      color: [[]],
      size: [[]],
      price: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });

    this.variants.push(variantForm);
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  submitForm(): void {
    if (this.productForm.valid) {
      console.log('Product Data:', this.productForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }


  ngOnInit() {
    this.filters = {
      name: { value: null, matchMode: FilterMatchMode.CONTAINS },
      price: { value: null, matchMode: FilterMatchMode.EQUALS },
      category: { value: null, matchMode: FilterMatchMode.CONTAINS },
      inventoryStatus: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
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

  saveProduct() {
    this.addProductDialog = false;
  }


  editProduct(product: any) {
    this.addProductDialog = true;
    this.productName = product.name;
    this.productId = product.id;
    this.productPrice = product.price;
    this.productCategory = product.category;
    this.productBrand = product.brand;
    this.productColor = product.color;
    this.productVariant = product.variant;
    this.productSize = product.size;
    this.productStock = product.stock;
    this.description = product.description;
  }

  deleteProduct(product: any) {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.products = this.products.filter(p => p !== product);
      console.log("Deleted Product:", product);
    }
  }

}

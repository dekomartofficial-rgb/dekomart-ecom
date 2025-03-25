import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Dialog } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FilterMatchMode } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, Dialog, InputTextModule, FormsModule, FloatLabel, RatingModule, TagModule, TextareaModule, ImageModule, FileUploadModule, DropdownModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  selectedImages: string[] = [];
  addProductDialog: boolean = false;
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

  onImagesSelect(event: any) {
    for (let file of event.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImages.push(reader.result as string);
      };
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
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

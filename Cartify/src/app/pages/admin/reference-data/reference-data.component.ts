import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
  selector: 'app-reference-data',
  standalone: true,
  imports: [Dialog, FormsModule, TreeModule, ButtonModule, CommonModule, FloatLabel, PanelMenuModule, InputTextModule, ContextMenuModule],
  templateUrl: './reference-data.component.html',
  styleUrl: './reference-data.component.css'
})
export class ReferenceDataComponent {
  selectedCategory: string = 'Construction';
  selectedSubCategory: string = '';
  subCategoryName: string = '';
  addCategoryVisible: boolean = false;
  subCategoryVisible: boolean = false;
  allCategoriesVisible: boolean = false;
  selectedDepartments: TreeNode[] = [];
  departments: TreeNode[] = [];
  categoryName: string = '';
  categoryId: string = '';
  searchTerm: string = '';
  searchQuery = '';

  menuItems = [
    { label: 'Construction', icon: 'pi pi-home', command: () => this.selectCategory('Construction') },
    { label: 'Power Tools', icon: 'pi pi-bolt', command: () => this.selectCategory('Power Tools') },
    { label: 'Garden', icon: 'pi pi-leaf', command: () => this.selectCategory('Garden') },
    { label: 'Protective clothing', icon: 'pi pi-shield', command: () => this.selectCategory('Protective clothing') },
    { label: 'Industry', icon: 'pi pi-cog', command: () => this.selectCategory('Industry') },
    { label: 'Home and Workshop', icon: 'pi pi-tools', command: () => this.selectCategory('Home and Workshop') },
    { label: 'Measuring devices', icon: 'pi pi-ruler', command: () => this.selectCategory('Measuring devices') }
  ];

  categories = [
    { name: 'Paving tools', items: ['Grabs', 'Guillotines', 'Paving carts'] },
    { name: 'Trailers', items: ['Cargo trailers', 'Open trailers', 'Tipper trailers'] },
    { name: 'Cutters', items: ['Tile cutters', 'Floor cutters', 'Manual cutters'] },
    { name: 'Hand tools', items: ['Hammers', 'Toolboxes', 'Scissors'] },
    { name: 'Compactors', items: ['Reversible compactors', 'Alloy compactors'] },
    { name: 'Lighting', items: ['Lighting masts', 'Workshop lamps'] },
    { name: 'Concrete equipment', items: ['Concrete mixers', 'Vibrating bars', 'Trowels'] },
    { name: 'High pressure washers', items: ['Mobile washers', 'Stationary washers'] },
    { name: 'Levelers', items: ['Electronic levels', 'Laser levels', 'Optical levels'] }
  ];

  filteredMenuItems: any = [...this.menuItems];
  files: TreeNode[] = [
    {
      label: 'Finance',
      selectable: false,
      children: [
        { label: 'Chief Financial Officer', data: 'CFO', key: '1' },
        { label: 'Something Finance', data: 'Finance1', key: '2' },
        { label: 'Finance Minance', data: 'Finance2', key: '3' },
        { label: 'Finance Binance Minance', data: 'Finance3', key: '4' },
        { label: 'Binny Winny Minny', data: 'Finance4', key: '5' },
        { label: 'Zinny Finny Kinny', data: 'Finance5', key: '6' }
      ]
    }
  ];

  selectedNodes: TreeNode[] = [];

  isSingleSelection(): boolean {
    return this.selectedNodes.length === 1;
  }

  isMultiSelection(): boolean {
    return this.selectedNodes.length > 1;
  }

  editNode(node: TreeNode) {
    console.log('Editing:', node.label);
  }

  deleteNode(node: TreeNode, parent?: TreeNode) {
    if (parent?.children) {
      parent.children = parent.children.filter(child => child !== node);
    }
  }

  deleteSelectedNodes() {
    this.selectedNodes.forEach(node => {
      this.files.forEach(parent => {
        if (parent.children) {
          parent.children = parent.children.filter(child => !this.selectedNodes.includes(child));
        }
      });
    });
    this.selectedNodes = [];
  }

  addCategoryDialog() {
    this.addCategoryVisible = true;
  }

  subCategoryDialog() {
    this.subCategoryVisible = true;
  }

  editCategory(category: any) {
    console.log('Editing:', category);
  }

  deleteCategory(category: any) {
    console.log('Deleting:', category);
    this.categories = this.categories.filter(cat => cat !== category);
  }


  viewAllCategories(category: any) {
    this.allCategoriesVisible = true;
    this.selectedSubCategory = category.name;
  }

  closeviewAllCategories() {
    this.allCategoriesVisible = false;
  }

  filterMenu() {
    if (!this.searchTerm) {
      this.filteredMenuItems = [...this.menuItems];
    } else {
      this.filteredMenuItems = this.menuItems.filter((item: { label: string; }) =>
        item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}

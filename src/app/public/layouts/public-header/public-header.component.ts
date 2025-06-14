import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PublicRoutes } from '../../public.routes';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../_core/services/product.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { slideDownUp } from '../../../shared/utils/animations';
import { CartService } from '../../../_core/services/cart.service';
import { CatMenuComponent } from '../../../shared/cat-menu/cat-menu.component';

import { CategoriesService } from '../../../_core/services/categories.service';
import { Category } from '../../../models/category';
import { get } from 'http';

interface Product {
  product_id: number;
  product_code: string;
  name: string;
  description: string;
  regular_price: string;
  sale_price: string;
  image_url: string;
}

@Component({
  selector: 'app-public-header',
  imports: [RouterLink, NgFor, FormsModule, NgIf, CatMenuComponent],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.css',
  animations: [slideDownUp]
})
export class PublicHeaderComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  isMobileMenuOpen = false;
  showDropdown = false;
  searchTerm = '';
  searchResults: Product[] = [];
  publicRoutes = PublicRoutes;
  showTopSection = true;
  showCatMenu = false;
  categories: Category[] = [];
 
  
  navigation = [
    { name: 'Products', path: '/catalog' },
    { name: 'Projects', path: '/projects' },
   // { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  cartItemsCount = 0;
  constructor(private router: Router, private productService: ProductService, private cartService: CartService, private categoryService: CategoriesService){
    this.cartItemsCount = this.cartService.getCartItemsCount();
  }
  ngOnInit(): void {
    this.getMenuCategories();
  }

    getMenuCategories(){
    this.categoryService.getMenuCategories().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }



  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    
    if (this.searchTerm.length > 2) {
      this.getSearchProduct(this.searchTerm);
    
    
      
      
    } else {
      this.showDropdown = false;
      this.searchResults = [];
    }
  }

  onSelectProduct(product: Product) {
    this.router.navigate([PublicRoutes.Details], { 
      queryParams: { 
        id: product.product_id,
        search: this.searchTerm 
      } 
    });
    this.showDropdown = false;
    this.searchTerm = '';
  }

  onBlur() {
    // Small delay to allow click events to fire before hiding dropdown
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }
  getSearchProduct(search: string){
    this.productService.getSearchProduct(search).subscribe((res) => {
      this.searchResults = res.data;
      this.showDropdown = this.searchResults.length > 0;
    });
  }
  onCatalogSearch(event: Event){
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    if (this.searchTerm.length > 2) {
      this.router.navigate([PublicRoutes.Catalog], { 
        queryParams: { 
          search: this.searchTerm 
        } 
      });
      this.showDropdown = false;
      this.searchTerm = '';
    }
  }
}

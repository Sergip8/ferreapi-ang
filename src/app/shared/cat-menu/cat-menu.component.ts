import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Category } from '../../models/category';
import { CategoriesService } from '../../_core/services/categories.service';
import { PublicRoutes } from '../../public/public.routes';


@Component({
  selector: 'app-cat-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-menu.component.html',
  styleUrls: ["./cat-menu.component.css"]
})
export class CatMenuComponent implements OnInit {


  constructor(private router: Router){}
goToCat(cat: Category) {
 this.router.navigate([PublicRoutes.Catalog], { queryParams: { cat: cat.category_id }, queryParamsHandling: 'merge' })
}
  @Input() categories: Category[] = [];
  mainCategories: Category[] = [];
  activeCategory!: Category 
  subcategories: Category[] = [];
  isSubcategoryMenuVisible = false;



  ngOnInit(): void {

    console.log(this.categories)
    this.mainCategories = this.categories.filter(cat => cat.parent_category_id === null && cat.is_active);
    console.log(this.mainCategories);
  }

  onCategoryHover(category: Category): void {
    this.activeCategory = category;
    this.subcategories = this.categories.filter(
      cat => cat.parent_category_id === category.category_id && cat.is_active
    );
    this.isSubcategoryMenuVisible = this.subcategories.length > 0;
  }

  onMenuMouseLeave(): void {
    // Add a small delay before hiding the submenu to prevent accidental hide
    setTimeout(() => {
      this.isSubcategoryMenuVisible = false;
    }, 300);
  }

  // Keep the submenu visible when hovering over it
  onSubcategoryMenuHover(): void {
    clearTimeout(this.hideTimeout);
    this.isSubcategoryMenuVisible = true;
  }
  subcategoryExists(category: Category): boolean {
    return this.categories.some(sub => sub.parent_category_id === category.category_id);
  }

  private hideTimeout: any;
}
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '../../models/category';
import { CategoriesService } from '../../_core/services/categories.service';


@Component({
  selector: 'app-cat-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-menu.component.html',
  styleUrls: ["./cat-menu.component.css"]
})
export class CatMenuComponent implements OnInit {
  @Input() categories: Category[] = [];
  mainCategories: Category[] = [];
  activeCategory!: Category 
  subcategories: Category[] = [];
  isSubcategoryMenuVisible = false;





  // This would normally come from a service
  mockCategories: Category[] = [
    {
      category_id: 1,
      category_name: 'Hand Tools',
      parent_category_id: 0,
      description: 'Quality hand tools for professionals and DIY enthusiasts',
      display_order: 1,
      image_url: 'assets/images/categories/hand-tools.jpg',
      is_active: true
    },
    {
      category_id: 2,
      category_name: 'Power Tools',
      parent_category_id: 0,
      description: 'Professional power tools for any job',
      display_order: 2,
      image_url: 'assets/images/categories/power-tools.jpg',
      is_active: true
    },
    {
      category_id: 3,
      category_name: 'Plumbing',
      parent_category_id: 0,
      description: 'Plumbing supplies and fixtures',
      display_order: 3,
      image_url: 'assets/images/categories/plumbing.jpg',
      is_active: true
    },
    {
      category_id: 4,
      category_name: 'Electrical',
      parent_category_id: 0,
      description: 'Electrical supplies and components',
      display_order: 4,
      image_url: 'assets/images/categories/electrical.jpg',
      is_active: true
    },
    {
      category_id: 5,
      category_name: 'Building Materials',
      parent_category_id: 0,
      description: 'Essential building and construction materials',
      display_order: 5,
      image_url: 'assets/images/categories/building-materials.jpg',
      is_active: true
    },
    // Subcategories for Hand Tools
    {
      category_id: 101,
      category_name: 'Hammers',
      parent_category_id: 1,
      description: 'Various types of hammers',
      display_order: 1,
      image_url: 'assets/images/categories/hammers.jpg',
      is_active: true
    },
    {
      category_id: 102,
      category_name: 'Screwdrivers',
      parent_category_id: 1,
      description: 'All types of screwdrivers',
      display_order: 2,
      image_url: 'assets/images/categories/screwdrivers.jpg',
      is_active: true
    },
    {
      category_id: 103,
      category_name: 'Wrenches',
      parent_category_id: 1,
      description: 'Wrenches and spanners',
      display_order: 3,
      image_url: 'assets/images/categories/wrenches.jpg',
      is_active: true
    },
    {
      category_id: 104,
      category_name: 'Pliers',
      parent_category_id: 1,
      description: 'Various types of pliers',
      display_order: 4,
      image_url: 'assets/images/categories/pliers.jpg',
      is_active: true
    },
    // Subcategories for Power Tools
    {
      category_id: 201,
      category_name: 'Drills',
      parent_category_id: 2,
      description: 'Electric and cordless drills',
      display_order: 1,
      image_url: 'assets/images/categories/drills.jpg',
      is_active: true
    },
    {
      category_id: 202,
      category_name: 'Saws',
      parent_category_id: 2,
      description: 'Circular, jig and reciprocating saws',
      display_order: 2,
      image_url: 'assets/images/categories/saws.jpg',
      is_active: true
    },
    {
      category_id: 203,
      category_name: 'Sanders',
      parent_category_id: 2,
      description: 'Electric sanders',
      display_order: 3,
      image_url: 'assets/images/categories/sanders.jpg',
      is_active: true
    },
    // Subcategories for Plumbing
    {
      category_id: 301,
      category_name: 'Pipes & Fittings',
      parent_category_id: 3,
      description: 'Pipes and pipe fittings',
      display_order: 1,
      image_url: 'assets/images/categories/pipes.jpg',
      is_active: true
    },
    {
      category_id: 302,
      category_name: 'Faucets',
      parent_category_id: 3,
      description: 'Kitchen and bathroom faucets',
      display_order: 2,
      image_url: 'assets/images/categories/faucets.jpg',
      is_active: true
    },
    // Subcategories for Electrical
    {
      category_id: 401,
      category_name: 'Wiring',
      parent_category_id: 4,
      description: 'Electrical wiring and cables',
      display_order: 1,
      image_url: 'assets/images/categories/wiring.jpg',
      is_active: true
    },
    {
      category_id: 402,
      category_name: 'Switches & Outlets',
      parent_category_id: 4,
      description: 'Electrical switches and outlets',
      display_order: 2,
      image_url: 'assets/images/categories/switches.jpg',
      is_active: true
    },
    // Subcategories for Building Materials
    {
      category_id: 501,
      category_name: 'Lumber',
      parent_category_id: 5,
      description: 'Wood and lumber products',
      display_order: 1,
      image_url: 'assets/images/categories/lumber.jpg',
      is_active: true
    },
    {
      category_id: 502,
      category_name: 'Drywall',
      parent_category_id: 5,
      description: 'Drywall sheets and accessories',
      display_order: 2,
      image_url: 'assets/images/categories/drywall.jpg',
      is_active: true
    }
  ];

  ngOnInit(): void {
    // In a real app, you would fetch categories from a service
    // this.categoryService.getCategories().subscribe(data => {
    //   this.categories = data.filter(cat => cat.parent_category_id === 0 && cat.is_active);
    // });
    
    // Using mock data for demonstration
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
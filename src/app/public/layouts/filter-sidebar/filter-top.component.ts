import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../_core/services/common.service';
import { distinctUntilChanged } from 'rxjs';
import { ProductService } from '../../../_core/services/product.service';
import { Router } from '@angular/router';
import { PublicRoutes } from '../../public.routes';
import { QueryFilterParam } from '../../../models/filters';

interface FilterOption {
  label: string;
  value: string;
}

interface SortOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-top',
  imports:[CommonModule, FormsModule],
  template: `
  <div class="filter-top bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-6">
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      <!-- Left section with filter counts and active filters -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div class="text-gray-700">
          <span class="font-bold text-orange-600">{{count}}</span> products found
        </div>
        
        <!-- Active filters pills -->
        <div *ngIf="activeFilters && activeFilters.length > 0" class="flex flex-wrap gap-2">
          <div *ngFor="let filter of activeFilters" 
               class="flex items-center bg-orange-50 text-orange-800 text-sm px-3 py-1 rounded-full">
            <span>{{filter.label}}: {{filter.value}}</span>
            <button (click)="removeFilter(filter)" class="ml-2 focus:outline-none" aria-label="Remove filter">
              <svg class="w-4 h-4 text-orange-700" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          
          <button *ngIf="activeFilters.length > 1" 
                 (click)="clearAllFilters()" 
                 class="text-sm text-gray-600 hover:text-orange-700 underline focus:outline-none">
            Clear all
          </button>
        </div>
      </div>
      
      <!-- Right section with sort dropdown and view switcher -->
      <div class="flex items-center gap-4 self-end md:self-auto ">
        <!-- Sort dropdown -->
            <div class="md:hidden">
      <button (click)="toggleMobileFilters()" 
             class="w-full flex items-center justify-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium py-2 px-4 rounded-md transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
        </svg>
        Filters
      </button>
    </div>
        <div class="relative">
          <label for="sort-select" class="text-sm text-gray-600 mr-2">Sort by:</label>
          <div class="inline-block relative">
            <select id="sort-select" 
                   [(ngModel)]="selectedSort" 
                   (change)="onSortChange()" 
                   class="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option *ngFor="let option of sortOptions" [value]="option.value">
                {{option.label}}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- View switcher -->
        <div class="flex items-center space-x-2 border-l pl-4 border-gray-200">
          <button (click)="setViewMode('grid')" 
                 [ngClass]="{'text-orange-600': viewMode === 'grid', 'text-gray-400 hover:text-gray-700': viewMode !== 'grid'}"
                 class="focus:outline-none" 
                 aria-label="Grid view">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
            </svg>
          </button>
          <button (click)="setViewMode('list')" 
                 [ngClass]="{'text-orange-600': viewMode === 'list', 'text-gray-400 hover:text-gray-700': viewMode !== 'list'}"
                 class="focus:outline-none" 
                 aria-label="List view">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Optional mobile filter button (appears only on mobile) -->
 
  </div>
</div>
  `,
  styles: []
})
export class FilterTopComponent implements OnInit {
  @Input() activeFilters: FilterOption[] = [];
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() mobileFilterToggled = new EventEmitter();
  @Output() sortChanged = new EventEmitter<string>();
  @Output() viewModeChanged = new EventEmitter<'grid' | 'list'>();
  @Output() filterRemoved = new EventEmitter<FilterOption>();
  @Output() allFiltersCleared = new EventEmitter<void>();
  @Output() mobileFiltersToggled = new EventEmitter<void>();

  selectedSort: string = 'featured';
  
  sortOptions: SortOption[] = [
    { label: 'Price: Low to High', value: 'sale_price:asc' },
    { label: 'Price: High to Low', value: 'sale_price:desc' },
    { label: 'Name: A-Z', value: 'name:asc' },
    { label: 'Name: Z-A', value: 'name:desc' }
  ];

  constructor(private commonService: CommonService, private productService: ProductService, private router: Router) { }

  count = 0 
  ngOnInit(): void {
      this.commonService.currentPagination$
              .pipe(
                distinctUntilChanged() 
              )
              .subscribe(pd => {
               this.count = pd.count
              });
        
  }

  onSortChange(): void {
    const sortSplit = this.selectedSort.split(":")
    this.commonService.updateFilterView({sort: {direction: sortSplit[1], field: sortSplit[0]}})
    //this.productService.updateFilter({sort_by: sortSplit[0], sort_order: sortSplit[1]})
    this.router.navigate([PublicRoutes.Catalog], {queryParams:{[QueryFilterParam.SORT_BY]: sortSplit[0], [QueryFilterParam.SORT_ORDER]: sortSplit[1]}, queryParamsHandling: 'merge'})

  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
    this.viewModeChanged.emit(mode);
  }

  removeFilter(filter: FilterOption): void {
    this.filterRemoved.emit(filter);
  }

  clearAllFilters(): void {
    this.allFiltersCleared.emit();
  }

  toggleMobileFilters(): void {
    this.mobileFiltersToggled.emit();
  }
}
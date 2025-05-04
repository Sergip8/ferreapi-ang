import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { rotateIcon, slideInOut } from '../../../shared/utils/animations';
import { AttributeValue, Brand, Category, FilterValues, Attribute, QueryFilterParam } from '../../../models/filters'
import { CommonService } from '../../../_core/services/common.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { PublicRoutes } from '../../public.routes';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
  animations: [slideInOut, rotateIcon]
})
export class FilterSidebarComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<{
    brands: number[];
    categories: number[];
    attributes: { [key: string]: string[] };
  }>();
  
  @Input() filterValues!: FilterValues;

  filterForm!: FormGroup;
  expandedCategories: boolean = true;
  expandedBrands: boolean = true;
  expandedPrice: boolean = true;
  currentPriceRange = {
    min: 0,
    max: 0
  };

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) {
    // Inicializar los datos de filtro con la propiedad 'expanded' explícitamente en cada atributo

    // Configurar el rango de precios actual
  this.commonService.currentFilter$
            .pipe( 
              distinctUntilChanged() 
            )
            .subscribe(pd => {
              console.log(pd)
              this.filterValues = pd;
              console.log(this.filterValues)             
            });
  }

  ngOnInit(): void {
this.currentPriceRange = {
      min: parseFloat(this.filterValues?.price_range.min),
      max: parseFloat(this.filterValues?.price_range.max)
    };
     

    // Inicializar el formulario
    this.filterForm = this.fb.group({
      priceMin: [this.currentPriceRange.min],
      priceMax: [this.currentPriceRange.max]
    });
     console.log(this.filterForm)
    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }

  formatAttributeName(name: string): string {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  toggleSection(section: string): void {
    if (section === 'categories') {
      this.expandedCategories = !this.expandedCategories;
    } else if (section === 'brands') {
      this.expandedBrands = !this.expandedBrands;
    } else if (section === 'price') {
      this.expandedPrice = !this.expandedPrice;
    }
  }

  toggleAttribute(attribute: Attribute): void {
    console.log('Toggling attribute:', attribute.name, 'from', attribute.expanded, 'to', !attribute.expanded);
    attribute.expanded = !attribute.expanded;
  }

  toggleBrandSelection(brand: Brand): void {
    brand.selected = !brand.selected;
    this.applyFilters();
  }

  toggleCategorySelection(category: Category): void {
    category.selected = !category.selected;
    this.applyFilters();
  }

  toggleAttributeValueSelection(attributeValue: AttributeValue): void {
    attributeValue.selected = !attributeValue.selected;
    this.applyFilters();
  }

  applyFilters(): void {
    
    const selectedFilters = {
      brands: this.filterValues.brands.filter(b => b.selected).map(b => b.id),
      categories: this.filterValues.categories.filter(c => c.selected).map(c => c.id),
      attributes: this.filterValues.attributes.reduce((acc, attr) => {
        const selectedValues = attr.values.filter(v => v.selected).map(v => v.value);
        if (selectedValues.length > 0) {
          acc[attr.name] = selectedValues;
        }
        return acc;
      }, {} as Record<string, string[]>),
      price: {
        min: this.filterForm.value.priceMin,
        max: this.filterForm.value.priceMax
      }
    };
const attr: any = {};

  for (const key in selectedFilters.attributes) {
    attr[key] = selectedFilters.attributes[key].join(',');
  }
  console.log(attr)
  //this.filtersChanged.emit(selectedFilters);
    this.router.navigate([PublicRoutes.Catalog], 
      {queryParams:{
        [QueryFilterParam.BRAND]: selectedFilters.brands.join(","), 
        [QueryFilterParam.CATEGORY]: selectedFilters.categories.join(","),
        [QueryFilterParam.ATTRIBUTES]: JSON.stringify(selectedFilters.attributes)}, queryParamsHandling: 'merge'})
  }

  clearFilters(): void {
    // Reiniciar marcas
    this.filterValues.brands.forEach(brand => brand.selected = false);
    
    // Reiniciar categorías
    this.filterValues.categories.forEach(category => category.selected = false);
    
    // Reiniciar atributos
    this.filterValues.attributes.forEach(attr => {
      attr.values.forEach(val => val.selected = false);
    });
    
    // Reiniciar rango de precios
    this.filterForm.patchValue({
      priceMin: this.currentPriceRange.min,
      priceMax: this.currentPriceRange.max
    });
    
    this.applyFilters();
  }
  getAnimationState(isExpanded: boolean): string {
    return isExpanded ? 'expanded' : 'collapsed';
  }
}
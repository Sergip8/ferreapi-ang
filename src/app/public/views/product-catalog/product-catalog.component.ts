import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../_core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { ProductCard, ProductFilter } from '../../../models/product';
import { CardModel } from '../../components/card/card-model';
import { CommonService } from '../../../_core/services/common.service';
import { FilterValues, QueryFilterParam } from '../../../models/filters'
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { FilterSidebarComponent } from '../../layouts/filter-sidebar/filter-sidebar.component';
import { FilterTopComponent } from '../../layouts/filter-sidebar/filter-top.component';
import { CardComponent } from '../../components/card/card.component';
import { PaginationComponent } from '../../../shared/pagination/pagination';
import { GridLoadingComponent } from '../../components/loading/grid-loading.component';

@Component({
  selector: 'app-product-catalog',
  standalone: false,
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.css'
})
export class ProductCatalogComponent implements OnInit {

  filterValues!: FilterValues
  queryParams!: ProductFilter
  public products$ = new Observable<CardModel[]>();
  showMobileFilters = false;
  isLoading = true;

  constructor(private productService: ProductService, private commonService: CommonService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.pipe(
      map(params => this.mapQueryParams(params))

    ).subscribe(mappedParams => {
      this.queryParams = mappedParams;
      this.productService.updateFilter(this.queryParams)
      

      console.log('Query Params:', this.queryParams);
    });
  }
  ngOnInit() {

    this.products$ = this.productService.currentFilter$.pipe(
      startWith(new ProductFilter()),
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(filter => this.productService.getProductsFiltered(filter)),
      finalize(() => this.isLoading = false),
      tap(data => {
        this.commonService.updatePagination({ count: data.total });
        this.commonService.updateFilterView({
          brands: data.filter_values.brands.map(b => ({
            id: b.id,
            name: b.name,
            count: b.count,
            selected: this.queryParams.brand_ids?.includes(b.id) ?? false
          })),
          categories: data.filter_values.categories.map(c => ({
            id: c.id,
            name: c.name,
            parent_name: c.parent_name,
            count: c.count,
            selected: this.queryParams.category_ids?.includes(c.id) ?? false
          })),
          attributes: data.filter_values.attributes.map(a => ({
            name: a.name,
            expanded: a.values.some(v => this.queryParams.attributes?.[a.name]?.includes(v.value)) ?? false,
            values: a.values.map(v => ({
              value: v.value,
              count: v.count,
              selected: this.queryParams.attributes?.[a.name]?.includes(v.value) ?? false
            }))
          })),
          price_range: data.filter_values.price_range
        })
        this.filterValues = data.filter_values
        console.log(this.filterValues)
        this.isLoading = false
      }),
      map(data => data.data.map((product: ProductCard) => ({
        id: product.product_id,
        title: product.name,
        description: product.description,
        price: product.sale_price ? Number(product.sale_price) : 0,
        originalPrice: product.regular_price,
        imageSrc: product.image_url,
        cardType: 'product'
      } as CardModel))),
      
    );
  }


  private mapQueryParams(params: any): ProductFilter {
    return {
      limit: 10,
      skip: 10 * (this.toNumber(QueryFilterParam.PAGE) ?? 0),
      search: params[QueryFilterParam.SEARCH] ?? null,
      category_ids: params[QueryFilterParam.CATEGORY] ? params[QueryFilterParam.CATEGORY].split(",").map((c: string) => Number(c)) : null,
      brand_ids: params[QueryFilterParam.BRAND] ? params[QueryFilterParam.BRAND].split(",").map((c: string) => Number(c)) : null,
      attributes: params[QueryFilterParam.ATTRIBUTES] ? JSON.parse(params[QueryFilterParam.ATTRIBUTES]): null,
      min_price: this.toNumber(params[QueryFilterParam.PRICE_MIN]) ?? null,
      max_price: this.toNumber(params[QueryFilterParam.PRICE_MAX]) ?? null,
      sort_by: params[QueryFilterParam.SORT_BY] ?? null,
      sort_order: params[QueryFilterParam.SORT_ORDER] ?? "asc",
    };
  }
  private toNumber(value: any): number | null {
    const num = Number(value);
    return isNaN(num) ? null : num;
  }
  gotoPage(page: number) {
    this.commonService.updatePagination({ page: page });
    this.productService.updateFilter({ skip: (page - 1) * (this.queryParams.limit + 1) });

  }
  onFilter(filters: any) {
    this.productService.updateFilter({
      attributes: filters.attributes,
      brand_ids: filters.brands,
      category_ids: filters.categories,
      min_price: filters.price.min,
      max_price: filters.price.max
    })
    console.log(filters);
  }

  goToDetails(productId: number){
    this.router.navigate(['/details/' + productId])
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  clearAllFilters() {
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: 'merge'
    });
  }

}

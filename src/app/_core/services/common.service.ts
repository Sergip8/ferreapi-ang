import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from '../../shared/pagination/pagination-model';
import { Alert } from '../../shared/alert/alert.type';
import { FilterValues } from '../../models/filters';


@Injectable({
  providedIn: 'root'
})
  
export class CommonService {
  constructor() { }

  private alertState = new BehaviorSubject<Alert>(new Alert)
    alertState$ = this.alertState.asObservable()

    updateAlert(value: Alert){
      
        
        this.alertState.next(value)
        setTimeout(() => {
          value.show = false
          this.alertState.next(value)
        }, 4000);
        
    }

     private filterView = new BehaviorSubject<FilterValues>( new FilterValues());
      currentFilter$ = this.filterView.asObservable(); 
    
    
      updateFilterView(updatedFilter: Partial<FilterValues>) {
        let isExpanded = false
        console.log("updateFilterView",updatedFilter)
          const current = this.filterView.value;

  const mergedBrands = updatedFilter.brands
    ? updatedFilter.brands.map(updatedBrand => {
     
        return {
          ...updatedBrand,
     
        };
      })
    : current.brands;

  const mergedCategories = updatedFilter.categories
    ? updatedFilter.categories.map(updatedCategory => {
      
        return {
          ...updatedCategory,
       
        };
      })
    : current.categories;

  const mergedAttributes = updatedFilter.attributes
      
    ? 
    
    updatedFilter.attributes.map(updatedAttr => {
        return {
          ...updatedAttr,
    
          values: updatedAttr.values.map(val => {
            return {
              ...val,
            };
          })
        };
      })
    : current.attributes;

  const mergedPriceRange = updatedFilter.price_range || current.price_range;
  const mergedSort = updatedFilter.sort || current.sort

  this.filterView.next({
    brands: mergedBrands,
    categories: mergedCategories,
    attributes: mergedAttributes,
    price_range: mergedPriceRange,
    sort: mergedSort,
    search: updatedFilter.search || current.search
  });
      }
    
      resetFilterView() {
        this.filterView.next(new FilterValues());
        
      }

    private paginationState = new BehaviorSubject<Pagination>({page: 1, count: 0, size: 10});
    currentPagination$ = this.paginationState.asObservable(); 
  
    updatePagination(updatedFilter: Partial<Pagination>) {
      const currentFilter = this.paginationState.value;
      this.paginationState.next({ ...currentFilter, ...updatedFilter });
    }
  
    resetFilter() {
      this.paginationState.next({page: 1, count: 0, size: 10});
    }

  public prepareRoute(...paths: string[]): string{
    let rootRoute = '/';
    return rootRoute.concat(paths.filter(Boolean).join('/'));
  }
}

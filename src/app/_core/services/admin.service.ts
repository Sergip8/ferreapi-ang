import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../models/category';
import { BasicProduct, ModelCount, Product, ProductCard, ProductFilter } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { SearchParameters } from '../../models/user';

const baseUrl = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private filterRegisterState = new BehaviorSubject<SearchParameters>(new SearchParameters());
  filterRegisterState$ = this.filterRegisterState.asObservable(); 


  updateFilter(updatedFilter: Partial<SearchParameters>) {
    const currentFilter = this.filterRegisterState.value;
    this.filterRegisterState.next({ ...currentFilter, ...updatedFilter });
  }

  resetFilter() {
    this.filterRegisterState.next(new SearchParameters());
    
  }
}







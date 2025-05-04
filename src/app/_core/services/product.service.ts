import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../models/category';
import { BasicProduct, EntityPagination, ModelCount, Product, ProductCard, ProductFilter } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { SearchParameters } from '../../models/user';

const baseUrl = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private filterState = new BehaviorSubject<ProductFilter>(new ProductFilter());
  currentFilter$ = this.filterState.asObservable(); 


  updateFilter(updatedFilter: Partial<ProductFilter>) {
    const currentFilter = this.filterState.value;
    this.filterState.next({ ...currentFilter, ...updatedFilter });
  }

  resetFilter() {
    this.filterState.next(new ProductFilter());
    
  }

  constructor(private http: HttpClient) { }



  getProductsFiltered(params: ProductFilter){
  
    return this.http.post<ModelCount<ProductCard[]>>(baseUrl + 'products', params);
  }
  getProductDetails(productId: number){
    return this.http.get<Product>(baseUrl + 'products/' + productId);
  }
    getProductSuggested(productId: number, limit: number = 4){
      const params = new HttpParams()
      params.append("limit", limit)
    return this.http.get<any>(baseUrl + 'products/' + productId + "/suggested", {params:params});
  }
  getSearchProduct(search: string){
    const params = new HttpParams()
    params.append("search", search)
    params.append("limit", 5)
    return this.http.get<{data: BasicProduct[]}>(baseUrl + 'products/search/quick?search=' + search + '&limit=5');
  }
  createProduct(data: any){
    return this.http.post<any>(baseUrl + 'products', data);
  }
  updateProduct(id: number, data: any){
    return this.http.put<any>(baseUrl + 'products/' + id, data);
  }
  deleteProduct(id: number){
    return this.http.delete<any>(baseUrl + 'products/' + id);
  }
  getPaginatedProducts(params: ProductFilter){
    return this.http.post<EntityPagination<ProductCard[]>>(baseUrl + 'products/paginated', params);
  }
}


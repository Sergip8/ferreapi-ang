import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../models/category';
import { BasicProduct, EntityPagination, ModelCount, Product, ProductCard, ProductFilter } from '../../models/product';
import { BehaviorSubject, catchError, Observable, of, timeout } from 'rxjs';
import { SearchParameters } from '../../models/user';
import { isPlatformServer } from '@angular/common';

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

  constructor(private http: HttpClient,   @Inject(PLATFORM_ID) private platformId: Object) { }



  getProductsFiltered(params: ProductFilter){
  
    return this.http.post<ModelCount<ProductCard[]>>(baseUrl + 'products', params);
  }
  // getProductDetails(productId: number){
  //   return this.http.get<Product>(baseUrl + 'products/' + productId);
  // }
  //   getProductSuggested(productId: number, limit: number = 4){
  //     const params = new HttpParams()
  //     params.append("limit", limit)
  //   return this.http.get<any>(baseUrl + 'products/' + productId + "/suggested", {params:params});
  // }
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

  getProductDetails(productId: number): Observable<any> {
    const url = `${baseUrl}products/${productId}`;
    
    return this.http.get(url).pipe(
      timeout(isPlatformServer(this.platformId) ? 5000 : 30000), // Timeout más corto en servidor
      catchError(error => {
        console.error('Error fetching product details:', error);
        
        // En el servidor, retornar datos básicos para evitar crash
        if (isPlatformServer(this.platformId)) {
          return of({
            product_id: productId,
            name: 'Loading...',
            description: 'Product details loading...',
            regular_price: '0',
            stock_status: 'Loading',
            image_url: '/assets/placeholder.jpg',
            inventory: { available_quantity: 0 }
          });
        }
        
        throw error;
      })
    );
  }

  getProductSuggested(productId: number): Observable<any> {
    const url = `${baseUrl}products/${productId}/suggested`;
    
    return this.http.get(url).pipe(
      timeout(isPlatformServer(this.platformId) ? 3000 : 15000),
      catchError(error => {
        console.error('Error fetching suggested products:', error);
        return of({ data: [] }); // Retornar array vacío en caso de error
      })
    );
  }
}


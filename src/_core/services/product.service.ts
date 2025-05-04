import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { SearchParameters } from '../../models/search-parameters';
import { environment } from '../../../environments/environment';

interface PaginatedResponse {
  items: Product[];
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getPaginatedProducts(params: SearchParameters): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(this.apiUrl, { params: params as any });
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 
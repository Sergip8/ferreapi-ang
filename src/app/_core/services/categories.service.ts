import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../models/categories';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'categories', data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'categories/' + id, data);
  }

  getPaginatedCategories(params: any): Observable<EntityPagination<Category[]>> {
    return this.http.post<EntityPagination<Category[]>>(baseUrl + 'categories/paginated', params);
  }

  getCategoryDetails(id: number): Observable<Category> {
    return this.http.get<Category>(baseUrl + 'categories/' + id);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'categories/' + id);
  }
  GetMainCategories(){
    return this.http.get<Category[]>(baseUrl+ 'categories/main')
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Category } from '../../models/category';

const baseUrl = environment.API_URL

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }


  GetMainCategories(){
    return this.http.get<Category[]>(baseUrl+ 'categories/main')
  }
}


import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Promotion } from '../../models/promotions';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  constructor(private http: HttpClient) { }

  createPromotion(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'promotions', data);
  }

  updatePromotion(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'promotions/' + id, data);
  }

  getPaginatedPromotions(params: any): Observable<EntityPagination<Promotion[]>> {
    return this.http.post<EntityPagination<Promotion[]>>(baseUrl + 'promotions/paginated', params);
  }

  getPromotionDetails(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(baseUrl + 'promotions/' + id);
  }

  deletePromotion(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'promotions/' + id);
  }
}

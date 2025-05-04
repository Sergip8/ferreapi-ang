import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { OrderDetail } from '../../models/order-details';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  constructor(private http: HttpClient) { }

  createOrderDetail(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'order-details', data);
  }

  updateOrderDetail(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'order-details/' + id, data);
  }

  getPaginatedOrderDetails(params: any): Observable<EntityPagination<OrderDetail[]>> {
    return this.http.post<EntityPagination<OrderDetail[]>>(baseUrl + 'order-details/paginated', params);
  }

  getOrderDetail(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(baseUrl + 'order-details/' + id);
  }

  deleteOrderDetail(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'order-details/' + id);
  }
}

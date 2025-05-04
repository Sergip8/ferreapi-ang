import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Order } from '../../models/orders';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) { }

  createOrder(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'orders', data);
  }

  updateOrder(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'orders/' + id, data);
  }

  getPaginatedOrders(params: any): Observable<EntityPagination<Order[]>> {
    return this.http.post<EntityPagination<Order[]>>(baseUrl + 'orders/paginated', params);
  }

  getOrderDetails(id: number): Observable<Order> {
    return this.http.get<Order>(baseUrl + 'orders/' + id);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'orders/' + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ShippingDelivery } from '../../models/shipping-delivery';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ShippingDeliveryService {
  constructor(private http: HttpClient) { }

  createShipping(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'shipping-delivery', data);
  }

  updateShipping(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'shipping-delivery/' + id, data);
  }

  getPaginatedShippings(params: any): Observable<EntityPagination<ShippingDelivery[]>> {
    return this.http.post<EntityPagination<ShippingDelivery[]>>(baseUrl + 'shipping-delivery/paginated', params);
  }

  getShippingDetails(id: number): Observable<ShippingDelivery> {
    return this.http.get<ShippingDelivery>(baseUrl + 'shipping-delivery/' + id);
  }

  deleteShipping(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'shipping-delivery/' + id);
  }
}

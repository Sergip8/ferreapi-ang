import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CustomerReturn } from '../../models/customer-returns';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CustomerReturnsService {
  constructor(private http: HttpClient) { }

  createReturn(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'customer-returns', data);
  }

  updateReturn(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'customer-returns/' + id, data);
  }

  getPaginatedReturns(params: any): Observable<EntityPagination<CustomerReturn[]>> {
    return this.http.post<EntityPagination<CustomerReturn[]>>(baseUrl + 'customer-returns/paginated', params);
  }

  getReturnDetails(id: number): Observable<CustomerReturn> {
    return this.http.get<CustomerReturn>(baseUrl + 'customer-returns/' + id);
  }

  deleteReturn(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'customer-returns/' + id);
  }
}

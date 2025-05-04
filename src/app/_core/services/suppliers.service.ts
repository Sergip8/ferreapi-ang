import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Supplier } from '../../models/suppliers';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  constructor(private http: HttpClient) { }

  createSupplier(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'suppliers', data);
  }

  updateSupplier(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'suppliers/' + id, data);
  }

  getPaginatedSuppliers(params: any): Observable<EntityPagination<Supplier[]>> {
    return this.http.post<EntityPagination<Supplier[]>>(baseUrl + 'suppliers/paginated', params);
  }

  getSupplierDetails(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(baseUrl + 'suppliers/' + id);
  }

  deleteSupplier(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'suppliers/' + id);
  }
}

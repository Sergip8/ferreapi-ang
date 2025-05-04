import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ProductionBatch } from '../../models/production-batches';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ProductionBatchesService {
  constructor(private http: HttpClient) { }

  createProductionBatch(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'production-batches', data);
  }

  updateProductionBatch(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'production-batches/' + id, data);
  }

  getPaginatedProductionBatches(params: any): Observable<EntityPagination<ProductionBatch[]>> {
    return this.http.post<EntityPagination<ProductionBatch[]>>(baseUrl + 'production-batches/paginated', params);
  }

  getProductionBatchDetails(id: number): Observable<ProductionBatch> {
    return this.http.get<ProductionBatch>(baseUrl + 'production-batches/' + id);
  }

  deleteProductionBatch(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'production-batches/' + id);
  }
}

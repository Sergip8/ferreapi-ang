import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { QualityControl } from '../../models/quality-control';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class QualityControlService {
  constructor(private http: HttpClient) { }

  createQualityControl(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'quality-control', data);
  }

  updateQualityControl(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'quality-control/' + id, data);
  }

  getPaginatedQualityControls(params: any): Observable<EntityPagination<QualityControl[]>> {
    return this.http.post<EntityPagination<QualityControl[]>>(baseUrl + 'quality-control/paginated', params);
  }

  getQualityControlDetails(id: number): Observable<QualityControl> {
    return this.http.get<QualityControl>(baseUrl + 'quality-control/' + id);
  }

  deleteQualityControl(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'quality-control/' + id);
  }
}

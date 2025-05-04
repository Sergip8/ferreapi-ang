import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TechnicalSpecs } from '../../models/product';
import { EntityPagination } from '../../models/product';

const baseUrl = environment.API_URL + 'technical-specifications';

@Injectable({
  providedIn: 'root'
})
export class TechnicalSpecificationsService {

  constructor(private http: HttpClient) { }

  getTechnicalSpecificationsPaginated(params: any): Observable<EntityPagination<TechnicalSpecs[]>> {
    return this.http.post<EntityPagination<TechnicalSpecs[]>>(`${baseUrl}/paginated`, params);
  }

  createTechnicalSpecification(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, data);
  }

  updateTechnicalSpecification(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${id}`, data);
  }
  deleteTechnicalSpecification(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }
}

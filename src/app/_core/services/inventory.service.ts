import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Inventory } from '../../models/inventory';
import { EntityPagination } from '../../models/product';


const baseUrl = environment.API_URL+'inventory'
@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  constructor(private http: HttpClient) { }

  getInventories(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}`);
  }

  createInventory(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, data);
  }

  updateInventory(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${id}`, data);
  }
  getInventoryPaginated(params: any): Observable<EntityPagination<Inventory[]>> {
    return this.http.post<EntityPagination<Inventory[]>>(`${baseUrl}/paginated`, params);
  }
  deleteInventory(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }
}

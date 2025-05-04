import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { RawMaterialsInventory } from '../../models/raw-materials-inventory';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class RawMaterialsInventoryService {
  constructor(private http: HttpClient) { }

  createRawMaterial(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'raw-materials-inventory', data);
  }

  updateRawMaterial(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'raw-materials-inventory/' + id, data);
  }

  getPaginatedRawMaterials(params: any): Observable<EntityPagination<RawMaterialsInventory[]>> {
    return this.http.post<EntityPagination<RawMaterialsInventory[]>>(baseUrl + 'raw-materials-inventory/paginated', params);
  }

  getRawMaterialDetails(id: number): Observable<RawMaterialsInventory> {
    return this.http.get<RawMaterialsInventory>(baseUrl + 'raw-materials-inventory/' + id);
  }

  deleteRawMaterial(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'raw-materials-inventory/' + id);
  }
}

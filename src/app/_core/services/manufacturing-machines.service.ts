import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ManufacturingMachine } from '../../models/manufacturing-machines';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ManufacturingMachinesService {
  constructor(private http: HttpClient) { }

  createManufacturingMachine(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'manufacturing-machines', data);
  }

  updateManufacturingMachine(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'manufacturing-machines/' + id, data);
  }

  getPaginatedManufacturingMachines(params: any): Observable<EntityPagination<ManufacturingMachine[]>> {
    return this.http.post<EntityPagination<ManufacturingMachine[]>>(baseUrl + 'manufacturing-machines/paginated', params);
  }

  getManufacturingMachineDetails(id: number): Observable<ManufacturingMachine> {
    return this.http.get<ManufacturingMachine>(baseUrl + 'manufacturing-machines/' + id);
  }

  deleteManufacturingMachine(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'manufacturing-machines/' + id);
  }
}

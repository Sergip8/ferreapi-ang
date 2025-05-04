import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { InvoicePayment } from '../../models/invoice-payments';
import { EntityPagination } from '../../models/product';
import { Observable } from 'rxjs';

const baseUrl = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class InvoicePaymentsService {
  constructor(private http: HttpClient) { }

  createInvoicePayment(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'invoice-payments', data);
  }

  updateInvoicePayment(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl + 'invoice-payments/' + id, data);
  }

  getPaginatedInvoicePayments(params: any): Observable<EntityPagination<InvoicePayment[]>> {
    return this.http.post<EntityPagination<InvoicePayment[]>>(baseUrl + 'invoice-payments/paginated', params);
  }

  getInvoicePaymentDetails(id: number): Observable<InvoicePayment> {
    return this.http.get<InvoicePayment>(baseUrl + 'invoice-payments/' + id);
  }

  deleteInvoicePayment(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl + 'invoice-payments/' + id);
  }
}

import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { InvoicePayment } from '../../../models/invoice-payments';
import { InvoicePaymentsService } from '../../../_core/services/invoice-payments.service';
import { AlertType } from '../../../shared/alert/alert.type';
import { Pagination } from '../../../shared/pagination/pagination-model';
import { CommonService } from '../../../_core/services/common.service';
import { FormComponent } from '../../../shared/form/form.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { LoadingComponent } from '../../../public/components/loading/loading.component';
import { NgIf } from '@angular/common';
import { AdminService } from '../../../_core/services/admin.service';
import { debounceTime, distinctUntilChanged, finalize, startWith } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { invoicePaymentsColumns, invoicePaymentsSchema } from '../../../models/schemas/invoice-payments-schema';

@Component({
  selector: 'app-invoice-payments',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './invoice-payments.component.html',
  styles: []
})
export class InvoicePaymentsComponent {
  title = "Pagos de Facturas";
  currentInvoice: InvoicePayment | null = null;
  formSchema: any;
  formData: any;
  tableData: InvoicePayment[] = [];
  columns = invoicePaymentsColumns;
  readonly alertType = AlertType;
  alert = this.alertType.Info;
  showAlert = false;
  alertMsg = "";
  params: any = {};
  loading = false;
  pagination: Pagination = {
    count: 0,
    page: 1,
    size: 10
  };
  isModalOpen = false;
  modalTitle = '';
  isEdit = false;

  @ViewChildren(FormComponent) form!: QueryList<FormComponent>;

  constructor(
    private invoicePaymentsService: InvoicePaymentsService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getInvoicePayments();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentInvoice?.invoice_id) {
        this.updateInvoicePayment(this.currentInvoice.invoice_id, formData);
      }
    } else {
      this.createInvoicePayment(formData);
    }
  }

  createInvoicePayment(data: any) {
    this.invoicePaymentsService.createInvoicePayment(data).pipe(
      finalize(() => {
        this.commonService.updateAlert({
          message: this.alertMsg,
          alertType: this.alert,
          show: true
        });
      })
    ).subscribe({
      next: () => {
        this.alert = AlertType.Success;
        this.alertMsg = "Pago de factura creado correctamente";
        this.isModalOpen = false;
        this.getInvoicePayments();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el pago de factura";
      }
    });
  }

  updateInvoicePayment(id: number, data: any) {
    this.invoicePaymentsService.updateInvoicePayment(id, data).pipe(
      finalize(() => {
        this.commonService.updateAlert({
          message: this.alertMsg,
          alertType: this.alert,
          show: true
        });
      })
    ).subscribe({
      next: () => {
        this.alert = AlertType.Success;
        this.alertMsg = "Pago de factura actualizado correctamente";
        this.isModalOpen = false;
        this.getInvoicePayments();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el pago de factura";
      }
    });
  }

  getInvoicePayments() {
    this.loading = true;
    this.invoicePaymentsService.getPaginatedInvoicePayments(this.params).subscribe({
      next: data => {
        this.tableData = data.data;
        this.pagination.count = data.total;
        this.commonService.updatePagination({
          count: data.total,
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onFormCancel(isChange: boolean): void {
    if (isChange) {
      const confirmCancel = window.confirm('Hay cambios sin guardar. ¿Seguro que quieres salir?');
      if (confirmCancel) {
        this.isModalOpen = false;
      }
    } else {
      this.isModalOpen = false;
    }
  }

  closeModal() {
    this.form.forEach((f) => {
      f.onCancel();
    });
  }

  openModal(): void {
    this.isModalOpen = true;
    this.formSchema = invoicePaymentsSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(invoice: InvoicePayment): void {
    this.invoicePaymentsService.getInvoicePaymentDetails(invoice.invoice_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = invoicePaymentsSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentInvoice = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getInvoicePayments();
  }

  onDelete(invoice: InvoicePayment) {
    if (confirm('¿Estás seguro de que deseas eliminar este pago de factura?')) {
      this.invoicePaymentsService.deleteInvoicePayment(invoice.invoice_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Pago de factura eliminado correctamente";
          this.getInvoicePayments();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el pago de factura";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getInvoicePayments();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

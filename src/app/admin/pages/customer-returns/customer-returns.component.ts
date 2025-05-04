import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { CustomerReturn } from '../../../models/customer-returns';
import { CustomerReturnsService } from '../../../_core/services/customer-returns.service';
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
import { customerReturnsColumns, customerReturnsSchema } from '../../../models/schemas/customer-returns-schema';

@Component({
  selector: 'app-customer-returns',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './customer-returns.component.html',
  styles: []
})
export class CustomerReturnsComponent {
  title = "Devoluciones de Clientes";
  currentReturn: CustomerReturn | null = null;
  formSchema: any;
  formData: any;
  tableData: CustomerReturn[] = [];
  columns = customerReturnsColumns;
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
    private customerReturnsService: CustomerReturnsService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getReturns();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentReturn?.return_id) {
        this.updateReturn(this.currentReturn.return_id, formData);
      }
    } else {
      this.createReturn(formData);
    }
  }

  createReturn(data: any) {
    this.customerReturnsService.createReturn(data).pipe(
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
        this.alertMsg = "Devolución creada correctamente";
        this.isModalOpen = false;
        this.getReturns();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear la devolución";
      }
    });
  }

  updateReturn(id: number, data: any) {
    this.customerReturnsService.updateReturn(id, data).pipe(
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
        this.alertMsg = "Devolución actualizada correctamente";
        this.isModalOpen = false;
        this.getReturns();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar la devolución";
      }
    });
  }

  getReturns() {
    this.loading = true;
    this.customerReturnsService.getPaginatedReturns(this.params).subscribe({
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
    this.formSchema = customerReturnsSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(returnItem: CustomerReturn): void {
    this.customerReturnsService.getReturnDetails(returnItem.return_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = customerReturnsSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentReturn = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getReturns();
  }

  onDelete(returnItem: CustomerReturn) {
    if (confirm('¿Estás seguro de que deseas eliminar esta devolución?')) {
      this.customerReturnsService.deleteReturn(returnItem.return_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Devolución eliminada correctamente";
          this.getReturns();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar la devolución";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getReturns();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

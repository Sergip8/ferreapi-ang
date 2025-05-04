import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { OrderDetail } from '../../../models/order-details';
import { OrderDetailsService } from '../../../_core/services/order-details.service';
import { AlertType } from '../../../shared/alert/alert.type';
import { Pagination } from '../../../shared/pagination/pagination-model';
import { CommonService } from '../../../_core/services/common.service';
import { FormComponent } from '../../../shared/form/form.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { LoadingComponent } from '../../../public/components/loading/loading.component';
import { NgIf } from '@angular/common';
import { AdminService } from '../../../_core/services/admin.service';
import { finalize } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { orderDetailsColumns, orderDetailsSchema } from '../../../models/schemas/order-details-schema';

@Component({
  selector: 'app-order-details',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  title = "Detalles de Orden";
  currentOrderDetail: OrderDetail | null = null;
  formSchema: any;
  formData: any;
  tableData: OrderDetail[] = [];
  columns = orderDetailsColumns;
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
    private orderDetailsService: OrderDetailsService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentOrderDetail?.order_detail_id) {
        this.updateOrderDetail(this.currentOrderDetail.order_detail_id, formData);
      }
    } else {
      this.createOrderDetail(formData);
    }
  }

  createOrderDetail(data: any) {
    this.orderDetailsService.createOrderDetail(data).pipe(
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
        this.alertMsg = "Detalle de orden creado correctamente";
        this.isModalOpen = false;
        this.getOrderDetails();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el detalle de orden";
      }
    });
  }

  updateOrderDetail(id: number, data: any) {
    this.orderDetailsService.updateOrderDetail(id, data).pipe(
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
        this.alertMsg = "Detalle de orden actualizado correctamente";
        this.isModalOpen = false;
        this.getOrderDetails();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el detalle de orden";
      }
    });
  }

  getOrderDetails() {
    this.loading = true;
    this.orderDetailsService.getPaginatedOrderDetails(this.params).subscribe({
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
    this.formSchema = orderDetailsSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(orderDetail: OrderDetail): void {
    this.orderDetailsService.getOrderDetail(orderDetail.order_detail_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = orderDetailsSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentOrderDetail = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getOrderDetails();
  }

  onDelete(orderDetail: OrderDetail) {
    if (confirm('¿Estás seguro de que deseas eliminar este detalle de orden?')) {
      this.orderDetailsService.deleteOrderDetail(orderDetail.order_detail_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Detalle de orden eliminado correctamente";
          this.getOrderDetails();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el detalle de orden";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getOrderDetails();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

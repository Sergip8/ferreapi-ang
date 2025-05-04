import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { Order } from '../../../models/orders';
import { OrdersService } from '../../../_core/services/orders.service';
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
import { ordersColumns, ordersSchema } from '../../../models/schemas/orders-schema';

@Component({
  selector: 'app-orders',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent {
  title = "Órdenes";
  currentOrder: Order | null = null;
  formSchema: any;
  formData: any;
  tableData: Order[] = [];
  columns = ordersColumns;
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
    private ordersService: OrdersService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentOrder?.order_id) {
        this.updateOrder(this.currentOrder.order_id, formData);
      }
    } else {
      this.createOrder(formData);
    }
  }

  createOrder(data: any) {
    this.ordersService.createOrder(data).pipe(
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
        this.alertMsg = "Orden creada correctamente";
        this.isModalOpen = false;
        this.getOrders();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear la orden";
      }
    });
  }

  updateOrder(id: number, data: any) {
    this.ordersService.updateOrder(id, data).pipe(
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
        this.alertMsg = "Orden actualizada correctamente";
        this.isModalOpen = false;
        this.getOrders();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar la orden";
      }
    });
  }

  getOrders() {
    this.loading = true;
    this.ordersService.getPaginatedOrders(this.params).subscribe({
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
    this.formSchema = ordersSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(order: Order): void {
    this.ordersService.getOrderDetails(order.order_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = ordersSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentOrder = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getOrders();
  }

  onDelete(order: Order) {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      this.ordersService.deleteOrder(order.order_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Orden eliminada correctamente";
          this.getOrders();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar la orden";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getOrders();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

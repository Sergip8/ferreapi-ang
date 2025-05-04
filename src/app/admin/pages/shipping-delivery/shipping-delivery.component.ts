import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { ShippingDelivery } from '../../../models/shipping-delivery';
import { ShippingDeliveryService } from '../../../_core/services/shipping-delivery.service';
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
import { shippingDeliveryColumns, shippingDeliverySchema } from '../../../models/schemas/shipping-delivery-schema';

@Component({
  selector: 'app-shipping-delivery',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './shipping-delivery.component.html',
  styles: []
})
export class ShippingDeliveryComponent {
  title = "Envíos y Entregas";
  currentShipping: ShippingDelivery | null = null;
  formSchema: any;
  formData: any;
  tableData: ShippingDelivery[] = [];
  columns = shippingDeliveryColumns;
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
    private shippingDeliveryService: ShippingDeliveryService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getShippings();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentShipping?.shipping_id) {
        this.updateShipping(this.currentShipping.shipping_id, formData);
      }
    } else {
      this.createShipping(formData);
    }
  }

  createShipping(data: any) {
    this.shippingDeliveryService.createShipping(data).pipe(
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
        this.alertMsg = "Envío creado correctamente";
        this.isModalOpen = false;
        this.getShippings();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el envío";
      }
    });
  }

  updateShipping(id: number, data: any) {
    this.shippingDeliveryService.updateShipping(id, data).pipe(
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
        this.alertMsg = "Envío actualizado correctamente";
        this.isModalOpen = false;
        this.getShippings();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el envío";
      }
    });
  }

  getShippings() {
    this.loading = true;
    this.shippingDeliveryService.getPaginatedShippings(this.params).subscribe({
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
    this.formSchema = shippingDeliverySchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(shipping: ShippingDelivery): void {
    this.shippingDeliveryService.getShippingDetails(shipping.shipping_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = shippingDeliverySchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentShipping = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getShippings();
  }

  onDelete(shipping: ShippingDelivery) {
    if (confirm('¿Estás seguro de que deseas eliminar este envío?')) {
      this.shippingDeliveryService.deleteShipping(shipping.shipping_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Envío eliminado correctamente";
          this.getShippings();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el envío";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getShippings();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

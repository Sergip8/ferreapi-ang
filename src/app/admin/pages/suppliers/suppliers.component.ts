import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { Supplier } from '../../../models/suppliers';
import { SuppliersService } from '../../../_core/services/suppliers.service';
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
import { suppliersColumns, suppliersSchema } from '../../../models/schemas/suppliers-schema';

@Component({
  selector: 'app-suppliers',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  title = "Proveedores";
  currentSupplier: Supplier | null = null;
  formSchema: any;
  formData: any;
  tableData: Supplier[] = [];
  columns = suppliersColumns;
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
    private suppliersService: SuppliersService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentSupplier?.supplier_id) {
        this.updateSupplier(this.currentSupplier.supplier_id, formData);
      }
    } else {
      this.createSupplier(formData);
    }
  }

  createSupplier(data: any) {
    this.suppliersService.createSupplier(data).pipe(
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
        this.alertMsg = "Proveedor creado correctamente";
        this.isModalOpen = false;
        this.getSuppliers();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el proveedor";
      }
    });
  }

  updateSupplier(id: number, data: any) {
    this.suppliersService.updateSupplier(id, data).pipe(
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
        this.alertMsg = "Proveedor actualizado correctamente";
        this.isModalOpen = false;
        this.getSuppliers();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el proveedor";
      }
    });
  }

  getSuppliers() {
    this.loading = true;
    this.suppliersService.getPaginatedSuppliers(this.params).subscribe({
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
    this.formSchema = suppliersSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(supplier: Supplier): void {
    this.suppliersService.getSupplierDetails(supplier.supplier_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = suppliersSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentSupplier = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getSuppliers();
  }

  onDelete(supplier: Supplier) {
    if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      this.suppliersService.deleteSupplier(supplier.supplier_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Proveedor eliminado correctamente";
          this.getSuppliers();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el proveedor";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getSuppliers();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

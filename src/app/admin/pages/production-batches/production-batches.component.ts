import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { ProductionBatch } from '../../../models/production-batches';
import { ProductionBatchesService } from '../../../_core/services/production-batches.service';
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
import { productionBatchesColumns, productionBatchesSchema } from '../../../models/schemas/production-batches-schema';

@Component({
  selector: 'app-production-batches',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './production-batches.component.html',
  styles: []
})
export class ProductionBatchesComponent {
  title = "Lotes de Producción";
  currentBatch: ProductionBatch | null = null;
  formSchema: any;
  formData: any;
  tableData: ProductionBatch[] = [];
  columns = productionBatchesColumns;
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
    private productionBatchesService: ProductionBatchesService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getBatches();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentBatch?.batch_id) {
        this.updateBatch(this.currentBatch.batch_id, formData);
      }
    } else {
      this.createBatch(formData);
    }
  }

  createBatch(data: any) {
    this.productionBatchesService.createProductionBatch(data).pipe(
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
        this.alertMsg = "Lote de producción creado correctamente";
        this.isModalOpen = false;
        this.getBatches();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el lote de producción";
      }
    });
  }

  updateBatch(id: number, data: any) {
    this.productionBatchesService.updateProductionBatch(id, data).pipe(
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
        this.alertMsg = "Lote de producción actualizado correctamente";
        this.isModalOpen = false;
        this.getBatches();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el lote de producción";
      }
    });
  }

  getBatches() {
    this.loading = true;
    this.productionBatchesService.getPaginatedProductionBatches(this.params).subscribe({
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
    this.formSchema = productionBatchesSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(batch: ProductionBatch): void {
    this.productionBatchesService.getProductionBatchDetails(batch.batch_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = productionBatchesSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentBatch = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getBatches();
  }

  onDelete(batch: ProductionBatch) {
    if (confirm('¿Estás seguro de que deseas eliminar este lote de producción?')) {
      this.productionBatchesService.deleteProductionBatch(batch.batch_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Lote de producción eliminado correctamente";
          this.getBatches();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el lote de producción";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getBatches();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

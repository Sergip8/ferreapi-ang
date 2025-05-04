import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { QualityControl } from '../../../models/quality-control';
import { QualityControlService } from '../../../_core/services/quality-control.service';
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
import { qualityControlColumns, qualityControlSchema } from '../../../models/schemas/quality-control-schema';

@Component({
  selector: 'app-quality-control',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './quality-control.component.html',
  styles: []
})
export class QualityControlComponent {
  title = "Control de Calidad";
  currentQuality: QualityControl | null = null;
  formSchema: any;
  formData: any;
  tableData: QualityControl[] = [];
  columns = qualityControlColumns;
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
    private qualityControlService: QualityControlService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getQualityControls();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentQuality?.quality_check_id) {
        this.updateQualityControl(this.currentQuality.quality_check_id, formData);
      }
    } else {
      this.createQualityControl(formData);
    }
  }

  createQualityControl(data: any) {
    this.qualityControlService.createQualityControl(data).pipe(
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
        this.alertMsg = "Control de calidad creado correctamente";
        this.isModalOpen = false;
        this.getQualityControls();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el control de calidad";
      }
    });
  }

  updateQualityControl(id: number, data: any) {
    this.qualityControlService.updateQualityControl(id, data).pipe(
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
        this.alertMsg = "Control de calidad actualizado correctamente";
        this.isModalOpen = false;
        this.getQualityControls();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el control de calidad";
      }
    });
  }

  getQualityControls() {
    this.loading = true;
    this.qualityControlService.getPaginatedQualityControls(this.params).subscribe({
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
    this.formSchema = qualityControlSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(quality: QualityControl): void {
    this.qualityControlService.getQualityControlDetails(quality.quality_check_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = qualityControlSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentQuality = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getQualityControls();
  }

  onDelete(quality: QualityControl) {
    if (confirm('¿Estás seguro de que deseas eliminar este control de calidad?')) {
      this.qualityControlService.deleteQualityControl(quality.quality_check_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Control de calidad eliminado correctamente";
          this.getQualityControls();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el control de calidad";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getQualityControls();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { Promotion } from '../../../models/promotions';
import { PromotionsService } from '../../../_core/services/promotions.service';
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
import { promotionsColumns, promotionsSchema } from '../../../models/schemas/promotions-schema';

@Component({
  selector: 'app-promotions',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent {
  title = "Promociones";
  currentPromotion: Promotion | null = null;
  formSchema: any;
  formData: any;
  tableData: Promotion[] = [];
  columns = promotionsColumns;
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
    private promotionsService: PromotionsService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentPromotion?.promotion_id) {
        this.updatePromotion(this.currentPromotion.promotion_id, formData);
      }
    } else {
      this.createPromotion(formData);
    }
  }

  createPromotion(data: any) {
    this.promotionsService.createPromotion(data).pipe(
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
        this.alertMsg = "Promoción creada correctamente";
        this.isModalOpen = false;
        this.getPromotions();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear la promoción";
      }
    });
  }

  updatePromotion(id: number, data: any) {
    this.promotionsService.updatePromotion(id, data).pipe(
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
        this.alertMsg = "Promoción actualizada correctamente";
        this.isModalOpen = false;
        this.getPromotions();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar la promoción";
      }
    });
  }

  getPromotions() {
    this.loading = true;
    this.promotionsService.getPaginatedPromotions(this.params).subscribe({
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
    this.formSchema = promotionsSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(promotion: Promotion): void {
    this.promotionsService.getPromotionDetails(promotion.promotion_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = promotionsSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentPromotion = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getPromotions();
  }

  onDelete(promotion: Promotion) {
    if (confirm('¿Estás seguro de que deseas eliminar esta promoción?')) {
      this.promotionsService.deletePromotion(promotion.promotion_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Promoción eliminada correctamente";
          this.getPromotions();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar la promoción";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getPromotions();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

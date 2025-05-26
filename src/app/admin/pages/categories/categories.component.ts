import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { Category } from '../../../models/category';
import { CategoriesService } from '../../../_core/services/categories.service';
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
import { categoriesColumns, categoriesSchema } from '../../../models/schemas/categories-schema';

@Component({
  selector: 'app-categories',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  title = "Categorías";
  currentCategory: Category | null = null;
  formSchema: any;
  formData: any;
  tableData: Category[] = [];
  columns = categoriesColumns;
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
    private categoriesService: CategoriesService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentCategory?.category_id) {
        this.updateCategory(this.currentCategory.category_id, formData);
      }
    } else {
      this.createCategory(formData);
    }
  }

  createCategory(data: any) {
    this.categoriesService.createCategory(data).pipe(
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
        this.alertMsg = "Categoría creada correctamente";
        this.isModalOpen = false;
        this.getCategories();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear la categoría";
      }
    });
  }

  updateCategory(id: number, data: any) {
    this.categoriesService.updateCategory(id, data).pipe(
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
        this.alertMsg = "Categoría actualizada correctamente";
        this.isModalOpen = false;
        this.getCategories();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar la categoría";
      }
    });
  }

  getCategories() {
    this.loading = true;
    this.categoriesService.getPaginatedCategories(this.params).subscribe({
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
    this.formSchema = categoriesSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(category: Category): void {
    this.categoriesService.getCategoryDetails(category.category_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = categoriesSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentCategory = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getCategories();
  }

  onDelete(category: Category) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoriesService.deleteCategory(category.category_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Categoría eliminada correctamente";
          this.getCategories();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar la categoría";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getCategories();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

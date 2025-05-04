import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FormComponent } from '../../../shared/form/form.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { LoadingComponent } from '../../../public/components/loading/loading.component';
import { NgIf } from '@angular/common';
import { technicalSpecsFields } from '../../../models/schemas/product-schema';
import { TechnicalSpecificationsService } from '../../../_core/services/technical-specifications.service';
import { Pagination } from '../../../shared/pagination/pagination-model';
import { FilterComponent } from '../../../shared/filter/filter.component';

@Component({
  selector: 'app-technical-specifications',
  standalone: true,
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent],
  templateUrl: './technical-specifications.component.html',
  styleUrl: './technical-specifications.component.css'
})
export class TechnicalSpecificationsComponent {
  title = 'Especificaciones Técnicas';
  formSchema = technicalSpecsFields;
  formData: any = {};
  tableData: any[] = [];
  isModalOpen = false;
  modalTitle = '';
  isEdit = false;
  pagination: Pagination = { count: 0, page: 1, size: 10 };
  columns = this.formSchema.map(f => ({ header: f.label, field: f.key, sortable: true }));
  params: any = { page: 1, size: 10 };

  @ViewChildren(FormComponent) form!: QueryList<FormComponent>;

  constructor(private technicalSpecsService: TechnicalSpecificationsService) {
    this.loadTechnicalSpecifications();
  }

  loadTechnicalSpecifications() {
    this.technicalSpecsService.getTechnicalSpecificationsPaginated(this.params).subscribe(data => {
      this.tableData = data.data;
      this.pagination.count = data.total;
    });
  }

  onCreate(): void {
    this.isEdit = false;
    this.formData = {};
    this.formSchema = technicalSpecsFields;
    this.modalTitle = 'Crear Especificación Técnica';
    this.isModalOpen = true;
  }

  onEdit(row: any): void {
    this.isEdit = true;
    this.formData = { ...row };
    this.modalTitle = 'Editar Especificación Técnica';
    this.isModalOpen = true;
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      this.technicalSpecsService.updateTechnicalSpecification(formData.id, formData).subscribe(() => {
        this.loadTechnicalSpecifications();
      });
    } else {
      this.technicalSpecsService.createTechnicalSpecification(formData).subscribe(() => {
        this.loadTechnicalSpecifications();
      });
    }
    this.isModalOpen = false;
  }

  onFormCancel(): void {
    this.isModalOpen = false;
  }

  closeModal() {
    this.form.forEach((f) => f.onCancel());
  }

  onPageChange(page: number) {
    this.pagination.page = page;
    this.loadTechnicalSpecifications();
  }

  onDelete(row: any): void {
    this.technicalSpecsService.deleteTechnicalSpecification(row.id).subscribe(() => {
      this.loadTechnicalSpecifications();
    });
  }

  onFilterChange(filterValues: any): void {
    this.params = { ...this.params, ...filterValues, page: 1 };
    this.loadTechnicalSpecifications();
  }
}

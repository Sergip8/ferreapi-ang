import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { RawMaterialsInventory } from '../../../models/raw-materials-inventory';
import { RawMaterialsInventoryService } from '../../../_core/services/raw-materials-inventory.service';
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
import { rawMaterialsInventoryColumns, rawMaterialsInventorySchema } from '../../../models/schemas/raw-materials-inventory-schema';

@Component({
  selector: 'app-raw-materials-inventory',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './raw-materials-inventory.component.html',
  styleUrl: './raw-materials-inventory.component.css'
})
export class RawMaterialsInventoryComponent {
  title = "Inventario de Materias Primas";
  currentMaterial: RawMaterialsInventory | null = null;
  formSchema: any;
  formData: any;
  tableData: RawMaterialsInventory[] = [];
  columns = rawMaterialsInventoryColumns;
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
    private rawMaterialsInventoryService: RawMaterialsInventoryService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getMaterials();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentMaterial?.material_id) {
        this.updateMaterial(this.currentMaterial.material_id, formData);
      }
    } else {
      this.createMaterial(formData);
    }
  }

  createMaterial(data: any) {
    this.rawMaterialsInventoryService.createRawMaterial(data).pipe(
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
        this.alertMsg = "Material creado correctamente";
        this.isModalOpen = false;
        this.getMaterials();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el material";
      }
    });
  }

  updateMaterial(id: number, data: any) {
    this.rawMaterialsInventoryService.updateRawMaterial(id, data).pipe(
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
        this.alertMsg = "Material actualizado correctamente";
        this.isModalOpen = false;
        this.getMaterials();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el material";
      }
    });
  }

  getMaterials() {
    this.loading = true;
    this.rawMaterialsInventoryService.getPaginatedRawMaterials(this.params).subscribe({
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
    this.formSchema = rawMaterialsInventorySchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(material: RawMaterialsInventory): void {
    this.rawMaterialsInventoryService.getRawMaterialDetails(material.material_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = rawMaterialsInventorySchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentMaterial = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getMaterials();
  }

  onDelete(material: RawMaterialsInventory) {
    if (confirm('¿Estás seguro de que deseas eliminar este material?')) {
      this.rawMaterialsInventoryService.deleteRawMaterial(material.material_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Material eliminado correctamente";
          this.getMaterials();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el material";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getMaterials();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

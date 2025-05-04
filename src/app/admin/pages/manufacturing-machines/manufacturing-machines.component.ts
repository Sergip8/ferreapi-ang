import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { ManufacturingMachine } from '../../../models/manufacturing-machines';
import { ManufacturingMachinesService } from '../../../_core/services/manufacturing-machines.service';
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
import { manufacturingMachinesColumns, manufacturingMachinesSchema } from '../../../models/schemas/manufacturing-machines-schema';

@Component({
  selector: 'app-manufacturing-machines',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './manufacturing-machines.component.html',
  styles: []
})
export class ManufacturingMachinesComponent {
  title = "Máquinas de Manufactura";
  currentMachine: ManufacturingMachine | null = null;
  formSchema: any;
  formData: any;
  tableData: ManufacturingMachine[] = [];
  columns = manufacturingMachinesColumns;
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
    private manufacturingMachinesService: ManufacturingMachinesService,
    private commonService: CommonService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getMachines();
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      if (this.currentMachine?.machine_id) {
        this.updateMachine(this.currentMachine.machine_id, formData);
      }
    } else {
      this.createMachine(formData);
    }
  }

  createMachine(data: any) {
    this.manufacturingMachinesService.createManufacturingMachine(data).pipe(
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
        this.alertMsg = "Máquina creada correctamente";
        this.isModalOpen = false;
        this.getMachines();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear la máquina";
      }
    });
  }

  updateMachine(id: number, data: any) {
    this.manufacturingMachinesService.updateManufacturingMachine(id, data).pipe(
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
        this.alertMsg = "Máquina actualizada correctamente";
        this.isModalOpen = false;
        this.getMachines();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar la máquina";
      }
    });
  }

  getMachines() {
    this.loading = true;
    this.manufacturingMachinesService.getPaginatedManufacturingMachines(this.params).subscribe({
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
    this.formSchema = manufacturingMachinesSchema;
    this.formData = null;
    this.isEdit = false;
  }

  onRowClick(machine: ManufacturingMachine): void {
    this.manufacturingMachinesService.getManufacturingMachineDetails(machine.machine_id).subscribe({
      next: (data) => {
        this.formData = data;
        this.formSchema = manufacturingMachinesSchema;
        this.isEdit = true;
        this.isModalOpen = true;
        this.currentMachine = data;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getMachines();
  }

  onDelete(machine: ManufacturingMachine) {
    if (confirm('¿Estás seguro de que deseas eliminar esta máquina?')) {
      this.manufacturingMachinesService.deleteManufacturingMachine(machine.machine_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Máquina eliminada correctamente";
          this.getMachines();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar la máquina";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.params.skip = (page - 1) * this.pagination.size;
    this.getMachines();
  }

  onFilterChange(filterValues: any): void {
    // Implementar lógica de filtrado si es necesario
  }
}

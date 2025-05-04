import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FormComponent } from '../../../shared/form/form.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { LoadingComponent } from '../../../public/components/loading/loading.component';
import { NgIf } from '@angular/common';
import { inventoryColumns, inventoryFormFields } from '../../../models/schemas/product-schema';
import { InventoryService } from '../../../_core/services/inventory.service';
import { Pagination, SearchParameters } from '../../../models/user';
import { Inventory } from '../../../models/inventory';
import { CommonService } from '../../../_core/services/common.service';
import { AdminService } from '../../../_core/services/admin.service';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FilterComponent } from '../../../shared/filter/filter.component';

@Component({
  selector: 'app-inventarios',
  standalone: true,
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent],
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})
export class InventariosComponent implements OnInit {
  title = 'Inventarios';
  formSchema = inventoryFormFields;
  formData: any = {};
  tableData: Inventory[] = [];
  isModalOpen = false;
  modalTitle = '';
  isEdit = false;
  params: any = { page: 1, size: 10 };
  inventoryColumns = inventoryColumns

  pagination: Pagination = {
    count: 0,
    page: 1,
    size: 10
  }
  sortFields = [
    { label: "Created Date", value: "registration_date" }
  ]

  @ViewChildren(FormComponent) form!: QueryList<FormComponent>;

  constructor(private inventoryService: InventoryService, private commonService: CommonService, private adminService: AdminService) {
  
  }

  ngOnInit(): void {
    this.adminService.filterRegisterState$.pipe(
      startWith(new SearchParameters()),
      debounceTime(200),
      distinctUntilChanged()
    )
      .subscribe(data => {
        this.params = data
        this.getInventories()
      });
  }

  loadInventories() {
    this.inventoryService.getInventoryPaginated(this.params).subscribe(data => {
      this.tableData = data.data;
      this.pagination.count = data.total;
    });
  }
  getInventories() {
    this.inventoryService.getInventoryPaginated(this.params).subscribe(data => {
      console.log(data);
      this.tableData = data.data;
      this.pagination.count = data.total;
      this.commonService.updatePagination(this.pagination);
    });
  }

  onCreateInventory(): void {
    this.isEdit = false;
    this.formData = {};
    this.formSchema = inventoryFormFields;
    this.modalTitle = 'Crear Inventario';
    this.isModalOpen = true;
  }

  onEdit(row: any): void {
    this.isEdit = true;
    this.formData = { ...row };
    this.modalTitle = 'Editar Inventario';
    this.isModalOpen = true;
  }

  onFormSubmit(formData: any): void {
    if (this.isEdit) {
      this.inventoryService.updateInventory(formData.id, formData).subscribe(() => {
        this.loadInventories();
      });
    } else {
      this.inventoryService.createInventory(formData).subscribe(() => {
        this.loadInventories();
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
    console.log(page)
    this.adminService.updateFilter({
      page: page,
      size: this.params.size
    })
  }
  onDelete(row: any): void {
    this.inventoryService.deleteInventory(row.id).subscribe(() => {
      this.loadInventories();
    });
  }

  onFilterChange(filterValues: any): void {
    this.params = { ...this.params, ...filterValues, page: 1 };
    this.loadInventories();
  }

  onRowClick(row: any): void {
    this.formData = row;
    this.formSchema = inventoryFormFields;
    this.isModalOpen = true;
  }
}

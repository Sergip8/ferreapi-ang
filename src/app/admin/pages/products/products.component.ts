import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';

import { Product, ProductCard, ProductFilter } from '../../../models/product';
import { ProductService } from '../../../_core/services/product.service';
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
import { inventoryFormFields, productColumns, productSchema,} from '../../../models/schemas/product-schema';
import { SearchParameters } from '../../../models/user';

@Component({
  selector: 'app-products',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent {
  title = "Productos"
  current_product: Product | null = null
  formSchema: any
  formData: any
  tableData: ProductCard[] = []
  productColumns = productColumns
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  params = new ProductFilter()
  loading = false;
  pagination: Pagination = {
    count: 0,
    page: 1,
    size: 10
  }
  isModalOpen = false;
  modalTitle = '';
  isProductEdit = false


  sortFields = [
    { label: "Name", value: "name" },
    { label: "Price", value: "price" },
    { label: "Stock", value: "stock" },
    { label: "Created Date", value: "created_at" }
  ]

  @ViewChildren(FormComponent) form!: QueryList<FormComponent>;

  constructor(
    private productService: ProductService, 
    private commonService: CommonService, 
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.productService.currentFilter$.pipe(
      startWith(new ProductFilter()),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(data => {
      this.params = data;
      this.getProducts();
    });
  }

  onFormSubmit(formData: any): void {
    const processedData = {
      ...formData,
      attributes: Object.entries(formData.attributes || {}).reduce((acc: { [key: string]: any }, [key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {})
    };

    if (this.isProductEdit) {
      if (this.current_product?.product_id) {
        this.updateProduct(this.current_product.product_id, processedData);
      }
    } else {
      this.createProduct(processedData);
    }
  }

  createProduct(data: any) {
    this.productService.createProduct(data).pipe(
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
        this.alertMsg = "Producto creado correctamente";
        this.isModalOpen = false;
        this.getProducts();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al crear el producto";
      }
    });
  }

  updateProduct(id: number, data: any) {
    this.productService.updateProduct(id, data).pipe(
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
        this.alertMsg = "Producto actualizado correctamente";
        this.isModalOpen = false;
        this.getProducts();
      },
      error: (e) => {
        console.log(e);
        this.alert = AlertType.Danger;
        this.alertMsg = "Error al actualizar el producto";
      }
    });
  }

  getProducts() {
    this.loading = true;
    this.productService.getPaginatedProducts(this.params).subscribe({
      next: data => {
        console.log(data);
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
    this.formSchema = productSchema;
    this.formData = null;
    this.isProductEdit = false;
  }

  getAttributesSchema(categoryId: number) {
    const baseSchema = {
      sectionTitle: 'Atributos del Producto',
      attributes: {
        type: 'object',
        properties: {}
      }
    };

    // Aquí deberíamos obtener el tipo de producto basado en la categoría
    switch (categoryId) {
      case 1: // Tuberías PVC
        return {
          ...baseSchema,
          properties: {
            color: {
              label: 'Color',
              type: 'text',
              required: false
            },
            tipo_uso: {
              label: 'Tipo de Uso',
              type: 'select',
              options: ['presión', 'drenaje', 'eléctrico'],
              required: true
            },
            certificado: {
              label: 'Certificado',
              type: 'checkbox',
              required: false
            },
            resistencia_uv: {
              label: 'Resistencia UV',
              type: 'checkbox',
              required: false
            },
            resistencia_quimica: {
              label: 'Resistencia Química',
              type: 'checkbox',
              required: false
            }
          }
        };
      case 2: // Pegamentos
        return {
          ...baseSchema,
          properties: {
            base: {
              label: 'Base',
              type: 'select',
              options: ['solvente', 'agua'],
              required: true
            },
            contenido: {
              label: 'Contenido',
              type: 'text',
              required: true
            },
            tiempo_secado_min: {
              label: 'Tiempo de Secado (min)',
              type: 'number',
              required: true
            }
          }
        };
      default:
        return baseSchema;
    }
  }

  onProductClick(product: Product): void {
    this.formData = null
    this.productService.getProductDetails(product.product_id).subscribe({
      next: (data) => {
        this.formData = data;
        console.log(this.formData);
        const attributesSchema = this.getAttributesSchema(data.category_id);
        this.formSchema = productSchema
        this.isProductEdit = true;
        this.isModalOpen = true;
      }
    });
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    this.params.sort_by = event.field;
    this.params.sort_order = event.direction;
    this.getProducts();
  }

  onDelete(product: Product) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(product.product_id).subscribe({
        next: () => {
          this.alert = AlertType.Success;
          this.alertMsg = "Producto eliminado correctamente";
          this.getProducts();
        },
        error: () => {
          this.alert = AlertType.Danger;
          this.alertMsg = "Error al eliminar el producto";
        }
      });
    }
  }

  onPageChange(page: number) {
    this.commonService.updatePagination({ page: page });
    this.productService.updateFilter({ skip: (page - 1) * (this.params.limit + 1) });
  }

  onFilterChange(filterValues: any): void {
   
  }
} 
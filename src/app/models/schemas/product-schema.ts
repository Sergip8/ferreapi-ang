import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";
import { brands, categories } from "./category-attributes";

export const productColumns: TableColumn[] = [
    { header: 'Nombre', field: 'name', sortable: true, width: 'w-2/12' },
    { header: 'Descripción', field: 'description', sortable: true, width: 'w-3/12' },
    { header: 'Precio', field: 'sale_price', sortable: true, width: 'w-1/12' },
    { header: 'Marca', field: 'brand_name', sortable: true, width: 'w-1/12' },
    { header: 'Categoria', field: 'parent_category_name', sortable: true, width: 'w-1/12' },
    { header: 'Subcategoria', field: 'category_name', sortable: true, width: 'w-2/12' },
    { header: 'Estado', field: 'status', sortable: true, width: 'w-1/12' },
    { header: 'Action', field: 'action', type: "action", sortable: false, width: 'w-2/12' }
];

export const inventoryColumns: TableColumn[] = [
  { header: 'Producto ID', field: 'product_id', sortable: true, width: 'w-2/12' },
  { header: 'Cantidad Disponible', field: 'available_quantity', sortable: true, width: 'w-1/12' },
  { header: 'Cantidad Reservada', field: 'reserved_quantity', sortable: true, width: 'w-1/12' },
  { header: 'Ubicación en Almacén', field: 'warehouse_location', sortable: true, width: 'w-2/12' },
  
];

export const productSchema: FormField[] = [
  {
    key: 'product_code',
    label: 'Código',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'El código es requerido' }
    ]
  },
  {
    key: 'name',
    label: 'Nombre',
    type: 'text', 
    required: true,
    validations: [
      { type: 'required', message: 'El nombre es requerido' }
    ]
  },
  {
    key: 'description',
    label: 'Descripción',
    type: 'textarea',
    required: true,
    validations: [
      { type: 'required', message: 'La descripción es requerida' }
    ]
  },
  {
    key: 'regular_price',
    label: 'Precio Regular',
    type: 'number',
    required: true,
    validations: [
      { type: 'required', message: 'El precio regular es requerido' },
      { type: 'min', value: 0, message: 'El precio debe ser mayor a 0' }
    ]
  },
  {
    key: 'sale_price',
    label: 'Precio Oferta',
    type: 'number',
    required: false
  },
  {
    key: 'brand_id',
    label: 'Marca',
    type: 'select',
    required: true,
    options: brands,
    validations: [
      { type: 'required', message: 'La marca es requerida' }
    ]
  },
  {
    key: 'unit_of_measure',
    label: 'Unidad de Medida',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'La unidad de medida es requerida' }
    ]
  },
  {
    key: 'image_url',
    label: 'URL de Imagen',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'La URL de imagen es requerida' }
    ]
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'select',
    required: true,
    validations: [
      { type: 'required', message: 'El estado es requerido' }
    ]
  },
  {
    key: 'category_id',
    label: 'Categoría',
    type: 'select',
    options: categories,
    required: true,
    validations: [
      { type: 'required', message: 'La categoría es requerida' }
    ]
  },
  {
    key: 'subcategory_id',
    label: 'Subcategoría',
    type: 'select',
    required: true,
    validations: [
      { type: 'required', message: 'La subcategoría es requerida' }
    ]
  },
{
  key: 'attributes',
  label: 'Características Técnicas',
  type: 'object_properties',
  properties: [
    {
      key: 'color',
      label: 'Color',
      type: 'text',
      defaultValue: 'blanco'
    },
    {
      key: 'tipo_uso',
      label: 'Tipo de Uso',
      type: 'select',
      required: true,
      options: [
        { value: 'sanitario', label: 'Sanitario' },
        { value: 'drenaje', label: 'Drenaje' },
        { value: 'industrial', label: 'Industrial' }
      ]
    },
    {
      key: 'certificado',
      label: 'Cuenta con certificación',
      type: 'checkbox',
      defaultValue: false
    },
   
  ]
}
];


export const inventoryFormFields = [
  {
    key: 'available_quantity',
    label: 'Cantidad Disponible',
    type: 'number',
    required: true,
    validations: [
      { type: 'required', message: 'La cantidad disponible es requerida' }
    ]
  },
  {
    key: 'minimum_stock_level', 
    label: 'Nivel Mínimo de Stock',
    type: 'number',
    required: true,
    validations: [
      { type: 'required', message: 'El nivel mínimo de stock es requerido' }
    ]
  },
  {
    key: 'warehouse_location',
    label: 'Ubicación en Almacén',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'La ubicación en almacén es requerida' }
    ]
  },
  {
    key: 'last_restock_date',
    label: 'Última Fecha de Reabastecimiento',
    type: 'date',
    required: true,
    validations: [
      { type: 'required', message: 'La fecha de reabastecimiento es requerida' }
    ]
  },
  {
    key: 'reserved_quantity',
    label: 'Cantidad Reservada',
    type: 'number',
    required: true,
    validations: [
      { type: 'required', message: 'La cantidad reservada es requerida' }
    ]
  },
  {
    key: 'maximum_stock_level',
    label: 'Nivel Máximo de Stock',
    type: 'number', 
    required: true,
    validations: [
      { type: 'required', message: 'El nivel máximo de stock es requerido' }
    ]
  },
  {
    key: 'warehouse_id',
    label: 'ID de Almacén',
    type: 'number',
    required: true,
    validations: [
      { type: 'required', message: 'El ID de almacén es requerido' }
    ]
  },
  {
    key: 'last_count_date',
    label: 'Última Fecha de Conteo',
    type: 'date',
    required: true,
    validations: [
      { type: 'required', message: 'La fecha de último conteo es requerida' }
    ]
  }
];

export const technicalSpecsFields = [
  {
    key: 'usage_recommendations',
    label: 'Recomendaciones de Uso',
    type: 'textarea',
    required: true,
    validations: [
      { type: 'required', message: 'Las recomendaciones de uso son requeridas' }
    ]
  },
  {
    key: 'technical_drawing_url', 
    label: 'URL del Dibujo Técnico',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'La URL del dibujo técnico es requerida' }
    ]
  },
  {
    key: 'standard_compliance',
    label: 'Cumplimiento de Estándares',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'El cumplimiento de estándares es requerido' }
    ]
  },
  {
    key: 'installation_guidelines',
    label: 'Guías de Instalación',
    type: 'textarea',
    required: true,
    validations: [
      { type: 'required', message: 'Las guías de instalación son requeridas' }
    ]
  },
  {
    key: 'certification_details',
    label: 'Detalles de Certificación',
    type: 'text',
    required: true,
    validations: [
      { type: 'required', message: 'Los detalles de certificación son requeridos' }
    ]
  },
  {
    key: 'safety_information',
    label: 'Información de Seguridad',
    type: 'textarea', 
    required: true,
    validations: [
      { type: 'required', message: 'La información de seguridad es requerida' }
    ]
  }
];

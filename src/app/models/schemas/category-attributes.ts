import { FormField } from '../../../models/form-field';

export interface CategoryAttributes {
  id: number;
  name: string;
  attributes: FormField[];
}

export const categoryAttributesMap: CategoryAttributes[] = [
  {
    id: 1,
    name: 'Tuberías PVC',
    attributes: [
      {
        key: 'color',
        label: 'Color',
        type: 'text',
        required: false,
        validations: [
          { type: 'default', message: '', value: 'blanco' }
        ]
      },
      {
        key: 'tipo_uso',
        label: 'Tipo de Uso',
        type: 'select',
        required: true,
        options: [
          { value: 'presion', label: 'Presión' },
          { value: 'drenaje', label: 'Drenaje' },
          { value: 'electrico', label: 'Eléctrico' }
        ],
        validations: [
          { type: 'required', message: 'El tipo de uso es requerido' }
        ]
      },
      {
        key: 'certificado',
        label: 'Certificado',
        type: 'checkbox',
        required: false
      },
      {
        key: 'resistencia_uv',
        label: 'Resistencia UV',
        type: 'checkbox',
        required: false
      },
      {
        key: 'resistencia_quimica',
        label: 'Resistencia Química',
        type: 'checkbox',
        required: false
      }
    ]
  },
  {
    id: 2,
    name: 'Pegamentos',
    attributes: [
      {
        key: 'base',
        label: 'Base',
        type: 'select',
        required: true,
        options: [
          { value: 'solvente', label: 'Solvente' },
          { value: 'agua', label: 'Agua' }
        ],
        validations: [
          { type: 'required', message: 'La base es requerida' }
        ]
      },
      {
        key: 'contenido',
        label: 'Contenido',
        type: 'text',
        required: true,
        validations: [
          { type: 'required', message: 'El contenido es requerido' }
        ]
      },
      {
        key: 'tiempo_secado_min',
        label: 'Tiempo de Secado (min)',
        type: 'number',
        required: true,
        validations: [
          { type: 'required', message: 'El tiempo de secado es requerido' },
          { type: 'min', value: 0, message: 'El tiempo de secado debe ser mayor a 0' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Accesorios',
    attributes: [
      {
        key: 'material',
        label: 'Material',
        type: 'select',
        required: true,
        options: [
          { value: 'pvc', label: 'PVC' },
          { value: 'cpvc', label: 'CPVC' },
          { value: 'metal', label: 'Metal' }
        ],
        validations: [
          { type: 'required', message: 'El material es requerido' }
        ]
      },
      {
        key: 'diametro',
        label: 'Diámetro',
        type: 'text',
        required: true,
        validations: [
          { type: 'required', message: 'El diámetro es requerido' }
        ]
      },
      {
        key: 'tipo_conexion',
        label: 'Tipo de Conexión',
        type: 'select',
        required: true,
        options: [
          { value: 'rosca', label: 'Rosca' },
          { value: 'cementar', label: 'Cementar' },
          { value: 'presion', label: 'Presión' }
        ],
        validations: [
          { type: 'required', message: 'El tipo de conexión es requerido' }
        ]
      }
    ]
  }
];

// Estructura para las marcas
export interface Options {
  value: number;
  label: string;
}

export const brands: Options[] = [
  { value: 1, label: 'Pavco' },
  { value: 2, label: 'Durman' },
  { value: 3, label: 'Amanco' },
  { value: 4, label: 'Plastidor' },
  { value: 5, label: 'Charlotte Pipe' }
];

export const categories: Options[] = [
  { value: 1, label: 'Tuberías' },
  { value: 2, label: 'Pegamentos' },
  { value: 3, label: 'Accesorios' }
];
// Estructura para las categorías y subcategorías
export interface CategoryTree {
  id: number;
  name: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  parent_id: number;
}

export const subCategories: CategoryTree[] = [
  {
    id: 1,
    name: 'Tuberías',
    subcategories: [
      { id: 101, name: 'Tubería Presión', parent_id: 1 },
      { id: 102, name: 'Tubería Sanitaria', parent_id: 1 },
      { id: 103, name: 'Tubería Eléctrica', parent_id: 1 }
    ]
  },
  {
    id: 2,
    name: 'Pegamentos',
    subcategories: [
      { id: 201, name: 'Pegamento PVC', parent_id: 2 },
      { id: 202, name: 'Pegamento CPVC', parent_id: 2 },
      { id: 203, name: 'Limpiadores', parent_id: 2 }
    ]
  },
  {
    id: 3,
    name: 'Accesorios',
    subcategories: [
      { id: 301, name: 'Codos', parent_id: 3 },
      { id: 302, name: 'Tees', parent_id: 3 },
      { id: 303, name: 'Uniones', parent_id: 3 },
      { id: 304, name: 'Válvulas', parent_id: 3 }
    ]
  }
]; 
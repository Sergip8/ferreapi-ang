import { TableColumn } from "../../app/shared/table/table.component";

export const productColumns: TableColumn[] = [
    { header: 'Código', field: 'product_code', sortable: true, width: 'w-1/12' },
    { header: 'Nombre', field: 'name', sortable: true, width: 'w-2/12' },
    { header: 'Precio', field: 'regular_price', sortable: true, width: 'w-1/12' },
    { header: 'Oferta', field: 'sale_price', sortable: true, width: 'w-1/12' },
    { header: 'Estado', field: 'status', sortable: true, width: 'w-1/12' },
    { header: 'Action', field: 'action', type: "action", sortable: false, width: 'w-2/12' }
];

export const productSchema = {
    product_code: {
        label: 'Código',
        type: 'text',
        required: true,
    },
    name: {
        label: 'Nombre',
        type: 'text',
        required: true,
    },
    description: {
        label: 'Descripción',
        type: 'textarea',
        required: true,
    },
    regular_price: {
        label: 'Precio Regular',
        type: 'number',
        required: true,
    },
    sale_price: {
        label: 'Precio Oferta',
        type: 'number',
        required: false,
    },
    brand_id: {
        label: 'Marca',
        type: 'select',
        required: true,
    },
    category_id: {
        label: 'Categoría',
        type: 'select',
        required: true,
    },
    subcategory_id: {
        label: 'Subcategoría',
        type: 'select',
        required: true,
    },
    unit_of_measure: {
        label: 'Unidad de Medida',
        type: 'text',
        required: true,
    },
    image_url: {
        label: 'URL de Imagen',
        type: 'text',
        required: false,
    },
    status: {
        label: 'Estado',
        type: 'select',
        required: true,
    }
};

export const productAttributesSchema = {
    tuberia: {
        color: {
            label: 'Color',
            type: 'text',
            required: false,
        },
        tipo_uso: {
            label: 'Tipo de Uso',
            type: 'select',
            options: ['presión', 'drenaje', 'eléctrico'],
            required: true,
        },
        certificado: {
            label: 'Certificado',
            type: 'checkbox',
            required: false,
        },
        resistencia_uv: {
            label: 'Resistencia UV',
            type: 'checkbox',
            required: false,
        },
        resistencia_quimica: {
            label: 'Resistencia Química',
            type: 'checkbox',
            required: false,
        }
    },
    pegamento: {
        base: {
            label: 'Base',
            type: 'select',
            options: ['solvente', 'agua'],
            required: true,
        },
        contenido: {
            label: 'Contenido',
            type: 'text',
            required: true,
        },
        tiempo_secado_min: {
            label: 'Tiempo de Secado (min)',
            type: 'number',
            required: true,
        }
    },
    herramienta: {
        tipo: {
            label: 'Tipo',
            type: 'text',
            required: true,
        },
        material: {
            label: 'Material',
            type: 'text',
            required: true,
        },
        capacidad_corte: {
            label: 'Capacidad de Corte',
            type: 'text',
            required: false,
        }
    }
}; 
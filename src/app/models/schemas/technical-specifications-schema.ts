import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const technicalSpecificationsColumns: TableColumn[] = [
  { header: 'ID', field: 'spec_id', sortable: true },
  { header: 'Product', field: 'product_id', sortable: true },
  { header: 'Standard', field: 'standard_compliance', sortable: true },
  { header: 'Certification', field: 'certification_details', sortable: true },
  { header: 'Usage', field: 'usage_recommendations', sortable: true },
  { header: 'Installation', field: 'installation_guidelines', sortable: true },
  { header: 'Drawing', field: 'technical_drawing_url', sortable: true },
  { header: 'Safety', field: 'safety_information', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const technicalSpecificationsSchema: FormField[] = [
  { key: 'product_id', label: 'Product', type: 'number', required: true },
  { key: 'standard_compliance', label: 'Standard Compliance', type: 'text' },
  { key: 'certification_details', label: 'Certification Details', type: 'textarea' },
  { key: 'usage_recommendations', label: 'Usage Recommendations', type: 'textarea' },
  { key: 'installation_guidelines', label: 'Installation Guidelines', type: 'textarea' },
  { key: 'technical_drawing_url', label: 'Technical Drawing URL', type: 'text' },
  { key: 'safety_information', label: 'Safety Information', type: 'textarea' }
]; 
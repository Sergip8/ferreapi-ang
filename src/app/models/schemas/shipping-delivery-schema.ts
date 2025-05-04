import { TableColumn } from "../../shared/table/table.component";
import { FormField } from "../../../models/form-field";

export const shippingDeliveryColumns: TableColumn[] = [
  { header: 'ID', field: 'shipping_id', sortable: true },
  { header: 'Order', field: 'order_id', sortable: true },
  { header: 'Shipping Date', field: 'shipping_date', sortable: true },
  { header: 'Estimated Delivery', field: 'estimated_delivery_date', sortable: true },
  { header: 'Actual Delivery', field: 'actual_delivery_date', sortable: true },
  { header: 'Cost', field: 'shipping_cost', sortable: true },
  { header: 'Receiver', field: 'receiver_name', sortable: true },
  { header: 'Carrier', field: 'carrier_name', sortable: true },
  { header: 'Tracking', field: 'tracking_number', sortable: true },
  { header: 'Status', field: 'shipping_status', sortable: true },
  { header: 'Action', field: 'action', type: "action", sortable: false }
];

export const shippingDeliverySchema: FormField[] = [
  { key: 'order_id', label: 'Order', type: 'number', required: true },
  { key: 'shipping_date', label: 'Shipping Date', type: 'date' },
  { key: 'estimated_delivery_date', label: 'Estimated Delivery Date', type: 'date' },
  { key: 'actual_delivery_date', label: 'Actual Delivery Date', type: 'date' },
  { key: 'shipping_cost', label: 'Shipping Cost', type: 'number' },
  { key: 'receiver_name', label: 'Receiver Name', type: 'text' },
  { key: 'delivery_notes', label: 'Delivery Notes', type: 'textarea' },
  { key: 'carrier_name', label: 'Carrier Name', type: 'text' },
  { key: 'tracking_number', label: 'Tracking Number', type: 'text' },
  { key: 'shipping_status', label: 'Shipping Status', type: 'text' }
]; 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes, ElementRoutes, SettingRoutes } from './admin.routes';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { TechnicalSpecificationsComponent } from './pages/technical-specifications/technical-specifications.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { RawMaterialsInventoryComponent } from './pages/raw-materials-inventory/raw-materials-inventory.component';
import { ManufacturingMachinesComponent } from './pages/manufacturing-machines/manufacturing-machines.component';
import { ProductionBatchesComponent } from './pages/production-batches/production-batches.component';
import { QualityControlComponent } from './pages/quality-control/quality-control.component';
import { InvoicePaymentsComponent } from './pages/invoice-payments/invoice-payments.component';
import { ShippingDeliveryComponent } from './pages/shipping-delivery/shipping-delivery.component';
import { CustomerReturnsComponent } from './pages/customer-returns/customer-returns.component';





const routes: Routes = [
  {
    path: '',
    redirectTo: AdminRoutes.Dashboard,
    pathMatch: 'full',
  },
  {
    title: 'Dashboard',
    path: AdminRoutes.Dashboard,
    component: DashboardComponent,
  },
  {
      title: 'Registers',
      path: AdminRoutes.Registers,
      children: [
        {
          title: 'Users',
          path: ElementRoutes.Users,
          component: UsersComponent,
        },
        {
          title: 'Products',
          path: ElementRoutes.Products,
          component: ProductsComponent,
        },
        {
          title: 'Inventories',
          path: ElementRoutes.Inventories,
          component: InventariosComponent,
        },
        {
          title: 'Technical Specifications',
          path: ElementRoutes.TechnicalSpecifications,
          component: TechnicalSpecificationsComponent,
        },
        {
          title: 'Categories',
          path: 'categories',
          component: CategoriesComponent,
        },
        {
          title: 'Promotions',
          path: 'promotions',
          component: PromotionsComponent,
        },
        {
          title: 'Orders',
          path: 'orders',
          component: OrdersComponent,
        },
        {
          title: 'Order Details',
          path: 'order-details',
          component: OrderDetailsComponent,
        },
        {
          title: 'Suppliers',
          path: 'suppliers',
          component: SuppliersComponent,
        },
        {
          title: 'Raw Materials Inventory',
          path: 'raw-materials-inventory',
          component: RawMaterialsInventoryComponent,
        },
        {
          title: 'Manufacturing Machines',
          path: 'manufacturing-machines',
          component: ManufacturingMachinesComponent,
        },
        {
          title: 'Production Batches',
          path: 'production-batches',
          component: ProductionBatchesComponent,
        },
        {
          title: 'Quality Control',
          path: 'quality-control',
          component: QualityControlComponent,
        },
        {
          title: 'Invoice Payments',
          path: 'invoice-payments',
          component: InvoicePaymentsComponent,
        },
        {
          title: 'Shipping Delivery',
          path: 'shipping-delivery',
          component: ShippingDeliveryComponent,
        },
        {
          title: 'Customer Returns',
          path: 'customer-returns',
          component: CustomerReturnsComponent,
        },
      ],
  },

  // {
  //   title: 'Events',
  //   path: AdminRoutes.Events,
  //   component: EventsComponent,
  //   children: [
  //     {
  //       path: 'testing',
  //       component: TestComponent,
  //       outlet: 'test',
  //     },
  //   ],
  // },
  // {
  //   title: 'Elements',
  //   path: AdminRoutes.Elements,
  //   children: [
      
  //     {
  //       title: 'Buttons',
  //       path: ElementRoutes.Buttons,
  //       component: ButtonsComponent,
  //     },
     
  //   ],
  // },
  // {
  //   path: AdminRoutes.Settings,
  //   children: [
  //     {
  //       title: 'Settings',
  //       path: SettingRoutes.Profile,
  //       component: ProfileComponent,
  //     },
  //     {
  //       title: 'Users',
  //       path: SettingRoutes.Users,
  //       component: UsersComponent,
  //     },
  //   ],
  // },
  //{ path: '**', component: AdminPageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}


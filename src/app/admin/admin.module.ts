import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminSidebarComponent } from './layouts/sidebar/sidebar.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminSidebarComponent,
    AdminRoutingModule,
    UsersComponent,
    ProductsComponent
  ]
})
export class AdminModule { }

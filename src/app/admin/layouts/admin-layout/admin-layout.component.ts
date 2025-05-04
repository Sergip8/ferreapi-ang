import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-100">
      <app-admin-sidebar></app-admin-sidebar>
      <main class="flex-1 overflow-auto ml-64">
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent {} 
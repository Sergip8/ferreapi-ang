import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../../_core/services/auth.service';
import { 
  heroHome, 
  heroUserGroup, 
  heroCog6Tooth, 
  heroChartBar,
  heroShoppingCart,
  heroDocumentText,
  heroUsers,
  heroChevronRight,
  heroChevronLeft,
  heroChevronDown,
  heroChevronUp,
  heroXMark,
  heroArrowRightOnRectangle
} from '@ng-icons/heroicons/outline';
import { slideInOut, rotateIcon, slideSidebar, fadeBackground } from '../../../shared/utils/animations';
import { AdminRoutes } from '../../admin.routes';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  providers: [provideIcons({ 
    heroHome, 
    heroUserGroup, 
    heroCog6Tooth, 
    heroChartBar, 
    heroShoppingCart, 
    heroDocumentText, 
    heroUsers,
    heroChevronRight,
    heroChevronLeft,
    heroChevronDown,
    heroChevronUp,
    heroXMark,
    heroArrowRightOnRectangle
  })],
  template: `
    <!-- Background Overlay -->
    <div *ngIf="!isCollapsed && isMobile" 
         class="fixed inset-0 bg-black z-40"
         [@fadeBackground]="isCollapsed ? 'collapsed' : 'expanded'"
         (click)="toggleSidebar()">
    </div>

    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 bg-white shadow-lg z-50"
         [@slideSidebar]="isCollapsed ? 'collapsed' : 'expanded'"
         [class.w-64]="!isCollapsed"
         [class.w-16]="isCollapsed"
         [class.translate-x-0]="!isCollapsed || !isMobile"
         [class.-translate-x-full]="isCollapsed && isMobile">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-between h-16 px-4 border-b">
          <img src="assets/logo.svg" alt="Logo" class="h-8 w-auto" [class.hidden]="isCollapsed">
          <div class="flex items-center space-x-2">
            <button *ngIf="isMobile" 
                    (click)="toggleSidebar()" 
                    class="p-2 rounded-lg hover:bg-gray-100">
              <ng-icon name="heroXMark" class="w-5 h-5"></ng-icon>
            </button>
            <button *ngIf="!isMobile" 
                    (click)="toggleSidebar()" 
                    class="p-2 rounded-lg hover:bg-gray-100">
              <ng-icon [name]="isCollapsed ? 'heroChevronRight' : 'heroChevronLeft'" 
                       class="w-5 h-5"
                       [@rotateIcon]="isCollapsed ? 'expanded' : 'collapsed'"></ng-icon>
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <div *ngFor="let item of menuItems" class="group">
            <a *ngIf="!item.subItems"
               [routerLink]="item.path" 
               routerLinkActive="bg-gray-100 text-brand-red-500"
               class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
               (click)="item.action ? item.action() : (isMobile && toggleSidebar())">
              <ng-icon [name]="item.icon" class="w-6 h-6"></ng-icon>
              <span class="ml-3" [class.hidden]="isCollapsed">{{ item.label }}</span>
            </a>

            <div *ngIf="item.subItems" class="flex flex-col">
              <button (click)="toggleSubMenu(item)"
                      class="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <div class="flex items-center">
                  <ng-icon [name]="item.icon" class="w-6 h-6"></ng-icon>
                  <span class="ml-3" [class.hidden]="isCollapsed">{{ item.label }}</span>
                </div>
                <ng-icon *ngIf="!isCollapsed"
                         [name]="item.isExpanded ? 'heroChevronDown' : 'heroChevronRight'"
                         class="w-5 h-5"
                         [@rotateIcon]="item.isExpanded ? 'expanded' : 'collapsed'"></ng-icon>
              </button>

              <div [@slideInOut]="item.isExpanded ? 'expanded' : 'collapsed'"
                   class="overflow-hidden">
                <a *ngFor="let subItem of item.subItems"
                   [routerLink]="subItem.path"
                   routerLinkActive="bg-gray-100 text-brand-red-500"
                   class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 ml-4"
                   (click)="isMobile && toggleSidebar()">
                  <ng-icon [name]="subItem.icon" class="w-5 h-5"></ng-icon>
                  <span class="ml-3" [class.hidden]="isCollapsed">{{ subItem.label }}</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `,
  animations: [slideInOut, rotateIcon, slideSidebar, fadeBackground]
})
export class AdminSidebarComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  isBrowser = false;
  private mobileBreakpoint = 768; // Tailwind's md breakpoint

  @Output() onSidebar = new EventEmitter<boolean>(false);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (this.isBrowser) 
    this.isMobile = window.innerWidth < this.mobileBreakpoint;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }
  
  menuItems = [
    { 
      path: '/admin/dashboard', 
      icon: 'heroHome', 
      label: 'Dashboard',
      isExpanded: false
    },
    { 
      path: '/admin/users', 
      icon: 'heroUsers', 
      label: 'Registers',
      isExpanded: false,
      subItems: [
        { path: '/admin/registers/users', icon: 'heroUsers', label: 'Users' },
        { path: '/admin/registers/products', icon: 'heroUsers', label: 'Products' },
        { path: '/admin/registers/inventories', icon: 'heroUsers', label: 'Inventories' },
        { path: '/admin/registers/technical-specifications', icon: 'heroUsers', label: 'Technical Specifications' },
        { path: '/admin/registers/categories', icon: 'heroUsers', label: 'Categories' },
        { path: '/admin/registers/promotions', icon: 'heroUsers', label: 'Promotions' },
        { path: '/admin/registers/orders', icon: 'heroUsers', label: 'Orders' },
        { path: '/admin/registers/order-details', icon: 'heroUsers', label: 'Order Details' },
        { path: '/admin/registers/suppliers', icon: 'heroUsers', label: 'Suppliers' },
        { path: '/admin/registers/raw-materials-inventory', icon: 'heroUsers', label: 'Raw Materials Inventory' },
        { path: '/admin/registers/manufacturing-machines', icon: 'heroUsers', label: 'Manufacturing Machines' },
        { path: '/admin/registers/production-batches', icon: 'heroUsers', label: 'Production Batches' },
        { path: '/admin/registers/quality-control', icon: 'heroUsers', label: 'Quality Control' },
        { path: '/admin/registers/invoice-payments', icon: 'heroUsers', label: 'Invoice Payments' },
        { path: '/admin/registers/shipping-delivery', icon: 'heroUsers', label: 'Shipping Delivery' },
        { path: '/admin/registers/customer-returns', icon: 'heroUsers', label: 'Customer Returns' },
      ]
    },
    { 
      path: '/admin/products', 
      icon: 'heroShoppingCart', 
      label: 'Products',
      isExpanded: false,
      subItems: [
        { path: '/admin/products/list', icon: 'heroShoppingCart', label: 'All Products' },
        { path: '/admin/products/categories', icon: 'heroDocumentText', label: 'Categories' }
      ]
    },
    { 
      path: '/admin/orders', 
      icon: 'heroDocumentText', 
      label: 'Orders',
      isExpanded: false
    },
    { 
      path: '/admin/customers', 
      icon: 'heroUserGroup', 
      label: 'Customers',
      isExpanded: false
    },
    { 
      path: '/admin/reports', 
      icon: 'heroChartBar', 
      label: 'Reports',
      isExpanded: false,
      subItems: [
        { path: '/admin/reports/sales', icon: 'heroChartBar', label: 'Sales Report' },
        { path: '/admin/reports/users', icon: 'heroUsers', label: 'User Report' }
      ]
    },
    { 
      path: '/admin/settings', 
      icon: 'heroCog6Tooth', 
      label: 'Settings',
      isExpanded: false
    },
    { 
      path: '', 
      icon: 'heroArrowRightOnRectangle', 
      label: 'Logout',
      isExpanded: false,
      action: () => this.logout()
    }
 
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.onSidebar.emit(this.isCollapsed);
  }

  toggleSubMenu(item: any) {
    if (!this.isCollapsed) {
      item.isExpanded = !item.isExpanded;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
} 
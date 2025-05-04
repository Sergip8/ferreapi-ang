import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <div *ngFor="let _ of [].constructor(count)" class="animate-pulse">
        <div class="space-y-4">
          <!-- Skeleton for image -->
          <div class="bg-gray-200 rounded-lg h-44 w-full"></div>
          
          <!-- Skeleton for content -->
          <div class="p-5 space-y-3">
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            <div class="h-8 bg-gray-200 rounded w-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class GridLoadingComponent {
  @Input() count: number = 8;
} 
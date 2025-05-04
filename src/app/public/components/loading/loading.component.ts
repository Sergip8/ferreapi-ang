import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse">
      <div class="space-y-4">
        <!-- Skeleton for image -->
        <div class="bg-gray-200 rounded-lg h-44 w-full"></div>
        
        <!-- Skeleton for content -->
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
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
export class LoadingComponent {} 
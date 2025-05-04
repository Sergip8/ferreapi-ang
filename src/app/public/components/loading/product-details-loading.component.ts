import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Image Section -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="bg-gray-200 rounded-lg h-96 w-full"></div>
          
          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-4">
            <div *ngFor="let _ of [].constructor(4)" class="bg-gray-200 rounded-lg h-20"></div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="space-y-6">
          <!-- Title and Brand -->
          <div class="space-y-2">
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>

          <!-- Price Section -->
          <div class="space-y-2">
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>

          <!-- Rating -->
          <div class="flex items-center space-x-2">
            <div class="h-5 w-24 bg-gray-200 rounded"></div>
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>

          <!-- Specifications -->
          <div class="space-y-3">
            <div class="h-5 bg-gray-200 rounded w-1/3"></div>
            <div class="grid grid-cols-2 gap-4">
              <div *ngFor="let _ of [].constructor(4)" class="space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-4">
            <div class="h-12 bg-gray-200 rounded w-full"></div>
            <div class="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Additional Info Section -->
      <div class="mt-12 space-y-8">
        <!-- Tabs -->
        <div class="flex space-x-4 border-b border-gray-200">
          <div *ngFor="let _ of [].constructor(3)" class="h-8 w-24 bg-gray-200 rounded"></div>
        </div>

        <!-- Tab Content -->
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
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
export class ProductDetailsLoadingComponent {} 
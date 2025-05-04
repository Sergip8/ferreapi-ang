import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide high-quality products and excellent customer service to ensure your satisfaction.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <app-card *ngFor="let feature of filteredFeatures">
            <div class="p-6">
              <div class="text-blue-600 mb-4">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="feature.icon"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{feature.title}}</h3>
              <p class="text-gray-600">{{feature.description}}</p>
            </div>
          </app-card>
        </div>
      </div>
    </section>
  `
})
export class FeaturesComponent {
  @Input() searchTerm: string = '';

  features: Feature[] = [
    {
      id: 1,
      title: 'Quality Products',
      description: 'We source only the highest quality products from trusted suppliers.',
      icon: 'M5 13l4 4L19 7'
    },
    {
      id: 2,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your products to you as soon as possible.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our customer service team is always ready to help you with any questions.',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  get filteredFeatures(): Feature[] {
    if (!this.searchTerm) {
      return this.features;
    }
    const searchLower = this.searchTerm.toLowerCase();
    return this.features.filter(feature => 
      feature.title.toLowerCase().includes(searchLower) || 
      feature.description.toLowerCase().includes(searchLower)
    );
  }
} 
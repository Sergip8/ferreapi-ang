import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialButtonsComponent } from '../../../shared/social-buttons/social-buttons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SocialButtonsComponent],
  template: `
    <footer class="bg-red-900 text-white">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold text-yellow-400 mb-4">PVC Supply Pro</h3>
            <p class="mb-4">Your trusted source for quality PVC supplies since 1995. Serving contractors and DIY enthusiasts with the best products and expertise.</p>
            <app-social-buttons></app-social-buttons>
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-yellow-300 transition">Home</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">About Us</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Products</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Services</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Projects</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Blog</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Our Services</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-yellow-300 transition">Contractor Accounts</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Bulk Orders</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Custom Fabrication</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Project Estimation</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">Delivery Services</a></li>
              <li><a href="#" class="hover:text-yellow-300 transition">DIY Workshops</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-yellow-400 mb-4">Contact Us</h3>
            <address class="not-italic">
              <p class="flex items-start mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                123 Plumbing Way<br>
                Pipetown, PT 12345
              </p>
              <p class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </p>
              <p class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                infopvcsupplypro.com
              </p>
              <p class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon-Fri: 7AM-6PM<br>
                Sat: 8AM-4PM, Sun: Closed
              </p>
            </address>
          </div>
        </div>
      </div>
      
      <div class="bg-red-950 py-4">
        <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 PVC Supply Pro. All rights reserved.</p>
          <div class="mt-4 md:mt-0">
            <ul class="flex space-x-6">
              <li><a href="#" class="text-sm hover:text-yellow-300 transition">Privacy Policy</a></li>
              <li><a href="#" class="text-sm hover:text-yellow-300 transition">Terms of Service</a></li>
              <li><a href="#" class="text-sm hover:text-yellow-300 transition">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}


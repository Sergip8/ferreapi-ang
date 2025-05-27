import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../title/title.component";
import { CardComponent } from "../card/card.component";
import { CardModel } from '../card/card-model';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CardComponent],
  template: `
   
   <section class="py-8 sm:py-12 md:py-16 bg-pvc-pattern">
  <div class="container mx-auto px-4 sm:px-6">

    <!-- Collage Grid Layout -->
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6 mx-auto">

      <!-- Featured Card - Spans 2 columns and rows -->
      <div class="sm:col-span-2 md:row-span-1">
        <app-title class="mb-3 sm:mb-4" [title]="title"></app-title>
        <div class="relative flex flex-col sm:flex-row gap-3 sm:gap-4">
          <app-card 
            class="w-full h-full sm:w-1/2 shadow-lg rounded-lg hover:scale-[1.02] transition-transform duration-200"
            *ngIf="cardData.length > 0" 
            [cardData]="cardData[0]"
          ></app-card>
          <div class="w-full sm:w-1/2 rounded-lg overflow-hidden shadow-md">
            <img 
              src="../../../../assets/images/yellow_pipes.jpg" 
              alt="Collage image" 
              class="hidden sm:block w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div class="hidden sm:block mt-3 sm:mt-4 rounded-lg overflow-hidden shadow-md">
          <img 
            src="../../../../assets/images/yellow_pipes.jpg" 
            alt="Collage image" 
            class="w-full h-48 sm:h-56 md:h-64 object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Regular Cards Column -->
      <div class="flex flex-col gap-3 sm:gap-4">
        <div>
          <app-card 
            class="shadow-md rounded-lg transition-transform hover:scale-[1.01] duration-200"
            *ngIf="cardData.length > 1" 
            [cardData]="cardData[1]">
          </app-card>
        </div>
        <div>
          <app-card 
            class="shadow-md rounded-lg transition-transform hover:scale-[1.01] duration-200"
            *ngIf="cardData.length > 2" 
            [cardData]="cardData[2]">
          </app-card>
        </div>
        <div>
          <app-card 
            class="shadow-md rounded-lg transition-transform hover:scale-[1.01] duration-200"
            *ngIf="cardData.length > 3" 
            [cardData]="cardData[3]">
          </app-card>
        </div>
      </div>

      <!-- Image Column -->
      <div class="hidden lg:block rounded-lg overflow-hidden shadow-md">
        <img 
          src="../../../../assets/images/yellow_pipes.jpg" 
          alt="Collage image" 
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

    </div>
  </div>
</section>
  `,
  styles: [`
  .collage-background {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
  overflow: hidden;
}

.collage-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    url('https://example.com/imagen1.jpg'),
    url('https://example.com/imagen2.jpg'),
    url('https://example.com/imagen3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: 1;
}

.collage-background .content {
  position: relative;
  z-index: 2;
  padding: 20px;
  color: #333;
}
    `]
})
export class FeaturesComponent {

    @Input() cardData!: CardModel[];
    title = {
        main: "Why Choose",
        strong: "PVC Supply Pro",
        final: "for Your Plumbing Needs",
        subtitle: "Delivering quality and expertise for over two decades"
    }
}
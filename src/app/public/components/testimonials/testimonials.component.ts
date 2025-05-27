import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../title/title.component";
import { CardModel } from '../card/card-model';
import { CardComponent } from "../card/card.component";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CardComponent],
  template: `
    <section class="py-12 md:py-16 text-white">
      <div class="container mx-auto px-4">
     
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
    <!-- Background Gradient with ::before replacement -->
  

      <div class="flex items-end ">
        <app-title [title]="title"></app-title>
      </div>
      
    

          
            <app-card *ngFor="let testimonial of cardData" [cardData]="testimonial"></app-card>
          
        </div>

        <div class="mt-10 text-center">
          <a href="#" class="inline-block bg-yellow-500 hover:bg-yellow-600 text-red-900 py-3 px-6 rounded-md font-medium transition">Read More Reviews</a>
        </div>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  title = {
    main: "What our customers",
    strong: "say",
    final: "about our services",
    subtitle: "Don't just take our word for it"
  }
  @Input() cardData!: CardModel[];
}

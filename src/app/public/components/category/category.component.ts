import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModel } from '../card/card-model';
import { CardComponent } from "../card/card.component";
import { Router } from '@angular/router';
import { PublicRoutes } from '../../public.routes';
import { ProductService } from '../../../_core/services/product.service';

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <section class=" py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-red-800 mb-2 text-center">Product Categories</h2>
        <p class="text-gray-600 text-center mb-8">Browse our extensive selection of high-quality PVC products</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
         <app-card class="" (onClickCard)="gotoCat(cat.id)" *ngFor="let cat of cardData" [cardData]="cat"></app-card>
        </div>
      </div>
    </section>
  `,
})
export class CategoryGridComponent {
    @Input() cardData!: CardModel[];

    constructor(private router: Router, private productService: ProductService){}

    gotoCat(id: number){

      this.router.navigate([PublicRoutes.Catalog], { queryParams: { cat: id }, queryParamsHandling: 'merge' })

    }
}
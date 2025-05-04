import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PublicRoutingModule } from './public-routing.module';
import { PublicHomeComponent } from './views/public-home/public-home.component';
import { PublicComponent } from './public.component';
import { PublicHeaderComponent } from './layouts/public-header/public-header.component';
import { FooterComponent } from './layouts/public-footer/public-footer.component';
import { HeroSectionComponent } from './layouts/hero-section/hero-section.component';
import { CategoryGridComponent } from './components/category/category.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FeaturesComponent } from './components/feature/features.component';
import { ProductCatalogComponent } from './views/product-catalog/product-catalog.component';
import { CardComponent } from "./components/card/card.component";
import { PaginationComponent } from "../shared/pagination/pagination";
import { FilterSidebarComponent } from "./layouts/filter-sidebar/filter-sidebar.component";
import { FilterTopComponent } from "./layouts/filter-sidebar/filter-top.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GridLoadingComponent } from './components/loading/grid-loading.component';
import { ProductDetailComponent } from './views/product-details/product-details.component';
import { ProductDetailsLoadingComponent } from './components/loading/product-details-loading.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [PublicComponent, PublicHomeComponent, ProductCatalogComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    PublicHeaderComponent,
    FooterComponent,
    PublicRoutingModule,
    HeroSectionComponent,
    CategoryGridComponent,
    TestimonialsComponent,
    FeaturesComponent,
    RouterOutlet,
    CardComponent,
    PaginationComponent,
    FilterSidebarComponent,
    FilterTopComponent,
    NotFoundComponent,
    GridLoadingComponent,
    ProductDetailsLoadingComponent,
    FormsModule
]
})
export class PublicModule {}

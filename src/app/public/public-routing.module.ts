import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeComponent } from './views/public-home/public-home.component';
import { PublicRoutes } from './public.routes';
import { ProductCatalogComponent } from './views/product-catalog/product-catalog.component';
import { ProductDetailComponent } from './views/product-details/product-details.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CartComponent } from '../shared/cart/cart.component';
import { ContactComponent } from './views/contact/contact.component';
import { AboutComponent } from './views/about/about.component';
import { ProductResolver } from '../_core/resolvers/product-resolver';
import { ProjectsComponent } from './views/projects/projects/projects.component';



const routes: Routes = [

  {
    path: PublicRoutes.Home,
    title: 'Home',
    component: PublicHomeComponent,
  },
  {
    path: PublicRoutes.Register,
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: PublicRoutes.Login,
    title: 'Login',
    component: LoginComponent,
  },

  {
    path: PublicRoutes.Catalog,
    title: 'catalog',
    component: ProductCatalogComponent,
  },
   {
    path: PublicRoutes.Details,
   
    title: 'details',
    component: ProductDetailComponent,
  },
  {
    path: PublicRoutes.Cart,  
    title: 'cart',
    component: CartComponent,
  },
  {
    path: PublicRoutes.Contact,
    title: 'contact',
    component: ContactComponent,
  },
  {
    path: PublicRoutes.About,
    title: 'about',
    component: AboutComponent,
  },
   {
    path: PublicRoutes.Projects,
    title: 'projects',
    component: ProjectsComponent,
  },
   {
    path: 'details/:id',
    component: ProductDetailComponent,
    resolve: {
      productData: ProductResolver
    },
    data: {
    
      title: 'Product Details',
      description: 'View detailed product information'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}

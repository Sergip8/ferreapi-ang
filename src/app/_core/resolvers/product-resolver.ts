import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { ProductService } from '../services/product.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {
  
  constructor(
    private productService: ProductService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = Number(route.paramMap.get('id'));
    
    if (!productId || isNaN(productId)) {
      // Si no hay ID válido, redirigir
      this.router.navigate(['/']);
      return EMPTY;
    }

    // En el servidor, intentar cargar el producto
    if (isPlatformServer(this.platformId)) {
      return this.productService.getProductDetails(productId).pipe(
        map(product => ({ product, productId })),
        catchError(error => {
          console.error('Error loading product in resolver:', error);
          // En caso de error en servidor, permitir que el cliente maneje la carga
          return of({ product: null, productId, error: true });
        })
      );
    }

    // En el cliente, solo pasar el ID
    return of({ product: null, productId });
  }
}
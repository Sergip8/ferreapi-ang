import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../_core/services/product.service';
import { Product, ProductCard } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { CardModel } from '../../components/card/card-model';
import { map } from 'rxjs';
import { CardComponent } from "../../components/card/card.component";
import { ProductDetailsLoadingComponent } from '../../components/loading/product-details-loading.component';
import { AuthService } from '../../../_core/services/auth.service';
import { CartService } from '../../../_core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;
  activeTab: string = 'description';
  productId!: number;
  suggested: CardModel[] = [];
  isLoading = true;
  quantity: number = 1;
  showQuantitySelector: boolean = false;
  showToast: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Obtener datos del resolver
    this.route.data.subscribe(data => {
      const { productData } = data;
      if (productData) {
        this.productId = productData.productId;
        
        if (productData.product) {
          // Datos ya cargados por el resolver (SSR)
          this.product = productData.product;
          this.isLoading = false;
        }
        
        // En el cliente, cargar datos adicionales
        if (isPlatformBrowser(this.platformId)) {
          if (!this.product) {
            this.productDetails();
          }
          this.getSuggestedProducts();
          this.checkAuthClaims();
        }
      }
    });

    // Fallback para parámetros directos
    this.route.params.subscribe(param => {
      if (param['id'] && !this.productId) {
        this.productId = Number(param['id']);
        
        if (isPlatformBrowser(this.platformId)) {
          this.productDetails();
          this.getSuggestedProducts();
          this.checkAuthClaims();
        }
      }
    });
  }

  private checkAuthClaims(): void {
    try {
      const claims = this.authService.getTokenClaims();
      console.log(claims);
    } catch (error) {
      console.error('Error getting token claims:', error);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getStockStatusClass(): string {
    return this.product?.stock_status === 'In Stock'
      ? 'bg-green-500'
      : 'bg-red-500';
  }

  formatPrice(price: string | null): string {
    if (!price) return 'N/A';
    return `$${parseFloat(price).toFixed(2)}`;
  }

  productDetails() {
    if (this.productId && isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.productService.getProductDetails(this.productId).subscribe({
        next: data => {
          this.product = data;
          console.log(this.product);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading product details:', error);
          this.isLoading = false;
        }
      });
    }
  }

  selectedTab: string = 'description';

  isAvailable(): boolean {
    return this.product?.stock_status === 'In Stock';
  }

  getSuggestedProducts() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.productService.getProductSuggested(this.productId).subscribe({
      next: data => {
        this.suggested = data.data.map((product: ProductCard) => ({
          id: product.product_id,
          brand: product.brand_name,
          title: product.name,
          description: product.description,
          price: product.regular_price ? Number(product.regular_price) : 0,
          originalPrice: product.sale_price,
          imageSrc: product.image_url,
          cardType: 'product'
        } as CardModel));
      },
      error: (error) => {
        console.error('Error loading suggested products:', error);
      }
    });
  }

  toggleQuantitySelector(): void {
    this.showQuantitySelector = !this.showQuantitySelector;
    if (this.showQuantitySelector) {
      this.quantity = 1;
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.inventory.available_quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.product && this.isAvailable() && this.quantity > 0) {
      this.cartService.addToCart({
        product_id: this.product.product_id,
        name: this.product.name,
        price: this.product.regular_price,
        quantity: this.quantity,
        image_url: this.product.image_url
      });
      
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
      
      this.showQuantitySelector = false;
    }
  }
}
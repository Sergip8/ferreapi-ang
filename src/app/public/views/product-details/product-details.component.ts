import { Component, Input, OnInit } from '@angular/core';
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
    private cartService: CartService
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.productId = Number(param['id']);
        this.productDetails();
        this.getSuggestedProducts();
      }
    });
    const claims = this.authService.getTokenClaims();
    console.log(claims);
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
    if (this.productId) {
      this.isLoading = true;
      this.productService.getProductDetails(this.productId).subscribe({
        next: data => {
          this.product = data;
          console.log(this.product)
          this.isLoading = false;
        },
        error: () => {
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
      }
    });
  }
  toggleQuantitySelector(): void {
    this.showQuantitySelector = !this.showQuantitySelector;
    if (this.showQuantitySelector) {
      // Reset quantity when opening selector
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
    if (this.product && this.isAvailable() && this.quantity > 0) {
      this.cartService.addToCart({
        product_id: this.product.product_id,
        name: this.product.name,
        price: this.product.regular_price,
        quantity: this.quantity,
        image_url: this.product.image_url
      });
      
      // Mostrar toast de confirmación
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
      
      // Cerrar el selector de cantidad
      this.showQuantitySelector = false;
    }
  }
}
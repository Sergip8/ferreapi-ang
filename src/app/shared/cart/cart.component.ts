import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../_core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],  
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCart();
  }

  calculateItemTotal(item: CartItem): string {
    return (parseFloat(item.price) * item.quantity).toFixed(2);
  }

  calculateTotal(): string {
    let total = 0;
    for (const item of this.cartItems) {
      total += parseFloat(item.price) * item.quantity;
    }
    return total.toFixed(2);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product_id, item.quantity + 1);
    this.loadCartItems();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product_id, item.quantity - 1);
      this.loadCartItems();
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
    this.loadCartItems();
  }
  continueShopping(): void {
    this.router.navigate(['/']);
  }
  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
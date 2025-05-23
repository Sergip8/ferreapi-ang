import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

const CART_KEY = 'cart';

export interface CartItem {
  product_id: number;
  name: string;
  price: string;
  quantity: number;
  image_url: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];
  private isBrowser: boolean;
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadCart();
  }

  private loadCart() {
    if (this.isBrowser) {
      const data = localStorage.getItem(CART_KEY);
      this.cart = data ? JSON.parse(data) : [];
    }
    this.cartSubject.next([...this.cart]);
  }


  public getCartItemsCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  private saveCart() {
    if (this.isBrowser) {
      localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
    }
    this.cartSubject.next([...this.cart]);
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  getCartObservable(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: any) {
    const existing = this.cart.find((item) => item.product_id === product.product_id);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      this.cart.push({ ...product, quantity: product.quantity || 1 });
    }
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((item) => item.product_id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeProduct(productId);
      } else {
        this.saveCart();
      }
    }
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter((item) => item.product_id !== productId);
    this.saveCart();
  }

  // Método para vaciar el carrito
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // Método para crear un pedido
  createOrder(customerId: number, address: string) {
    // Lógica para crear el pedido
    // this.clearCart();
  }

  // Método para sincronizar el carrito desde otras pestañas (opcional)
  syncCartFromStorage() {
    if (this.isBrowser) {
      const data = localStorage.getItem(CART_KEY);
      if (data) {
        this.cart = JSON.parse(data);
        this.cartSubject.next([...this.cart]);
      }
    }
  }
}
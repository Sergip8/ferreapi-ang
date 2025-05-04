import { Injectable } from '@angular/core';

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

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const data = localStorage.getItem(CART_KEY);
    this.cart = data ? JSON.parse(data) : [];
  }
  public getCartItemsCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  private saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const existing = this.cart.find((item) => item.product_id === product.product_id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push({ ...product, quantity: product.quantity });
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

  clearCart() {
    this.cart = [];
    this.saveCart();
  }


  createOrder(customerId: number, address: string) {
  
    //this.clearCart();
  }
}
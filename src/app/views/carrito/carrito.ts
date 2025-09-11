// src/app/views/carrito/carrito.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CartItemComponent, RouterModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  items$!: Observable<CartItem[]>;
  total$!: Observable<number>;
  count$!: Observable<number>;

  couponCode = '';

  constructor(public cart: CartService) {
    this.items$ = this.cart.items$;
    this.total$ = this.cart.total$;
    this.count$ = this.cart.count$;
  }

  remove(id: number) { this.cart.removeItem(id); }
  changeQty(id: number, qty: number) { this.cart.updateQty(id, qty); }
  clear() { this.cart.clear(); }

  // Método para mostrar alert desde la plantilla (corre en el contexto del componente)
  showCouponNotImplemented() {
    // Si quieres usar window.alert explícito:
    window.alert('Funcionalidad de cupón no implementada');
    // alternativa: console.log('cupón: ', this.couponCode);
  }
}

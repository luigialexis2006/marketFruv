// src/app/views/productos/productos.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductoCardComponent } from '../../components/producto-card/producto-card';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductoCardComponent, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {
  // productos simulados (puedes ampliarlos)
  productos = signal([
    { id: 1, name: 'Manzana Roja', price: 1200, img: 'assets/img/manzana.jpeg', stock: 50 },
    { id: 2, name: 'Banano', price: 800, img: 'assets/img/banano.jpeg', stock: 120 },
    { id: 3, name: 'Naranja', price: 900, img: 'assets/img/naranja.jpeg', stock: 80 },
    { id: 4, name: 'Tomate', price: 1500, img: 'assets/img/tomate.jpeg', stock: 30 }
  ]);

  query = signal('');

  filtered = computed(() => this.productos().filter(p => p.name.toLowerCase().includes(this.query().toLowerCase())));

  constructor(private cart: CartService, private router: Router) {}

  addToCart(p: any) {
    this.cart.addItem({ id: p.id, name: p.name, price: p.price, qty: 1, img: p.img });
  }

  goToDetail(id: number) {
    this.router.navigate(['/producto', id]);
  }
}

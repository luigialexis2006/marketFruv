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
    { id: 4, name: 'Tomate', price: 1500, img: 'assets/img/tomate.jpeg', stock: 30 },
    { id: 5, name: 'Cebolla', price: 1000, img: 'assets/img/cebolla.jpeg', stock: 60 },
    { id: 6, name: 'Sandia', price: 800, img: 'assets/img/sandia.jpeg', stock: 100 },
    { id: 7, name: 'Pera', price: 1500, img: 'assets/img/pera.jpeg', stock: 40 },
    { id: 8, name: 'Kiwi', price: 1200, img: 'assets/img/kiwi.jpeg', stock: 70 },
    { id: 9, name: 'Mandarina', price: 900, img: 'assets/img/mandarina.jpeg', stock: 90 },
    { id: 10, name: 'Papaya', price: 1500, img: 'assets/img/papaya.jpeg', stock: 50 },
    { id: 11, name: 'Platano', price: 1000, img: 'assets/img/platano.jpeg', stock: 80 },
    { id: 12, name: 'Durazno', price: 1200, img: 'assets/img/durazno.jpeg', stock: 60 },
    { id: 13, name: 'Uva', price: 900, img: 'assets/img/uva.jpeg', stock: 90 },
    { id: 14, name: 'Melon', price: 1500, img: 'assets/img/melon.jpeg', stock: 40 },
    { id: 15, name: 'Coco', price: 1000, img: 'assets/img/coco.jpeg', stock: 70 },
    { id: 16, name: 'Aguacate', price: 1200, img: 'assets/img/aguacate.jpeg', stock: 50 },
    { id: 17, name: 'Piña', price: 900, img: 'assets/img/pina.jpeg', stock: 80 },
    { id: 18, name: 'Fresa', price: 1500, img: 'assets/img/fresa.jpeg', stock: 60 },
    { id: 19, name: 'Limon', price: 1000, img: 'assets/img/limon.jpeg', stock: 90 },
    { id: 20, name: 'Cereza', price: 1200, img: 'assets/img/cereza.jpeg', stock: 40 },
    { id: 21, name: 'Ciruela', price: 900, img: 'assets/img/ciruela.jpeg', stock: 70 },
    { id: 22, name: 'Frambuesa', price: 1500, img: 'assets/img/frambuesa.jpeg', stock: 50 },
    { id: 23, name: 'Melocoton', price: 1000, img: 'assets/img/melocoton.jpeg', stock: 80 }
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

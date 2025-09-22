import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoCardComponent } from '../../components/producto-card/producto-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductoCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  destacados = [
    { id:1, name:'Manzana', price:1200, img:'assets/img/manzana.jpeg' },
    { id:2, name:'Banano', price:800, img:'assets/img/banano.jpeg' },
    { id:3, name:'Naranja', price:900, img:'assets/img/naranja.jpeg' },
    { id: 9, name: 'Mandarina', price: 900, img: 'assets/img/mandarina.jpeg'},
    { id: 10, name: 'Papaya', price: 1500, img: 'assets/img/papaya.jpeg'},
    { id: 11, name: 'Platano', price: 1000, img: 'assets/img/platano.jpeg'},
    { id: 12, name: 'Durazno', price: 1200, img: 'assets/img/durazno.jpeg'},
    { id: 13, name: 'Uva', price: 900, img: 'assets/img/uva.jpeg'}
  ];
}

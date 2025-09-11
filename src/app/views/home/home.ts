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
    { id:3, name:'Naranja', price:900, img:'assets/img/naranja.jpeg' }
  ];
}

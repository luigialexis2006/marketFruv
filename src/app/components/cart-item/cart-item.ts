import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.css']
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() remove = new EventEmitter<number>();
  @Output() qtyChange = new EventEmitter<number>();

  dec() {
    if (this.item.qty > 1) this.qtyChange.emit(this.item.qty - 1);
    else this.remove.emit(this.item.id);
  }
  inc() { this.qtyChange.emit(this.item.qty + 1); }
}

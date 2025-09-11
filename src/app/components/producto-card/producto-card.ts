import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.html',
  styleUrls: ['./producto-card.css']
})
export class ProductoCardComponent {
  @Input() producto!: { id:number; name:string; price:number; img?:string; stock?:number };
  @Output() add = new EventEmitter<any>();
  @Output() view = new EventEmitter<number>();

  onAdd(){ this.add.emit(this.producto); }
  onView(){ this.view.emit(this.producto.id); }
}

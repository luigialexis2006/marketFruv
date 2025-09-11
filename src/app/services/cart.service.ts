// src/app/services/cart.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // --- Signals (estado "fuente de la verdad")
  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly(); // para consumo con signals: items()

  // Totales como computed (para uso con signals: total(), count())
  total = computed(() => this._items().reduce((acc, it) => acc + it.price * it.qty, 0));
  count = computed(() => this._items().reduce((acc, it) => acc + it.qty, 0));

  // --- Capa de compatibilidad: Observables (para async pipe o código RxJS)
  private _items$ = new BehaviorSubject<CartItem[]>(this._items());
  items$ = this._items$.asObservable();

  private _total$ = new BehaviorSubject<number>(this.total());
  total$ = this._total$.asObservable();

  private _count$ = new BehaviorSubject<number>(this.count());
  count$ = this._count$.asObservable();

  constructor() {
    // Efecto: cada vez que cambien las signals, actualizamos los BehaviorSubjects
    effect(() => {
      const currentItems = this._items();
      // next solo si cambió (BehaviorSubject manejará igualdad básica)
      this._items$.next(currentItems);
      // actualizar totales
      this._total$.next(this.total());
      this._count$.next(this.count());
    });
  }

  // --- Operaciones mutadoras (misma API que ya tienes)
  addItem(item: CartItem) {
    const items = [...this._items()];
    const idx = items.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], qty: items[idx].qty + item.qty };
    } else {
      items.push({ ...item });
    }
    this._items.set(items);
  }

  removeItem(id: number) {
    this._items.set(this._items().filter(i => i.id !== id));
  }

  updateQty(id: number, qty: number) {
    if (qty <= 0) {
      this.removeItem(id);
      return;
    }
    this._items.set(this._items().map(i => i.id === id ? { ...i, qty } : i));
  }

  clear() {
    this._items.set([]);
  }

  // --- Helpers (si necesitas snapshot puntual)
  snapshotItems(): CartItem[] { return this._items(); }
  snapshotTotal(): number { return this.total(); }
  snapshotCount(): number { return this.count(); }
}

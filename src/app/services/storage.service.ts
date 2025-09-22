import { Injectable, signal, Signal } from '@angular/core';

export interface Product { id: string; name: string; price: number; image?: string; stock?: number; }
export interface CartItem { productId: string; quantity: number; }
export interface Cart { id: string; items: CartItem[]; total: number; status: string; createdAt: string; }
export interface User { id: string; name: string; email: string; role: string; active: boolean; }

const STORAGE_KEYS = {
  PRODUCTS: 'mf_products',
  CARTS: 'mf_carts',
  USERS: 'mf_users'
};

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _products = signal<Product[]>([]);
  private _carts = signal<Cart[]>([]);
  private _users = signal<User[]>([]);

  readonly products: Signal<Product[]> = this._products;
  readonly carts: Signal<Cart[]> = this._carts;
  readonly users: Signal<User[]> = this._users;

  constructor() {
    this.loadInitialData();
    window.addEventListener('storage', ev => this.onStorageEvent(ev));
  }

  private loadInitialData() {
    const p = this.loadFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS) ?? this.seedProducts();
    const c = this.loadFromStorage<Cart[]>(STORAGE_KEYS.CARTS) ?? this.seedCarts();
    const u = this.loadFromStorage<User[]>(STORAGE_KEYS.USERS) ?? this.seedUsers();

    this._products.set(p);
    this._carts.set(c);
    this._users.set(u);

    this.saveToStorage(STORAGE_KEYS.PRODUCTS, p);
    this.saveToStorage(STORAGE_KEYS.CARTS, c);
    this.saveToStorage(STORAGE_KEYS.USERS, u);
  }

  private loadFromStorage<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : null;
    } catch (e) {
      console.error('loadFromStorage error', e);
      return null;
    }
  }

  private saveToStorage(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('saveToStorage error', e);
    }
  }

  private onStorageEvent(ev: StorageEvent) {
    if (!ev.key) return;
    if (ev.key === STORAGE_KEYS.PRODUCTS) {
      this._products.set(ev.newValue ? JSON.parse(ev.newValue) : []);
    } else if (ev.key === STORAGE_KEYS.CARTS) {
      this._carts.set(ev.newValue ? JSON.parse(ev.newValue) : []);
    } else if (ev.key === STORAGE_KEYS.USERS) {
      this._users.set(ev.newValue ? JSON.parse(ev.newValue) : []);
    }
  }

  private genId(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}${Math.floor(Math.random()*1000)}`;
  }

  private seedProducts(): Product[] {
    return [
      { id: 'p1', name: 'Manzana', price: 1200, image: '', stock: 20 },
      { id: 'p2', name: 'Banano', price: 900, image: '', stock: 30 },
      { id: 'p3', name: 'Naranja', price: 1500, image: '', stock: 15 }
    ];
  }
  private seedCarts(): Cart[] {
    return [{ id: 'c1', items: [{ productId: 'p1', quantity: 2 }], total: 2400, status: 'open', createdAt: new Date().toISOString() }];
  }
  private seedUsers(): User[] {
    return [{ id: 'u1', name: 'William', email: 'will@example.com', role: 'admin', active: true }];
  }

  // PRODUCTS
  getProductsSnapshot() { return this._products(); }
  createProduct(payload: Partial<Product>) {
    const list = this.getProductsSnapshot();
    const newP: Product = {
      id: this.genId('p'),
      name: payload.name ?? 'Sin nombre',
      price: Number(payload.price ?? 0),
      image: payload.image ?? '',
      stock: Number(payload.stock ?? 0)
    };
    const next = [...list, newP];
    this._products.set(next);
    this.saveToStorage(STORAGE_KEYS.PRODUCTS, next);
    return newP;
  }
  updateProduct(id: string, patch: Partial<Product>) {
    const list = this.getProductsSnapshot();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...patch };
    const next = [...list];
    next[idx] = updated;
    this._products.set(next);
    this.saveToStorage(STORAGE_KEYS.PRODUCTS, next);
    return updated;
  }
  deleteProduct(id: string) {
    const list = this.getProductsSnapshot();
    const next = list.filter(p => p.id !== id);
    this._products.set(next);
    this.saveToStorage(STORAGE_KEYS.PRODUCTS, next);
    return true;
  }

  // CARTS
  getCartsSnapshot() { return this._carts(); }
  createCart(items: CartItem[] = []) {
    const list = this.getCartsSnapshot();
    const total = this.computeTotal(items);
    const cart: Cart = { id: this.genId('c'), items, total, status: 'open', createdAt: new Date().toISOString() };
    const next = [...list, cart];
    this._carts.set(next);
    this.saveToStorage(STORAGE_KEYS.CARTS, next);
    return cart;
  }
  updateCart(id: string, patch: Partial<Cart>) {
    const list = this.getCartsSnapshot();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...patch };
    if (patch.items) updated.total = this.computeTotal(updated.items);
    const next = [...list];
    next[idx] = updated;
    this._carts.set(next);
    this.saveToStorage(STORAGE_KEYS.CARTS, next);
    return updated;
  }
  deleteCart(id: string) {
    const list = this.getCartsSnapshot();
    const next = list.filter(c => c.id !== id);
    this._carts.set(next);
    this.saveToStorage(STORAGE_KEYS.CARTS, next);
    return true;
  }
  private computeTotal(items: CartItem[]) {
    if (!items?.length) return 0;
    const prods = this.getProductsSnapshot();
    return items.reduce((sum, it) => {
      const p = prods.find(x => x.id === it.productId);
      return sum + ((p?.price ?? 0) * it.quantity);
    }, 0);
  }

  // USERS
  getUsersSnapshot() { return this._users(); }
  updateUser(id: string, patch: Partial<User>) {
    const list = this.getUsersSnapshot();
    const idx = list.findIndex(u => u.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...patch };
    const next = [...list];
    next[idx] = updated;
    this._users.set(next);
    this.saveToStorage(STORAGE_KEYS.USERS, next);
    return updated;
  }
  deleteUser(id: string) {
    const list = this.getUsersSnapshot();
    const next = list.filter(u => u.id !== id);
    this._users.set(next);
    this.saveToStorage(STORAGE_KEYS.USERS, next);
    return true;
  }
}

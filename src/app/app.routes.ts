// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './views/home/home'; // si tu Home exporta 'Home'
import { ProductosComponent } from './views/productos/productos';
import { ProductoDetail } from './views/producto-detail/producto-detail';
import { Carrito } from './views/carrito/carrito';
import { Checkout } from './views/checkout/checkout';
import { AdminDashboard } from './views/admin-dashboard/admin-dashboard';
import { Profile } from './views/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'productos', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoDetail },
  { path: 'carrito', component: Carrito },
  { path: 'checkout', component: Checkout },
  { path: 'admin', component: AdminDashboard },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: '' }
];

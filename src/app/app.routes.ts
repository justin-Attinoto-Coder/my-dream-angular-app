import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'customers', loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent) },
  { path: 'orders/:id', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
  { path: '**', redirectTo: '' }
];

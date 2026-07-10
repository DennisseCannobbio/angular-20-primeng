import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sandbox',
    loadComponent: () => import('./pages/sandbox/sandbox').then(m => m.Sandbox)
  }
];

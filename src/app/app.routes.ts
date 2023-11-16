import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.routing').then(m => m.routes) },
  { path: 'heroes', loadChildren: () => import('./heroes/heroes.routing').then(m => m.routes) },
  { path: '404', loadComponent: () => import('./templates/pages/error404-page/error404-page.component').then(m => m.Error404PageComponent)},
  { path: '**', redirectTo: '404' },
];

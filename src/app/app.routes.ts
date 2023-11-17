import { Routes } from '@angular/router';
import { canActivateAuth, canMatchAuth, isAuthenticatedAuth } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routing').then(m => m.routes),
    canActivate: [isAuthenticatedAuth],
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.routing').then(m => m.routes),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth],
  },
  { path: '404', loadComponent: () => import('./templates/pages/error404-page/error404-page.component').then(m => m.Error404PageComponent)},
  { path: '**', redirectTo: '404' },
];

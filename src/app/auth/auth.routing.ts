import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../templates/pages/auth-app/auth-app.component').then(m => m.AuthAppComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent) },
      { path: 'new-account', loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent) },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

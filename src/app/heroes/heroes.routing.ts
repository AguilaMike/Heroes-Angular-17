import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../templates/pages/main-app/main-app.component').then(m => m.MainAppComponent),
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'search', loadComponent: () => import('./pages/search-page/search-page.component').then(m => m.SearchPageComponent) },
      { path: 'list', loadComponent: () => import('./pages/list-page/list-page.component').then(m => m.ListPageComponent) },
      { path: 'new-hero', loadComponent: () => import('./pages/new-page/new-page.component').then(m => m.NewPageComponent) },
      { path: 'edit/:id', loadComponent: () => import('./pages/new-page/new-page.component').then(m => m.NewPageComponent) },
      /** This path is a comodin, and it needs to be defined at the last of the paths because other paths represented under don't work because they responded successfully and enter this path. */
      { path: ':id', loadComponent: () => import('./pages/hero-page/hero-page.component').then(m => m.HeroPageComponent) },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

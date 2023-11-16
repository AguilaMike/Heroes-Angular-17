import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./templates/pages/main-app/main-app.component').then(m => m.MainAppComponent),
    children: [
      { path: '', redirectTo: 'pipes', pathMatch: 'full' },
      { path: '**', redirectTo: 'heroes'},
    ],
  },
  { path: '**', redirectTo: '' },
];

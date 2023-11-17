import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

import { MATERIAL_MODULES } from '@app-angular-material';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  standalone: true,
  imports: [NgStyle, RouterOutlet, RouterLink, ...MATERIAL_MODULES],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.scss'
})
export class MainAppComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'list', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  get user(): User | null {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}

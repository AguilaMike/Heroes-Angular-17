import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MATERIAL_MODULES } from '@app-angular-material';

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
  ]
}

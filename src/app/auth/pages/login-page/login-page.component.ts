import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MATERIAL_MODULES } from '@app-angular-material';

@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {}

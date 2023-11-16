import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MATERIAL_MODULES } from '@app-angular-material';

@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {}

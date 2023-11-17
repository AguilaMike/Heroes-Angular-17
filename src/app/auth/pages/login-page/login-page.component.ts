import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MATERIAL_MODULES } from '@app-angular-material';

@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES, RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  public email = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogin(): void {
    this.authService.login(this.email, '123456')
      .subscribe(user => this.router.navigate(['/']));
  }
}

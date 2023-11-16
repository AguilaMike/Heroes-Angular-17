import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-app.component.html',
  styleUrl: './auth-app.component.scss'
})
export class AuthAppComponent {}

import { inject } from '@angular/core';
import { Router, type CanMatchFn, type CanActivateFn } from '@angular/router';
import { Observable, tap, of, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

function checkAuthStatus(): Observable<boolean> {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          authService.logout();
          router.navigate(['/auth/login']);
        }
      }));
}

function checkIsAuthenticated(): Observable<boolean> {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      map(isAuthenticated => !isAuthenticated),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['/']);
        }
      }),
      );
}


export const canMatchAuth: CanMatchFn = (route, segments) => {
  return checkAuthStatus();
};

export const canActivateAuth: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

export const isAuthenticatedAuth: CanActivateFn = (route, state) => {
  return checkIsAuthenticated();
};

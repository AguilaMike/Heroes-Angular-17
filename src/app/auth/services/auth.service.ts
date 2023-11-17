import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | null {
    if (!this.user) {
      const user = localStorage.getItem('token');
      if (!user) {
        return null;
      }
      this.user = JSON.parse(atob(user)) as User;
    }
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // return this.http.post<User>(`${this.baseUrl}/auth/login`, { email, password });
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = { ...user, email }),
        tap(user => localStorage.setItem('token', btoa(JSON.stringify(user))))
      );
  }

  checkAuthentication(): Observable<boolean> {
    if (this.currentUser) {
      return of(true);
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    const user = JSON.parse(atob(token)) as User;
    return this.http.get<User>(`${this.baseUrl}/users/${user.id}`)
      .pipe(
        tap(user => this.user = { ...user, email: user.email }),
        map(user => !!user),
        catchError(() => of(false))
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById(id: string):Observable<Hero | undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(catchError(err => of(undefined)));
  }

  getSuggestions(term: string):Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ term }&_limit=6`);
  }

  addHero(hero: Hero):Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
  }

  updateHero(hero: Hero):Observable<Hero> {
    if (!hero.id) {
      throw new Error('updateHero: id is required');
    }
    return this.http.put<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }

  deleteHero(id: string):Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }
}

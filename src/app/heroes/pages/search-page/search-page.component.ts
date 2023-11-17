import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MATERIAL_MODULES } from '@app-angular-material';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/Heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, JsonPipe, ...MATERIAL_MODULES],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero: Hero | undefined;

  constructor(private heroesService: HeroesService) {}

  searchHero(): void {
    const term: string = this.searchInput.value || '';
    this.heroesService.getSuggestions(term).subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}

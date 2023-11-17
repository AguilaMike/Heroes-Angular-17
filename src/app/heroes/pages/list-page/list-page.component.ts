import { Component, OnInit } from '@angular/core';

import { MATERIAL_MODULES } from '@app-angular-material';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/Heroes.service';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';

@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES, HeroCardComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroServices: HeroesService) {}

  ngOnInit(): void {
    this.heroServices.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}

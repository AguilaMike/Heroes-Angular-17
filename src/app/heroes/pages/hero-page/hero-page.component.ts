import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/Heroes.service';
import { HeroImagePipe } from '../../pipes/heroImage.pipe';
import { MATERIAL_MODULES } from '@app-angular-material';


@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES, RouterLink, HeroImagePipe],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss'
})
export class HeroPageComponent implements OnInit {
  public hero!: Hero;

  constructor(
    private heroServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroServices.getHeroById(id)))
      .subscribe(hero => {
        if (!hero) {
          return this.router.navigateByUrl('/heroes/list');
        }
        this.hero = hero;
        return;
      });
  }
}

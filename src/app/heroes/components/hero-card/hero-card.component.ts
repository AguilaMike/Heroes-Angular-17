import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

import { MATERIAL_MODULES } from '@app-angular-material';
import { Hero } from '../../interfaces/hero.interface';
import { HeroImagePipe } from '../../pipes/heroImage.pipe';

@Component({
  selector: 'heroes-hero-card',
  standalone: true,
  imports: [...MATERIAL_MODULES, SlicePipe, RouterLink, HeroImagePipe],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent implements OnInit {
  @Input() public hero!: Hero;

  ngOnInit(): void {
    if (!this.hero) {
      throw new Error('HeroCardComponent: hero is required');
    }
  }
}

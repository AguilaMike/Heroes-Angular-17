import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/Heroes.service';
import { HeroImagePipe } from '../../pipes/heroImage.pipe';
import { MATERIAL_MODULES } from '@app-angular-material';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES, HeroImagePipe, ReactiveFormsModule],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss'
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publisher = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  constructor(
    private heroServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroServices.getHeroById(id)))
      .subscribe(hero => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }
        this.heroForm.reset(hero);
        return;
      });

  }

  get currentHero(): Hero {
    const hero: Hero = this.heroForm.value as Hero;
    return hero;
  }

  onSumit() {
    if (this.heroForm.invalid) {
      return;
    }
    // this.heroeServices.addHero(this.currentHero);
    if (this.currentHero.id) {
      this.heroServices.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`${hero.superhero} updated!`);
        });
        return;
    } else {
      this.heroServices.addHero(this.currentHero)
        .subscribe(hero => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar(`${hero.superhero} created!`);
        });
        return;
    }
  }

  onDeleteHero(): void {
    if (!this.currentHero.id) {
      throw new Error('Hero ID is required');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroServices.deleteHero(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
        this.showSnackBar(`${this.currentHero.superhero} deleted!`);
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   const id = result;
    //   if (id) {
    //     this.heroServices.deleteHero(id)
    //       .subscribe(wasDeleted => {
    //         if (wasDeleted) {
    //           this.router.navigate(['/heroes']);
    //           this.showSnackBar(`${this.currentHero.superhero} deleted!`);
    //         }
    //       });
    //   }
    // });
  }

  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500
    });
  }

}

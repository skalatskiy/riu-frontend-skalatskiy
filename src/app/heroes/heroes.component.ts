import { HeroesService } from './services/heroes.service';
import { Component, effect, inject } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Hero } from './schemas/hero.interface';
import { MatListModule } from '@angular/material/list';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-heroes',
  imports: [MatListModule, MatPaginatorModule, HeroCardComponent, MatButtonModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  
  pagedHeroes: Hero[] = [];
  pagination: PageEvent = {
    length: 50,
    pageSize: 2,
    pageIndex: 0
  }

  private heroesService: HeroesService = inject(HeroesService);

  constructor(private dialog: MatDialog) {
    effect(() => {
      if (this.heroesService.heroes()) {
        this.getPagedHeroes();
      }
    })
  }

  ngOnInit() {
    this.getPagedHeroes();
  }

  onPageChange(pageEvent: PageEvent) {
    this.pagination = {
      length: pageEvent.length,
      pageSize: pageEvent.pageSize,
      pageIndex: pageEvent.pageIndex
    }

    this.getPagedHeroes();
  }

  openHeroForm() {
    this.dialog.open(HeroFormComponent);
  }

  private getPagedHeroes() {
    this.pagedHeroes = this.heroesService.getPagedHeroes(this.pagination);
    this.pagination.length = this.heroesService.heroes().length;
  }
}

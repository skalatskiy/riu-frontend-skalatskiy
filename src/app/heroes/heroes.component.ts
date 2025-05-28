import { HeroesService } from './services/heroes.service';
import { Component, inject } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Hero } from './schemas/hero.interface';
import { MatListModule } from '@angular/material/list';
import { HeroCardComponent } from './hero-card/hero-card.component';

@Component({
  selector: 'app-heroes',
  imports: [MatListModule, MatPaginatorModule, HeroCardComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  
  heroes: Hero[] = [];
  pagination: PageEvent = {
    length: 50,
    pageSize: 1,
    pageIndex: 0
  }

  private heroesService: HeroesService = inject(HeroesService);

  ngOnInit() {
    console.log('HeroesComponent');
    this.initHeroes();
  }

  onPageChange(pageEvent: PageEvent) {
    this.pagination = {
      length: pageEvent.length,
      pageSize: pageEvent.pageSize,
      pageIndex: pageEvent.pageIndex
    }

    this.heroes = this.heroesService.getPagedHeroes(pageEvent);
  }

  private initHeroes() {
    this.heroes = this.heroesService.getHeroes();
    this.pagination.length = this.heroes.length;
  }
}

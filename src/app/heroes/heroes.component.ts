import { HeroesService } from './services/heroes.service';
import { Component, effect, inject } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Hero } from './schemas/hero.interface';
import { MatListModule } from '@angular/material/list';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const initialPagination: PageEvent = {
  length: 50,
  pageSize: 2,
  pageIndex: 0
}

@Component({
  selector: 'app-heroes',
  imports: [
    ReactiveFormsModule,
    FormsModule, 
    HeroCardComponent, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatListModule, 
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  
  pagedHeroes: Hero[] = [];
  pagination: PageEvent = initialPagination;

  searchForm = new FormGroup({
    searchControl: new FormControl()
  });

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

  onSearch(valueToSearch: string) {
    this.pagedHeroes = this.heroesService.searchByName(valueToSearch, initialPagination);
    this.pagination.length = this.pagedHeroes.length;
  }

  clearSearch() {
    this.searchForm.reset();
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

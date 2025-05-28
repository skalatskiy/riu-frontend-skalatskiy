import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../../schemas/hero.interface';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { DeleteHeroComponent } from '../delete-hero/delete-hero.component';

const defaultImageUrl = "https://www.shutterstock.com/image-vector/generic-superhero-figure-standing-proud-260nw-303136100.jpg";

@Component({
  selector: 'app-hero-card',
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;

  private readonly router = inject(Router); 

  constructor(private dialog: MatDialog) {}

  getHeroImage(hero: Hero): string {
    return hero.imageUrl || defaultImageUrl;
  }

  goToDetails(hero: Hero) {
    this.router.navigateByUrl(`/heroes/${hero.id}`);
  }

  openEdit(hero: Hero) {
    this.dialog.open(HeroFormComponent, {data: hero});
  }

  deleteHero(hero: Hero) {
    this.dialog.open(DeleteHeroComponent, {data: hero});
  }
}

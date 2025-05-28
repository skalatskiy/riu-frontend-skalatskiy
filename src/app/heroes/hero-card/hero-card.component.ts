import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Hero } from '../schemas/hero.interface';
import { MatCardModule } from '@angular/material/card';

const defaultImageUrl = "https://material.angular.dev/assets/img/examples/shiba2.jpg";

@Component({
  selector: 'app-hero-card',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;

  getHeroImage(hero: Hero): string {
    return hero.imageUrl || defaultImageUrl;
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../schemas/hero.interface';

@Component({
  selector: 'app-hero-page',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent {

  hero!: Hero | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router); 
  private heroesService: HeroesService = inject(HeroesService);

  ngOnInit() {
    this.initHeroData();
  }

  ngOnDestroy() {
    this.hero = undefined;
  }
  
  onBack() {
    this.router.navigateByUrl(`/heroes`);
  }

  private initHeroData() {
    const heroId = this.route.snapshot.paramMap.get('heroId');

    if(heroId) {
      this.hero = this.heroesService.getHero(heroId);
    } else {
      throw new Error('No user found with this ID');
    }
  }
}

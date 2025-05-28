import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroPageComponent } from './heroes/hero-page/hero-page.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: "heroes/:heroId", component: HeroPageComponent },
];

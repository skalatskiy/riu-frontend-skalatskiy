import { Routes } from '@angular/router';
import { HeroPageComponent } from './heroes/components/hero-page/hero-page.component';
import { HeroesComponent } from './heroes/heroes.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: "heroes/:heroId", component: HeroPageComponent },
];

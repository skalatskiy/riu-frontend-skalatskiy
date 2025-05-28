import { Injectable, signal, Signal } from "@angular/core";
import { Hero } from "../schemas/hero.interface";
import { PageEvent } from "@angular/material/paginator";

const dummyHeroes: Hero[] = [
    {
        name: "Pacoman",
        superpower: "humor",
        description: "Te mata de risa",
        alive: true
    },
    {
        name: "Spideman",
        superpower: "Spider strength",
        description: "Saca telaraña de sitios dudosos",
        alive: true
    }
];

@Injectable({
    providedIn: 'root'
  })
  export class HeroesService {
    heroes: Signal<Hero[]> = signal(dummyHeroes);

    getHeroes(): Hero[] {
        return this.heroes();
    }

    getPagedHeroes(pageEvent: PageEvent): Hero[] {
        const startIndex = (pageEvent.pageIndex) * pageEvent.pageSize;
        const endIndex = startIndex + pageEvent.pageSize;
        
        return [...this.heroes().slice(startIndex, endIndex)];
    }
  }
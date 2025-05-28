import { Injectable, signal, WritableSignal } from "@angular/core";
import { Hero } from "../schemas/hero.interface";
import { PageEvent } from "@angular/material/paginator";
import { Observable, of } from "rxjs";

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
    heroes: WritableSignal<Hero[]> = signal(dummyHeroes);

    getPagedHeroes(pageEvent: PageEvent): Hero[] {
        const startIndex = (pageEvent.pageIndex) * pageEvent.pageSize;
        const endIndex = startIndex + pageEvent.pageSize;
        
        return [...this.heroes().slice(startIndex, endIndex)];
    }

    createNewHero(newHero: Hero): Observable<boolean> {
        this.heroes.update(heroes => {
            return [...heroes, newHero];
        });

        return of(true);
    }
  }
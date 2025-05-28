import { Injectable, signal, WritableSignal } from "@angular/core";
import { Hero } from "../schemas/hero.interface";
import { PageEvent } from "@angular/material/paginator";
import { Observable, of } from "rxjs";

const dummyHeroes: Hero[] = [
    {
        id: 'dummy1',
        name: "Pacoman",
        superpower: "humor",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Lucas-Paco-Mariano.jpg",
        description: "Te mata de risa",
        alive: true
    },
    {
        id: 'dummy2',
        name: "Spideman",
        superpower: "Spider strength",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9dEhbjgmjNQc_JAJJYvv4waAPpHilh4Ps8A&s",
        description: "Saca telaraña de sitios dudosos",
        alive: false
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

    searchByName(valueToSearch: string, pageEvent: PageEvent): Hero[] {
        const filteredHeroes = this.heroes().filter((hero) => hero.name.toLowerCase().includes(valueToSearch.toLowerCase()));
        const startIndex = (pageEvent.pageIndex) * pageEvent.pageSize;
        const endIndex = startIndex + pageEvent.pageSize;
        
        return [...filteredHeroes.slice(startIndex, endIndex)];
    }

    createNewHero(newHero: Hero): Observable<boolean> {
        this.heroes.update(heroes => {
            return [...heroes, newHero];
        });

        return of(true);
    }

    getHero(heroId: string): Hero | undefined {
        return this.heroes().find((hero) => {
            return hero.id === heroId;
        });
    }

    editHero(heroId: string, newHeroData: Hero): Observable<boolean>  {
        newHeroData.id = heroId;

        const heroes = this.heroes();
        const indexToUpdate = heroes.findIndex((hero) => hero.id === heroId);
        heroes[indexToUpdate] = newHeroData;

        this.heroes.set([...heroes]);

        return of(true);
    }
  }
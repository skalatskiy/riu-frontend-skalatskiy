import { PageEvent } from "@angular/material/paginator";
import { Hero } from "../schemas/hero.interface";
import { HeroesService } from "./heroes.service";
import { signal } from "@angular/core";

const generateMockHeroes = (wantedHeroes: number): Hero[] => {
    const generatedHeroes: Hero[] = [];

    for(let i = 0; i < wantedHeroes; i++) {
        generatedHeroes.push({
            name: `Hero name ${i}`,
            superpower: `Hero superpower ${i}`,
            alive: false
        })
    }

    return generatedHeroes;
}

  describe('Heroes Service', () => {
    let service: HeroesService;

    beforeEach(() => {
      service = new HeroesService();
      const generatedHeroes = signal<Hero[]>(generateMockHeroes(100));
      service.heroes = generatedHeroes;
    });

    it('getPagedHeroes should return a sliced array of heroes', () => {
        const expectedPageLength = 7;
        const mockPageEvent: PageEvent = {
            pageIndex: 2,
            pageSize: expectedPageLength,
            length: 100
        };

        expect(service.getPagedHeroes(mockPageEvent)).toEqual(jasmine.any(Array<Hero>));
        expect(service.getPagedHeroes(mockPageEvent).length).toEqual(expectedPageLength);
      });
  });
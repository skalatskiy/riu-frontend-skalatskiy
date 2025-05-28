import { PageEvent } from "@angular/material/paginator";
import { Hero } from "../schemas/hero.interface";
import { HeroesService } from "./heroes.service";
import { TestBed } from "@angular/core/testing";

const generateMockHeroes = (wantedHeroes: number): Hero[] => {
    const generatedHeroes: Hero[] = [];

    for(let i = 0; i < wantedHeroes; i++) {
        generatedHeroes.push({
            id: `hero-id-${i}`,
            name: `Hero name ${i}`,
            superpower: `Hero superpower ${i}`,
            alive: false
        })
    }

    return generatedHeroes;
}

const expectedHeroes = 12;

  describe('Heroes Service', () => {
    let service: HeroesService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(HeroesService);
      service.heroes.set([...generateMockHeroes(expectedHeroes)]);
    });

    it('should return paged heroes', () => {
      const page: PageEvent = { length: expectedHeroes, pageSize: 3, pageIndex: 1 };
      const result = service.getPagedHeroes(page);
      expect(result.length).toBe(3);
      expect(result[0].id).toBe('hero-id-3');
      expect(result[1].id).toBe('hero-id-4');
      expect(result[2].id).toBe('hero-id-5');
    });

    it('should search heroes by name', () => {
      const page: PageEvent = { length: expectedHeroes, pageSize: 20, pageIndex: 0 };
      const result = service.searchByName('name 1', page);
      expect(result.length).toBe(3);
      expect(result[0].name).toBe('Hero name 1');
      expect(result[1].name).toBe('Hero name 10');
      expect(result[2].name).toBe('Hero name 11');
    });

    it('should retrieve a hero by ID', () => {
      const hero = service.getHero('hero-id-2');
      expect(hero?.name).toBe('Hero name 2');
    });

    it('should create a new hero', (done) => {
      const newHero: Hero = {
        id: 'created-hero-1',
        name: 'Super new hero',
        superpower: 'Always been new',
        imageUrl: '',
        description: '',
        alive: true
      };

      service.createHero(newHero).subscribe(success => {
        expect(success).toBeTrue();
        expect(service.heroes().length).toBe(expectedHeroes + 1);
        expect(service.getHero('created-hero-1')).toEqual(newHero);
        done();
      });
    });

    it('should edit an existing hero', (done) => {
      const updatedHero: Hero = {
        id: '',
        name: 'Super changing hero',
        superpower: 'Always been updated',
        imageUrl: '',
        description: 'Dead by updates',
        alive: false
      };
  
      service.updateHero('hero-id-2', updatedHero).subscribe(success => {
        expect(success).toBeTrue();
        expect(service.heroes().length).toBe(expectedHeroes);
        const hero = service.getHero('hero-id-2');
        expect(hero?.name).toBe('Super changing hero');
        expect(hero?.superpower).toBe('Always been updated');
        done();
      });
    });

    it('should delete a hero', (done) => {
      service.deleteHero('hero-id-1').subscribe(success => {
        expect(success).toBeTrue();
        expect(service.getHero('hero-id-1')).toBeUndefined();
        expect(service.heroes().length).toBe(expectedHeroes - 1);
        done();
      });
    });
  });
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardComponent } from './hero-card.component';
import { Hero } from '../../schemas/hero.interface';

const dummyHero: Hero = {
  id: "superdummy",
  name: "Dummy hero",
  superpower: "test powers",
  alive: true
}

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    component.hero = dummyHero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getHeroImage should return a valid string', () => {
    expect(component.getHeroImage(dummyHero)).toEqual(jasmine.any(String));
  });
});

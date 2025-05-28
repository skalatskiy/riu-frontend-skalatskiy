import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { Hero } from './schemas/hero.interface';
import { HeroesService } from './services/heroes.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

const MockHeroes: Hero[] = [
  { id: 'id-1', name: 'Batman', superpower: 'Super rich' },
  { id: 'id-2', name: 'Superman', superpower: 'Super all'},
  { id: 'id-3', name: 'Wonder Woman', superpower: 'Super wonder'}
];

const MockInitialPagination: PageEvent = {
  length: 50,
  pageSize: 2,
  pageIndex: 0
}

function fakeSearchByNameFn(valueToSearch: string) {
  return MockHeroes.filter((hero) => hero.name.toLowerCase().includes(valueToSearch.toLowerCase()))
}

class MockHeroesService {
  heroes = () => MockHeroes;
  getPagedHeroes = jasmine.createSpy().and.returnValue(MockHeroes.slice(0, 2));
  searchByName = jasmine.createSpy().and.callFake(fakeSearchByNameFn);
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HeroesComponent],
      providers: [
        { provide: HeroesService, useClass: MockHeroesService },
        { provide: MatDialog, useValue: mockDialog },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init, should initialize pagedHeroes', () => {
    expect(component.pagedHeroes.length).toBe(MockInitialPagination.pageSize);
  });
  
  it('on page change, should update pagination and call getPagedHeroes', () => {
    component.onPageChange({ length: 3, pageSize: 2, pageIndex: 0 });
    expect(component.pagination.pageIndex).toBe(0);
    expect(component.pagedHeroes.length).toBe(2);
  });

  it('on search, should filter heroes', () => {
    component.onSearch('bat');
    expect(component.pagedHeroes.length).toBe(1);
    expect(component.pagedHeroes[0].name).toBe('Batman');
  });

  it('on clear search, should clear search input and reload heroes', () => {
    spyOn(component as any, 'getPagedHeroes');
    component.clearSearch();
    expect(component.searchForm.value?.searchControl).toBeNull();
    expect((component as any).getPagedHeroes).toHaveBeenCalled();
  });

  it('clicking on Add a new hero, should open a dialog with HeroFormComponent', () => {
    component.openHeroForm();
    expect(mockDialog.open).toHaveBeenCalledWith(HeroFormComponent);
  });
});

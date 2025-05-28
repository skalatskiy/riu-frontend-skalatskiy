import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

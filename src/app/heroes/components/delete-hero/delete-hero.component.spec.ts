import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteHeroComponent } from './delete-hero.component';

describe('DeleteHeroComponent', () => {
  let component: DeleteHeroComponent;
  let fixture: ComponentFixture<DeleteHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

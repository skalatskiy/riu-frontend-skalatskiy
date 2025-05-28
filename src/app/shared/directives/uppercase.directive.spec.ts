import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective],
  template: `<input type="text" [formControl]="control" uppercase>`
})
class TestComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();
  });

  it('should convert the input value to uppercase and update FormControl', () => {
    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
    const component: TestComponent = fixture.componentInstance;
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'superman';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('SUPERMAN');
    expect(component.control.value).toBe('SUPERMAN');
  });
});

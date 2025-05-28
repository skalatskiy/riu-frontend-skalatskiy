import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const upperCase = value.toUpperCase();
    this.ngControl.control?.setValue(upperCase, { emitEvent: false });
  }
}

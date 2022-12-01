import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective {

  constructor(private el: ElementRef) { }
  public focus(): void {
    (this.el.nativeElement as HTMLInputElement).focus();
  }

}

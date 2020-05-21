import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private rd: Renderer2) { 
    this.rd.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }  

}

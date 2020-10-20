import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({

  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }
  @Input() defaultColor: string;

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.defaultColor || this.highlightColor || 'tomato', 'white');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight(null, 'black');
  }

  private highlight(color: string, textColor: string): void{
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = textColor;

}

}

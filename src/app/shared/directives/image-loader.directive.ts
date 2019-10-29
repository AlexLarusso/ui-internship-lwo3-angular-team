import {
  ElementRef,
  EventEmitter,
  Output,
  Directive,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[downloadImage]'
})
export class ImageLoadDirective implements AfterViewInit {
  @Output() public downloadImage = new EventEmitter();

  private observer?: IntersectionObserver;

  constructor(private element: ElementRef) { }

  public ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, { });
    this.observer.observe((this.element.nativeElement));
  }

  private checkIntersecting(entrance: IntersectionObserverEntry) {
    return entrance.isIntersecting &&
    entrance.target === this.element.nativeElement;
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.every((entrance: IntersectionObserverEntry) => {
      if (this.checkIntersecting(entrance)) {
        this.downloadImage.emit();
        this.observer.unobserve((this.element.nativeElement));
        this.observer.disconnect();
      }
    });
  }
}

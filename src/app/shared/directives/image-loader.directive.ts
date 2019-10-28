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

  private observer: IntersectionObserver;

  constructor(private eler: ElementRef) { }

  public ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, { });
    this.observer.observe((this.eler.nativeElement));
  }

  private checkIntersecting(entrance: IntersectionObserverEntry) {
    return entrance.isIntersecting &&
    entrance.target === this.eler.nativeElement;
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.every((entrance: IntersectionObserverEntry) => {
      if (this.checkIntersecting(entrance)) {
        this.downloadImage.emit();
        this.observer.unobserve((this.eler.nativeElement));
        this.observer.disconnect();
      }
    });
  }
}

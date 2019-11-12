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

  public options = {
    root: document.querySelector('.root'),
    rootMargin: '0px',
    threshold: [0, 0.5, 1.0]
  };

  private observer: IntersectionObserver;

  constructor(private element: ElementRef) { }

  public ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entries]) => {
      this.checkForIntersection([entries]);
    }, this.options);

    this.observer.observe(this.element.nativeElement);
  }

  public checkIntersecting(entrance: IntersectionObserverEntry): boolean {
    return entrance.isIntersecting &&
      entrance.target === this.element.nativeElement;
  }

  public checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.every((entrance: IntersectionObserverEntry) => {
      if (this.checkIntersecting(entrance)) {
        this.downloadImage.emit();
        this.observer.unobserve(this.element.nativeElement);
        this.observer.disconnect();
      }
    });
  }
}

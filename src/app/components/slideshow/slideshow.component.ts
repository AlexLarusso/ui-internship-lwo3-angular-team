import {
  Component, OnInit, ViewChild, EventEmitter, ElementRef,
  AfterViewInit, HostListener, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import {
  fromEvent, merge, interval, ObservableInput, Subscription
} from 'rxjs';
import {
  map, scan, startWith, tap, switchMap, takeWhile, throttleTime
} from 'rxjs/operators';

import { slideshowAnimation } from './slideshow.animations';

const images: Array<string> = [
  '../../assets/img/city-daylight.jpg',
  '../../assets/img/city-daylight-fashion.jpeg',
  '../../assets/img/woman-fashion-street-photo.jpg',
  '../../assets/img/bored-boredom-casual.jpg'
];

@AutoUnsubscribe()
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.html',
  styleUrls: ['./slideshow.scss'],
  animations: [slideshowAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('previous', { static: true }) previousEl: ElementRef;
  @ViewChild('next', { static: true }) nextEl: ElementRef;
  @ViewChild('slider', { static: true }) sliderEl: ElementRef;
  @ViewChild('bullet', { static: true }) bulletEl: ElementRef;

  public images: Array<string> = images;
  public currentIndex = 0;
  public currentDirection = 'left';
  public timerSub: ObservableInput<unknown>;
  public clicked = false;
  public isDesktop: boolean;
  public mouseOverSub: Subscription;
  public mouseOutSub: Subscription;
  public mergeSlideshowActions: Subscription;

  private isOnSlider = new EventEmitter<boolean>();

  @HostListener('window:resize', [])
  public onResize(): void {
    this.deviceCheck();
  }

  constructor(private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    const prevModified$ = fromEvent(this.previousEl.nativeElement, 'click').pipe(
      throttleTime(500),
      tap(() => this.stopTimer()),
      map(() => ({ shift: -1, direction: 'right' }))
    );

    const nextModified$ = fromEvent(this.nextEl.nativeElement, 'click').pipe(
      throttleTime(500),
      tap(() => this.stopTimer()),
      map(() => ({ shift: 1, direction: 'left' })),
    );

    this.timerSub = this.isOnSlider.pipe(
      switchMap(isOnSlider =>
        interval(4000).pipe(
          takeWhile(() => isOnSlider && !this.clicked),
          map(() => ({ shift: 1, direction: 'left' }))
        )
      )
    );

    this.mouseOverSub = fromEvent(this.sliderEl.nativeElement, 'mouseover')
      .subscribe(() => this.isOnSlider.emit(false));
    this.mouseOutSub = fromEvent(this.sliderEl.nativeElement, 'mouseout')
      .subscribe(() => this.isOnSlider.emit(true));

    this.mergeSlideshowActions = merge(prevModified$, nextModified$, this.timerSub)
      .pipe(
        startWith({ index: 0 } as any),
        scan((acc, curr) => {
          const projectedIndex = acc.index + curr.shift;

          let adjustedIndex: number;
          if (projectedIndex < 0) {
            adjustedIndex = this.images.length - 1;
          } else if (projectedIndex >= this.images.length) {
            adjustedIndex = 0;
          } else {
            adjustedIndex = projectedIndex;
          }

          return { index: adjustedIndex, direction: curr.direction };
        })
      )
      .subscribe(event => {
        this.currentIndex = event.index;
        this.currentDirection = event.direction;
        this.cdr.detectChanges();
      });
  }

  public ngAfterViewInit(): void {
    const event = new MouseEvent('mouseout', { bubbles: true });

    this.sliderEl.nativeElement.dispatchEvent(event);
    this.deviceCheck();
  }

  public toggleSlide(slideNumber: number): void {
    this.currentDirection = slideNumber < this.currentIndex ? 'right' : 'left';
    this.currentIndex = slideNumber;
  }

  public stopTimer(): void {
    this.clicked = true;
  }

  private deviceCheck(): void {
    this.isDesktop = !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.isOnSlider.emit(this.isDesktop);
  }

  public ngOnDestroy(): void { }
}

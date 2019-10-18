import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';
import {
  fromEvent,
  merge,
  interval,
  ObservableInput
} from 'rxjs';
import {
  map,
  scan,
  startWith,
  tap,
  switchMap,
  takeWhile
} from 'rxjs/operators';
import { slideshowAnimation } from './slideshow.animations';

const images: string[] = [ // TODO: Use syntax Array<string> check everywhere
  '../../assets/img/beauty-casual-curly.jpg',
  '../../assets/img/blazers-daytime-dress.jpg',
  '../../assets/img/bored-boredom-casual.jpg',
  '../../assets/img/city-daylight-diversity.jpg'
];

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.html',
  styleUrls: ['./slideshow.scss'],
  animations: [slideshowAnimation]
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @ViewChild('previous', { static: true }) previousEl: ElementRef;
  @ViewChild('next', { static: true }) nextEl: ElementRef;
  @ViewChild('slider', { static: true }) sliderEl: ElementRef;
  @ViewChild('bullet', { static: true }) bulletEl: ElementRef;

  public images: Array<any> = images;
  public currentIndex = 0;
  public currentDirection = 'left';
  public timerSub: ObservableInput<unknown>;
  public clicked = false;
  public isDesktop: boolean;

  private isOnSlider = new EventEmitter<boolean>();

  @HostListener('window:resize', [])
  public onResize(): void {
    this.deviceCheck();
  }

  public ngOnInit(): void {
    const prevModified$ = fromEvent(this.previousEl.nativeElement, 'click').pipe(
      tap(() => this.stopTimer()),
      map(() => ({ shift: -1, direction: 'right' }))
    );

    const nextModified$ = fromEvent(this.nextEl.nativeElement, 'click').pipe(
      tap(() => this.stopTimer()),
      map(() => ({ shift: 1, direction: 'left' }))
    );

    this.timerSub = this.isOnSlider.pipe(
      switchMap(isOnSlider =>
        interval(4000).pipe(
          takeWhile(() => isOnSlider && !this.clicked),
          map(() => ({ shift: 1, direction: 'left' }))
        )
      )
    );

    fromEvent(this.sliderEl.nativeElement, 'mouseover').subscribe(() => this.isOnSlider.emit(false));
    fromEvent(this.sliderEl.nativeElement, 'mouseout').subscribe(() => this.isOnSlider.emit(true));

    merge(prevModified$, nextModified$, this.timerSub)
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
}

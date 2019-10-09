import { Component, OnInit, ViewChild, AfterContentInit, OnChanges, EventEmitter, ElementRef } from "@angular/core";
import { fromEvent, merge, timer, of, pipe } from "rxjs";
import { map, scan, startWith, tap, takeUntil, switchMap, takeWhile } from "rxjs/operators";
import { slideshowAnimation } from "./slideshow.animations";
import '../../assets/img/beauty-casual-curly.jpg'
import '../../assets/img/blazers-daytime-dress.jpg'
import '../../assets/img/bored-boredom-casual.jpg'
import '../../assets/img/city-daylight-diversity.jpg'

const images: string[] = [
  "../../assets/img/beauty-casual-curly.jpg",
  "../../assets/img/blazers-daytime-dress.jpg",
  "../../assets/img/bored-boredom-casual.jpg",
  "../../assets/img/city-daylight-diversity.jpg"
];

@Component({
  selector: "app-slideshow",
  templateUrl: "./slideshow.component.html",
  styleUrls: ["./slideshow.component.scss"],
  animations: [slideshowAnimation]
})
export class SlideshowComponent implements OnInit {
  @ViewChild("previous", { static: true }) previous: ElementRef;
  @ViewChild("next", { static: true }) next: ElementRef;
  @ViewChild("slider", { static: true }) sliderEl: ElementRef;
  @ViewChild("bullet", { static: true }) bullet: ElementRef;
  images: Array<any> = images;
  currentIndex = 0;
  currentDirection = "right";
  private isOnSlider = new EventEmitter<boolean>();
  private timerSub: any;
  private isClicked = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {

    const prevModified$ = fromEvent(this.getNativeElement(this.previous), "click").pipe(
      map(() => ({ shift: -1, direction: "right" }))
    );

    const nextModified$ = fromEvent(this.getNativeElement(this.next), "click").pipe(
      map(() => ({ shift: 1, direction: "left" }))
    );

    this.timerSub = this.isOnSlider
      .pipe(
        switchMap(isOnSlider => 
          timer(2000, 2000).pipe(
            tap(() => console.log('TAP')),
            takeWhile(() => isOnSlider),
            map(() => ({ shift: 1, direction: "left" })),
          ))
        )

    fromEvent(this.getNativeElement(this.sliderEl), "mouseover")
    .subscribe(() => {
      this.isOnSlider.emit(false);
    });

    fromEvent(this.getNativeElement(this.sliderEl), "mouseout")
    .subscribe(() => {
      this.isOnSlider.emit(true);
    });

    // fromEvent(this.getNativeElement(this.previous), "click")
    // .subscribe(() => {
    //   this.isClicked.emit(false);
    // });

    // fromEvent(this.getNativeElement(this.next), "click")
    // .subscribe(() => {
    //   this.isClicked.emit(false);
    // });

    // fromEvent(this.getNativeElement(this.bullet), "click")
    // .subscribe(() => {
    //   this.isClicked.emit(false);
    // });

    

    merge(prevModified$, nextModified$, this.timerSub)
      .pipe(
        tap(() => console.log('TAP_CLICK')),
        startWith({ index: 0 } as any),
        scan((acc, curr) => {
          const projectedIndex = acc.index + curr.shift;

          const adjustedIndex =
            projectedIndex < 0
              ? this.images.length - 1
              : projectedIndex >= this.images.length
              ? 0
              : projectedIndex;

          return { index: adjustedIndex, direction: curr.direction };
        })
      )
      .subscribe(event => {
        console.log('SUBSCRIBE');
        this.currentIndex = event.index;
        this.currentDirection = event.direction;
      });
  }

  public setSlide(slideNumber: number): void {
    this.currentDirection = slideNumber < this.currentIndex ? 'right' : 'left';
    this.currentIndex = slideNumber;
  }

  getNativeElement(element) {
    return element.nativeElement;
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { fromEvent, merge, timer } from "rxjs";
import {
  map,
  scan,
  startWith,
  tap,
  switchMap,
  takeWhile
} from "rxjs/operators";
import { slideshowAnimation } from "./slideshow.animations";
import "../../assets/img/beauty-casual-curly.jpg";
import "../../assets/img/blazers-daytime-dress.jpg";
import "../../assets/img/bored-boredom-casual.jpg";
import "../../assets/img/city-daylight-diversity.jpg";

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
  @ViewChild("previous", { static: true }) previousEl: ElementRef;
  @ViewChild("next", { static: true }) nextEl: ElementRef;
  @ViewChild("slider", { static: true }) sliderEl: ElementRef;
  public images: Array<any> = images;
  public currentIndex = 0;
  public currentDirection = "left";
  private isOnSlider = new EventEmitter<boolean>();
  private timerSub: any;
  private clicked: boolean = false;

  constructor() {}

  public ngOnInit() {
    const prevModified$ = fromEvent(
      this.getNativeElement(this.previousEl), "click").pipe(
      tap(() => this.stopTimer()),
      map(() => ({ shift: -1, direction: "right" }))
    );

    const nextModified$ = fromEvent(
      this.getNativeElement(this.nextEl),
      "click"
    ).pipe(
      tap(() => this.stopTimer()),
      map(() => ({ shift: 1, direction: "left" }))
    );

    this.timerSub = this.isOnSlider.pipe(
      switchMap(isOnSlider =>
        timer(4000, 4000).pipe(
          takeWhile(() => isOnSlider && !this.clicked),
          map(() => ({ shift: 1, direction: "left" }))
        )
      )
    );

    fromEvent(this.getNativeElement(this.sliderEl), "mouseover").subscribe(
      () => {
        this.isOnSlider.emit(false);
      }
    );

    fromEvent(this.getNativeElement(this.sliderEl), "mouseout").subscribe(
      () => {
        this.isOnSlider.emit(true);
      }
    );

    merge(prevModified$, nextModified$, this.timerSub)
      .pipe(
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
        this.currentIndex = event.index;
        this.currentDirection = event.direction;
      });
  }

  public ngAfterViewInit() {
    let event = new MouseEvent("mouseout", { bubbles: true });
    this.getNativeElement(this.sliderEl).dispatchEvent(event);
  }

  public setSlide(slideNumber: number): void {
    this.currentDirection = slideNumber < this.currentIndex ? "right" : "left";
    this.currentIndex = slideNumber;
  }

  public getNativeElement(element) {
    return element.nativeElement;
  }

  public stopTimer() {
    this.clicked = true;
  }
}

import { Component, OnInit, ViewChild, AfterContentInit, OnChanges } from "@angular/core";
import { fromEvent, merge, timer } from "rxjs";
import { map, scan, startWith } from "rxjs/operators";
import { slideshowAnimation } from "./slideshow.animations";

const images: string[] = [
  "https://www.w3schools.com/howto/img_nature_wide.jpg",
  "https://www.w3schools.com/howto/img_snow_wide.jpg",
  "https://www.w3schools.com/howto/img_lights_wide.jpg",
  "https://www.w3schools.com/howto/img_mountains_wide.jpg",
  "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/model/aventador/aventador-s/Restyling/design-left.jpg"
];

@Component({
  selector: "app-slideshow",
  templateUrl: "./slideshow.component.html",
  styleUrls: ["./slideshow.component.scss"],
  animations: [slideshowAnimation]
})
export class SlideshowComponent implements OnInit {
  @ViewChild("previous", { static: true }) previous;
  @ViewChild("next", { static: true }) next;
  position: any;
  images: any[] = images;
  currentIndex = 0;
  currentDirection = "left";

  constructor() {
  }

  ngOnInit() {
    const prevModified = fromEvent(this.getNativeElement(this.previous), "click").pipe(
      map(el => ({ shift: -1, direction: "right" }))
    );

    const nextModified = fromEvent(this.getNativeElement(this.next), "click").pipe(
      map(el => ({ shift: 1, direction: "left" }))
    );

    const TIMER = timer(4000, 4000).pipe(map(el => ({ shift: 1, direction: "left" }))
    );

    merge(prevModified, nextModified, TIMER)
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

  public setSlide(slideNumber: number): void {
    this.currentDirection = slideNumber < this.currentIndex ? 'right' : 'left';
    this.currentIndex = slideNumber;
  }

  getNativeElement(element) {
    return element.nativeElement;
  }
}

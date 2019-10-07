import { Component, OnInit, ViewChild } from "@angular/core";
import { fromEvent, merge } from "rxjs";
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

  constructor() {}

  ngOnInit() {
    const prev$ = fromEvent(this.getNativeElement(this.previous), "click").pipe(
      map(event => ({ shift: -1, direction: "right" }))
    );

    const next$ = fromEvent(this.getNativeElement(this.next), "click").pipe(
      map(event => ({ shift: +1, direction: "left" }))
    );

    merge(prev$, next$)
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

  getNativeElement(element) {
    return element.nativeElement;
  }
}

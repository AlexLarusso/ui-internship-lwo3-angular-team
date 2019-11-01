import {
  Injectable, ElementRef, OnDestroy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import {
  fromEvent, BehaviorSubject, Observable, Subscription
} from 'rxjs';
import { map } from 'rxjs/operators';

import { IPageAnchor } from 'src/app/interfaces';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  public anchors: BehaviorSubject<IPageAnchor[]>;
  public scrollListener$: Observable<number>;
  public activeAnchor: BehaviorSubject<number>;
  public scrollYOffsetSub: Subscription;

  private anchorRefs: ElementRef[] = [];
  private scrollOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  constructor() {
    this.anchors = new BehaviorSubject<IPageAnchor[]>([]);
    this.activeAnchor = new BehaviorSubject<number>(-1);
    this.scrollListener$ = fromEvent(window, 'scroll').pipe(
      map(() => window.pageYOffset)
    );
    this.scrollYOffsetSub = this.scrollListener$
      .subscribe(position => this.activeAnchor
        .next(this.detectActive(position)));
  }

  public ngOnDestroy(): void { }

  public addAnchor(elRef: ElementRef): void {
    this.insertElementRef(elRef);
    this.anchors.next(this.anchorRefs.map(ref => this.getAnchor(ref)));
    this.activeAnchor.next(this.detectActive(window.pageYOffset));
  }

  public removeAnchor(elRef: ElementRef): void {
    const elRefIndex = this.anchorRefs.indexOf(elRef);

    this.anchorRefs.splice(elRefIndex, 1);
    this.anchors.next(this.anchorRefs.map(ref => this.getAnchor(ref)));
  }

  public resetAnchors(): void {
    this.anchorRefs = [];
    this.anchors.next([]);
  }

  public moveTo(anchor: IPageAnchor): void {
    this.selectRef(anchor)
      .nativeElement.scrollIntoView(this.scrollOptions);
  }

  private getAnchor(elRef: ElementRef): IPageAnchor {
    return {
      title: elRef.nativeElement.getAttribute('appScrollAnchor')
    };
  }

  private selectRef(anchor: IPageAnchor): ElementRef {
    return this.anchorRefs.find(el =>
      el.nativeElement.getAttribute('appScrollAnchor') === anchor.title
    );
  }

  private getRefPosition(elRef: ElementRef): number {
    const scrollPositionY = window.pageYOffset;

    return elRef.nativeElement.getBoundingClientRect().top + scrollPositionY;
  }

  private insertElementRef(newElementRef: ElementRef) {
    const acnhorRefsLength = this.anchorRefs.length;

    for (let i = 0; i < acnhorRefsLength; i++) {
      if (this.getRefPosition(newElementRef) <
        this.getRefPosition(this.anchorRefs[i])) {
          this.anchorRefs.splice(i, 0, newElementRef);

          return;
      }
    }

    this.anchorRefs.push(newElementRef);
  }

  private detectActive(position: number) {
    if (this.anchorRefs.length) {
      const lastNumber = this.anchorRefs.length - 1;
      const lastElementBottomPosition = this.anchorRefs[lastNumber]
        .nativeElement.getBoundingClientRect().bottom + window.pageYOffset;
      const positionMargin = 10;
      const correctedPosition = position + positionMargin;

      if (lastElementBottomPosition <= window.innerHeight + correctedPosition) {
        return lastNumber;
      }

      for (let i = 0; i < lastNumber; i++) {
        if (this.getRefPosition(this.anchorRefs[i]) <= correctedPosition
          && this.getRefPosition(this.anchorRefs[i + 1]) > correctedPosition) {
            return i;
        }
      }

      return lastNumber;
    }

    return -1;
  }
}

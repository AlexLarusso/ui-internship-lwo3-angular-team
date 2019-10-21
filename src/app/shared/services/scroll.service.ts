import { Injectable, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

export interface IPageAnchor {
  title: string;
  selector: string;
}

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
    const firstActive = this.detectActive(window.pageYOffset);

    this.insertElementRef(elRef);
    this.anchors.next(this.anchorRefs.map(ref => this.getAnchor(ref)));
    this.activeAnchor.next(firstActive);
  }

  public resetAnchors(): void {
    this.anchorRefs = [];
  }

  public moveTo(anchor: IPageAnchor): void {
    this.selectRef(anchor)
      .nativeElement.scrollIntoView(this.scrollOptions);
  }

  private getAnchor(elRef: ElementRef): IPageAnchor {
    return {
      selector: elRef.nativeElement.localName,
      title: elRef.nativeElement.title
    };
  }

  private selectRef(anchor: IPageAnchor): ElementRef {
    return this.anchorRefs.find(el =>
      el.nativeElement.localName === anchor.selector
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

      if (lastElementBottomPosition === window.innerHeight + position) {
        return lastNumber;
      }

      for (let i = 0; i < lastNumber; i++) {
        if (this.getRefPosition(this.anchorRefs[i]) <= position
          && this.getRefPosition(this.anchorRefs[i + 1]) > position) {
            return i;
        }
      }

      return lastNumber;
    }

    return -1;
  }
}

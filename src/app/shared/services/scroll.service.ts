import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IPageAnchor {
  title: string;
  selector: string;
}

interface IAnchorOffset {
  positionTop: number;
  positionBottom: number;
  pageAnchor: IPageAnchor;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public activeAnchor = new EventEmitter();
  public pageAnchors = new EventEmitter();

  private isListening = false;
  private pageAnchorRefs: ElementRef[] = [];
  private pageAnchorOffsets: IAnchorOffset[] = [];
  private scrollOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  public addAnchor(elRef: ElementRef): void {
    this.pageAnchorRefs.push(elRef);
    this.pageAnchors.emit({
      selector: elRef.nativeElement.localName,
      title: elRef.nativeElement.title
    });
  }

  public resetAnchors(): void {
    this.pageAnchorRefs = [];
    this.pageAnchorOffsets = [];
  }

  public getPageAnchors(): Array<IPageAnchor> {
    return this.pageAnchorRefs.map(elRef => ({
      selector: elRef.nativeElement.localName,
      title: elRef.nativeElement.title
    }));
  }

  public moveTo(anchor: IPageAnchor): void {
    this.selectRef(anchor)
      .nativeElement.scrollIntoView(this.scrollOptions);
  }

  private selectRef(anchor: IPageAnchor): ElementRef {
    return this.pageAnchorRefs.find(el =>
      el.nativeElement.localName === anchor.selector
    );
  }

  private findActive(position: number): IPageAnchor {
    const anchorsCount = this.pageAnchorOffsets.length;
    const lastBeforeFooter = this.pageAnchorOffsets[anchorsCount - 2];
    const footer = this.pageAnchorOffsets[anchorsCount - 1];
    const footerExtraGap = 10;

    for (let i = 0; i < anchorsCount - 2; i++) {
      const currentEl = this.pageAnchorOffsets[i];
      const nextEl = this.pageAnchorOffsets[i + 1];

      if (position >= currentEl.positionTop && position < nextEl.positionTop) {
        return {
          title: currentEl.pageAnchor.title,
          selector: currentEl.pageAnchor.selector
        };
      }
    }

    return footer.positionBottom - position <= window.innerHeight + footerExtraGap
      ? {
        title: footer.pageAnchor.title,
        selector: footer.pageAnchor.selector
      }
      : {
        title: lastBeforeFooter.pageAnchor.title,
        selector: lastBeforeFooter.pageAnchor.selector
      };
  }

  private onScrollCallback(position: number): void {
    this.activeAnchor.emit(this.findActive(position));
  }


  public initScrollListening(): void {
    this.pageAnchorOffsets = this.getElementsOffsets();

    if (!this.isListening) {
      this.isListening = true;
      fromEvent(window, 'scroll').pipe(map(() => window.pageYOffset))
        .subscribe(position =>
          this.onScrollCallback(position));
    }
  }

  private getElementsOffsets(): Array<IAnchorOffset> {
    const scrollPositionY = window.pageYOffset;
    const offsets = this.pageAnchorRefs.map(elRef => ({
      positionTop: elRef.nativeElement.getBoundingClientRect().top
        + scrollPositionY,
      positionBottom: elRef.nativeElement.getBoundingClientRect().bottom
        + scrollPositionY,
      pageAnchor: {
        selector: elRef.nativeElement.localName,
        title: elRef.nativeElement.title
      }
    }));

    return offsets.sort((a, b) => a.positionTop - b.positionTop);
  }
}

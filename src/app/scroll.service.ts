import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IPageAnchor {
  title: string,
  selector: string
}

interface IAnchorOffset {
  positionTop: number,
  positionBottom: number,
  pageAnchor: IPageAnchor
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public activeAnchor = new EventEmitter();
  
  private pageAnchorRefs: ElementRef[] = [];
  private pageAnchorOffsets: IAnchorOffset[] = [];
  private scrollOptions = { 
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  constructor() {
    fromEvent(window, 'scroll').pipe(
      map(_ => window.pageYOffset))
        .subscribe(position => {
          setTimeout(() => {
            this.onScrollCallback(position);
          }, 0); 
        });
  }
  public addAnchor(elRef: ElementRef) {  
    setTimeout(() => {
      this.pageAnchorRefs.push(elRef); 
      const anchor = 
      this.pageAnchorOffsets.push({
        positionTop: elRef.nativeElement.getBoundingClientRect().top
          + window.pageYOffset,
        positionBottom: elRef.nativeElement.getBoundingClientRect().bottom
          + window.pageYOffset,
        pageAnchor: {
          selector: elRef.nativeElement.localName,
          title: elRef.nativeElement.title
        }
      });
      this.pageAnchorOffsets.sort((a, b) => a.positionTop - b.positionTop);
    }, 0);
  }

  public resetAnchors() {
    this.pageAnchorRefs = [];
    this.pageAnchorOffsets = [];
  }

  public getPageAnchors() {
    return this.pageAnchorRefs.map(elRef => ({ 
      selector: elRef.nativeElement.localName,
      title: elRef.nativeElement.title
    }));
  }

  public moveTo(anchor: IPageAnchor) {
    this.selectRef(anchor)
      .nativeElement.scrollIntoView(this.scrollOptions);
  }

  private selectRef(anchor: IPageAnchor) {
    return this.pageAnchorRefs.find(el =>
      el.nativeElement.localName === anchor.selector
    );
  }

  private onScrollCallback(position: number) {
    const anchorsCount = this.pageAnchorOffsets.length;

    for (let i = 0; i < anchorsCount - 1; i++) {
      if(position >= this.pageAnchorOffsets[i].positionTop
        && position < this.pageAnchorOffsets[i + 1].positionTop) {
          const active = {
              title: this.pageAnchorOffsets[i].pageAnchor.title,
              selector: this.pageAnchorOffsets[i].pageAnchor.selector
          };
          this.activeAnchor.emit(active);
          return;
        }
    }
    const active = {
      title: this.pageAnchorOffsets[anchorsCount - 1]
        .pageAnchor.title,
      selector: this.pageAnchorOffsets[anchorsCount - 1]
        .pageAnchor.selector
    };

    this.activeAnchor.emit(active);
  }
}

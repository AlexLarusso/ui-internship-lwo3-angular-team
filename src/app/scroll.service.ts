import { Injectable, ElementRef, EventEmitter, AfterViewChecked } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, throttleTime } from 'rxjs/operators';

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
  public pageAnchors = new EventEmitter();
  
  private isListening: boolean = false;
  private pageAnchorRefs: ElementRef[] = [];
  private pageAnchorOffsets: IAnchorOffset[] = [];
  private scrollOptions = { 
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  public addAnchor(elRef: ElementRef) {  
    this.pageAnchorRefs.push(elRef); 
    this.pageAnchors.emit( { 
        selector: elRef.nativeElement.localName,
        title: elRef.nativeElement.title
    });
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

    for (let i = 0; i < anchorsCount - 2; i++) {
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
    let active;
    console.log('BOttom:', this.pageAnchorOffsets[anchorsCount - 1].positionBottom);
    console.log('position:', position);
    console.log('height', window.innerHeight);
    
    
    if (this.pageAnchorOffsets[anchorsCount - 1].positionBottom
      - position <= window.innerHeight + 10) {
       active = {
          title: this.pageAnchorOffsets[anchorsCount - 1]
            .pageAnchor.title,
          selector: this.pageAnchorOffsets[anchorsCount - 1]
            .pageAnchor.selector
      };
    } else {
      active = {
        title: this.pageAnchorOffsets[anchorsCount - 2]
          .pageAnchor.title,
        selector: this.pageAnchorOffsets[anchorsCount - 2]
          .pageAnchor.selector
      };
    }

    

    this.activeAnchor.emit(active);
  }

  public initScrollListening() {
    const offsets = this.pageAnchorRefs.map(elRef => ({
      positionTop: elRef.nativeElement.getBoundingClientRect().top
        + window.pageYOffset,
      positionBottom: elRef.nativeElement.getBoundingClientRect().bottom
        + window.pageYOffset,
      pageAnchor: {
        selector: elRef.nativeElement.localName,
        title: elRef.nativeElement.title
      }
    }));
    offsets.sort((a, b) => a.positionTop - b.positionTop);
    this.pageAnchorOffsets = offsets;
    
    if (!this.isListening) {
      this.isListening = true;
      fromEvent(window, 'scroll').pipe(map(_ => window.pageYOffset))
      // throttleTime(100))
        .subscribe(position =>
          this.onScrollCallback(position));
      }
  }
}

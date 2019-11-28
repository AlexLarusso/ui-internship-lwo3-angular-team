import {
  Component, OnInit, AfterViewInit, AfterViewChecked,
  ViewChild, HostListener, ElementRef, Input, ChangeDetectorRef,
  OnDestroy, ChangeDetectionStrategy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { IProductShortInfo } from 'src/app/interfaces';

const BREAK_POINTS = {
  mobile: {
    width: 575,
    slideNum: 1
  },
  tablet_S: {
    width: 576,
    slideNum: 2
  },
  tablet_M: {
    width: 768,
    slideNum: 3
  },
  laptop_S: {
    width: 992,
    slideNum: 3
  },
  laptop_M: {
    width: 1200,
    slideNum: 4
  }
};

const PRODUCT_ITEM_MARGIN = 30;

@AutoUnsubscribe()
@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.html',
  styleUrls: ['./product-carousel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() public productData: Array<IProductShortInfo>;

  @ViewChild('products', {static: false}) products: ElementRef;
  @ViewChild('productsContainer', {static: false}) productsContainer: ElementRef;
  @ViewChild('prevButton', {static: true}) prevButton: ElementRef;
  @ViewChild('nextButton', {static: true}) nextButton: ElementRef;

  public faArrowLeft = faChevronLeft;
  public faArrowRight = faChevronRight;
  public canMoveToNext = true;
  public canMoveToPrev = false;
  public productContainer: HTMLElement;
  public productArray: Array<IProductShortInfo>;
  public itemWidth: number;
  public visibleNum: number;
  public pageWidth: number;
  public position = 0;
  public additionalScroll = 0;
  public containerScroll = 0;
  public prevSub: Subscription;
  public nextSub: Subscription;

  @HostListener('window:resize', [])
  public onResize(): void {
    this.pageWidth = window.innerWidth;
    this.productsContainer.nativeElement.style.width = this.itemWidth * this.visibleNum + 'px';

    this.resetPositionValue();
    this.toggleButtonsState();
    this.indicateViewNumber();
  }

  @HostListener('touchend', [])
  public handleTouch(): void {
    this.additionalScroll = this.productsContainer.nativeElement.scrollLeft % this.itemWidth;

    if (this.additionalScroll) {
      this.productsContainer.nativeElement.scrollLeft > this.containerScroll
        ? this.moveToNext()
        : this.moveToPrev();
    }

    this.containerScroll = this.productsContainer.nativeElement.scrollLeft;

    this.toggleButtonsState();
  }

  constructor(private readonly cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.pageWidth = window.innerWidth;

    this.prevSub = fromEvent(this.prevButton.nativeElement, 'click').pipe(
      throttleTime(500))
      .subscribe(() => this.moveToPrev());

    this.nextSub = fromEvent(this.nextButton.nativeElement, 'click').pipe(
      throttleTime(500))
      .subscribe(() => this.moveToNext());
  }

  public ngAfterViewInit(): void {
    this.productContainer = this.products.nativeElement;

    this.indicateViewNumber();
  }

  public ngAfterViewChecked(): void {
    const [_, ...rest] = this.products.nativeElement.childNodes;
    this.productArray = [...rest];

    if (this.productArray.length) {
      this.toggleButtonsState();

      this.itemWidth = [...this.products.nativeElement.childNodes][1].childNodes[0].offsetWidth + PRODUCT_ITEM_MARGIN;
    }

    this.productsContainer.nativeElement.style.width = this.itemWidth * this.visibleNum + 'px';

    this.cd.detectChanges();
  }

  public ngOnDestroy(): void { }

  private toggleButtonsState(): void {
    const maxPosition = -this.itemWidth * (this.productArray.length - this.visibleNum);

    this.canMoveToPrev = this.position !== 0;
    this.canMoveToNext = this.position !== maxPosition && this.productArray.length >= this.visibleNum;
  }

  private moveToNext(): void {
    const newPosition = this.position - this.itemWidth * this.visibleNum;
    const possiblePosition = -this.itemWidth * (this.productArray.length - this.visibleNum);

    this.position = newPosition >= possiblePosition ? newPosition : possiblePosition;
    this.productContainer.style.marginLeft = this.position + this.additionalScroll + 'px';

    this.toggleButtonsState();
  }

  private moveToPrev(): void {
    const newPosition = this.position + this.itemWidth * this.visibleNum;
    const possiblePosition = 0;

    this.position = newPosition >= possiblePosition ? possiblePosition : newPosition;
    this.productContainer.style.marginLeft = this.position + this.additionalScroll + 'px';

    this.toggleButtonsState();
  }

  private indicateViewNumber(): void {
    switch (true) {
      case this.pageWidth > BREAK_POINTS.laptop_M.width:
        this.visibleNum = BREAK_POINTS.laptop_M.slideNum;
        break;
      case this.pageWidth > BREAK_POINTS.laptop_S.width:
        this.visibleNum = BREAK_POINTS.laptop_S.slideNum;
        break;
      case this.pageWidth > BREAK_POINTS.tablet_M.width:
        this.visibleNum = BREAK_POINTS.tablet_M.slideNum;
        break;
      case this.pageWidth > BREAK_POINTS.tablet_S.width:
        this.visibleNum = BREAK_POINTS.tablet_S.slideNum;
        break;
      default:
        this.visibleNum = BREAK_POINTS.mobile.slideNum;
    }
  }

  private resetPositionValue(): void {
    this.position = 0;
    this.productContainer.style.marginLeft = 0 + 'px';
    this.productsContainer.nativeElement.scrollLeft = 0;
  }
}

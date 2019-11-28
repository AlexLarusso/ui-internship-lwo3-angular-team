import { Component, ViewChild, Input, OnInit, ElementRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ToastrService } from 'ngx-toastr';
import { StarRatingComponent } from 'ng-starrating';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getUserFirstName, getAuthState } from 'src/app/store/selectors/auth.selector';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IReview } from 'src/app/interfaces';
import { ReviewService } from 'src/app/shared/services';
import { ToastrMessage } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.html',
  styleUrls: ['./product-review.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductReviewComponent implements OnInit, OnDestroy {
  @ViewChild('feedback', { static: false }) private feedbackField: ElementRef;
  @ViewChild('starRatingRef', { static: false }) private star: StarRatingComponent;

  @Input() productId: string;

  public maxCharNum = 200;
  public defaultValue = 0;
  public charLeft: number;
  public userIconSrc = '/assets/img/vlad.png';
  public currentProductReviews$: Observable<Array<IReview>>;
  public reviewSub: Subscription;
  public authSub: Subscription;
  public nameSub: Subscription;

  public userReview: IReview = {
    productId: null,
    createdBy: 'Guest',
    message: null,
    rating: null,
  };

  constructor(
    private readonly reviewService: ReviewService,
    private readonly store: Store<IAppState>,
    private readonly toastrService: ToastrService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.charLeft = this.maxCharNum;

    this.getProductReview();
  }

  public charCount(): void {
    const enteredCharNum = this.feedbackField.nativeElement.value.length;
    const isCharAvaliable = this.maxCharNum - enteredCharNum >= 0;

    if (isCharAvaliable) {
      this.charLeft = this.maxCharNum - enteredCharNum;
    }
  }

  public sendFeedback(): void {
    this.setUserData();

    this.reviewSub = this.reviewService.leaveReview(this.userReview)
      .subscribe(() => {
        this.toastrService.success(ToastrMessage.successfulFeedback);
    }, () => {
      this.toastrService.warning(ToastrMessage.incorrectFeedback);
    }, () => {
      this.getProductReview();

      this.cdr.detectChanges();
    });

    this.clearAllField();
  }

  public onRate($event: {
    oldValue: number,
    newValue: number,
    starRating: StarRatingComponent
  }): void {
    this.userReview = {
      ...this.userReview,
      rating: $event.newValue
    };
  }

  public ngOnDestroy(): void { }

  private setUserData(): void {
    this.userReview.productId = this.productId;
    this.userReview.message = this.feedbackField.nativeElement.value.trimStart();

    if (this.checkUserAuth()) {
      this.nameSub = this.store.select(getUserFirstName)
        .subscribe(name => this.userReview.createdBy = name);
    }
  }

  private clearAllField(): void {
    this.feedbackField.nativeElement.value = '';
    this.charLeft = this.maxCharNum;
    this.star.value = this.defaultValue;
  }

  private checkUserAuth(): boolean {
    let isAuth: boolean;

    this.authSub = this.store.select(getAuthState)
      .subscribe(state => isAuth = state);

    return isAuth;
  }

  private getProductReview(): void {
    this.currentProductReviews$ = this.reviewService.getReview()
      .pipe(map(reviews =>
        reviews
          .filter(review => review.productId === this.productId)
          .map(review => ({...review, createdAt: new Date(review.createdAt)})
      )));
  }
}

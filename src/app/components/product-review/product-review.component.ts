import { Component, ViewChild, Input, OnInit, ElementRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { StarRatingComponent } from 'ng-starrating';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getUserFirstName, getAuthState } from 'src/app/store/selectors/auth.selector';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IReview } from 'src/app/interfaces';
import { ReviewService } from 'src/app/shared/services';
import { ToastrMessage } from 'src/app/app.enum';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.html',
  styleUrls: ['./product-review.scss']
})
export class ProductReviewComponent implements OnInit {
  @ViewChild('feedback', { static: false }) private feedbackField: ElementRef;
  @Input() productId: string;

  public maxCharNum = 200;
  public charLeft: number;
  public userIconSrc = '../../../../assets/img/vlad.png';
  public currentProductReviews$: Observable<Array<IReview>>;

  public userReview: IReview = {
    productId: null,
    createdBy: 'Guest',
    message: null,
    rating: null,
  };

  constructor(
    private readonly reviewService: ReviewService,
    private readonly store: Store<IAppState>,
    private readonly toastrService: ToastrService
  ) { }

  public ngOnInit(): void {
    this.charLeft = this.maxCharNum;

    this.getProductReview();
  }

  public charCount(): void {
    const enteredCharNum = this.feedbackField.nativeElement.value.length;

    if ( this.maxCharNum - enteredCharNum >= 0) {
      this.charLeft = this.maxCharNum - enteredCharNum;
    }
  }

  public sendFeedback(): void {
    this.setUserData();

    this.reviewService.leaveReview(this.userReview).subscribe(() => {
      this.toastrService.success(ToastrMessage.successfulFeedback);
    }, () => {
      this.toastrService.warning(ToastrMessage.uncorrectFeedback);
    }, () => {
      this.getProductReview();
    });

    this.clearTextArea();
  }

  public onRate($event: {
    oldValue: number,
    newValue: number,
    starRating: StarRatingComponent
  }): void {
    this.userReview.rating = $event.newValue;
  }

  private setUserData(): void {
    this.userReview.productId = this.productId;
    this.userReview.message = this.feedbackField.nativeElement.value.trimStart();

    if (this.checkUserAuth()) {
      this.store.select(getUserFirstName).subscribe(name => this.userReview.createdBy = name);
    }
  }

  private clearTextArea(): void {
    this.feedbackField.nativeElement.value = '';
  }

  private checkUserAuth(): boolean {
    let isAuth: boolean;

    this.store.select(getAuthState).subscribe(state => isAuth = state);

    return isAuth;
  }

  private getProductReview(): void {
    this.currentProductReviews$ = this.reviewService.getReview()
      .pipe(map(reviews =>
        reviews
          .filter(review => review.productId === this.productId)
          .map(review => {
            review.createdAt = new Date(review.createdAt);

            return review;
          })
      ));
  }
}

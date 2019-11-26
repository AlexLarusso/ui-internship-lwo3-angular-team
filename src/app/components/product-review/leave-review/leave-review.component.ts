import { Component, ViewChild, Input, OnInit, ElementRef } from '@angular/core';

import { StarRatingComponent } from 'ng-starrating';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getUserFirstName, getAuthState } from 'src/app/store/selectors/auth.selector';

import { IReview } from 'src/app/interfaces';
import { ReviewService } from 'src/app/shared/services';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.html',
  styleUrls: ['./leave-review.scss']
})
export class LeaveReviewComponent implements OnInit {
  @ViewChild('feedback', { static: false }) private feedbackField: ElementRef;
  @Input() productId: string;

  public maxCharNum = 200;
  public charLeft: number;

  public userReview: IReview = {
    productId: null,
    createdBy: 'Guest',
    message: null,
    rating: null,
  };

  constructor(
    private readonly reviewService: ReviewService,
    private readonly store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.charLeft = this.maxCharNum;
  }

  public charCount(): void {
    const enteredCharNum = this.feedbackField.nativeElement.value.length;

    if ( this.maxCharNum - enteredCharNum >= 0) {
      this.charLeft = this.maxCharNum - enteredCharNum;
    }
  }

  public sendFeedback(): void {
    this.setUserData();

    this.reviewService.leaveReview(this.userReview);

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
}

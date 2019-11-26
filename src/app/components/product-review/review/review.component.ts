import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReviewService } from 'src/app/shared/services';
import { IReview } from 'src/app/interfaces';

@Component({
  selector: 'app-review',
  templateUrl: './review.html',
  styleUrls: ['./review.scss']
})
export class ReviewComponent implements OnInit {
  @Input() public productId: string;

  public userIconSrc = '../../../../assets/img/vlad.png';
  public currentProductReviews$: Observable<Array<IReview>>;

  constructor(
    private readonly reviewService: ReviewService
  ) { }

  public ngOnInit(): void {
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

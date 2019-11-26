import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { IReview } from '../../interfaces';
import { URLs, ToastrMessage } from 'src/app/app.enum';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private readonly http: HttpClient,
    private readonly toastrService: ToastrService
  ) { }

  public leaveReview(userReview: IReview): Subscription {
    return this.http.post<IReview>(URLs.productReview, userReview).subscribe(res => {
      this.toastrService.success(ToastrMessage.successfulFeedback);

      this.getReview();
    }, error => {
      this.toastrService.warning(ToastrMessage.uncorrectFeedback);
    });
  }

  public getReview(): Observable<Array<IReview>> {
    return this.http.get<Array<IReview>>(URLs.productReview);
  }
}

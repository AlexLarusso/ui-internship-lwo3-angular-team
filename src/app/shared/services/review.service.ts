import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IReview } from '../../interfaces';
import { URLs } from 'src/app/app.enum';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private readonly http: HttpClient
  ) { }

  public leaveReview(userReview: IReview): Observable<IReview> {
    return this.http.post<IReview>(URLs.productReview, userReview);
  }

  public getReview(): Observable<Array<IReview>> {
    return this.http.get<Array<IReview>>(URLs.productReview);
  }
}

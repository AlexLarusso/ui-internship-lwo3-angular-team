import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { HttpService } from 'src/app/shared/services';

@AutoUnsubscribe()
@Component({
  selector: 'app-error-sample',
  templateUrl: './error-sample.html',
  styleUrls: ['./error-sample.scss']
})
export class ErrorSampleComponent implements OnInit, OnDestroy {

  public product: any;
  public productsSub: Subscription;

  constructor(private httpService: HttpService) { }

  public ngOnInit(): void {
    this.productsSub = this.httpService.getProductWithError()
      .subscribe(data => this.product = data);
  }

  public ngOnDestroy(): void { }
}

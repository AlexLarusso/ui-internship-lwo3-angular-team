import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { faWindowClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { NotificationService } from 'src/app/shared/services/notification.service';
import { INotification } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-notification',
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  public notificationSub: Subscription;
  public notification: INotification;
  public isDisplayed = false;
  public closeIcon: IconDefinition = faWindowClose;

  private visibleTimeout = 10000;

  constructor(private notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.notificationSub = this.notificationService.notifications
      .subscribe(val => this.showNotification(val));
  }

  public ngOnDestroy(): void { }

  public closeNotification(): void {
    this.isDisplayed = false;
  }

  private showNotification(notification: INotification) {
    if (notification) {
      this.notification = notification;
      this.isDisplayed = true;

      of(false).pipe(delay(this.visibleTimeout))
        .subscribe(val => this.isDisplayed = val);
    } else {
      this.isDisplayed = false;
    }
  }
}

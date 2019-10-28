import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { INotification } from 'src/app/interfaces';
import { NotificationType } from 'src/app/app.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications: BehaviorSubject<INotification>
    = new BehaviorSubject<INotification>(null);

  private notificationsCount = 0;

  public info(title: string, message: string = ''): void {
    const notification = {
      id: this.notificationsCount++,
      type: NotificationType.info,
      title,
      message
    };

    this.notify(notification);
  }

  public success(title: string, message: string = ''): void {
    const notification = {
      id: this.notificationsCount++,
      type: NotificationType.success,
      title,
      message
    };

    this.notify(notification);
  }

  public warning(title: string, message: string = ''): void {
    const notification = {
      id: this.notificationsCount++,
      type: NotificationType.warning,
      title,
      message
    };

    this.notify(notification);
  }

  public error(title: string, message: string = ''): void {
    const notification = {
      id: this.notificationsCount++,
      type: NotificationType.error,
      title,
      message
    };

    this.notify(notification);
  }

  private notify(notification: INotification): void {
    this.notifications.next(notification);
    this.log(notification);
  }

  private log(notification: INotification): void {
    switch (notification.type) {
      case NotificationType.error: {
        console.error(`An error occured:
          ${notification.title}, id: ${notification.id}.
          ${notification.message}`);
        return;
      }
      case NotificationType.warning: {
        console.warn(`Warning:
          ${notification.title}, id: ${notification.id}.
          ${notification.message}`);
        return;
      }
      case NotificationType.success: {
        console.log(`${notification.title} completed succesfully
          ${notification.message}`);
        return;
      }
      case NotificationType.info: {
        console.log(`Info: ${notification.title}
          ${notification.message}`);
        return;
      }

      default: console.error(notification.message);
    }
  }

}

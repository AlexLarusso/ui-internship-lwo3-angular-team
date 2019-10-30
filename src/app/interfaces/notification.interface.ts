import { NotificationType } from '../app.enum';

export interface INotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
}

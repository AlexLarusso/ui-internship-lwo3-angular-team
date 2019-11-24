import { Component, ViewChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-feedback',
  templateUrl: './leave-feedback.html',
  styleUrls: ['./leave-feedback.scss']
})
export class LeaveFeedbackComponent implements OnInit {
  @ViewChild('feedback', {static: false}) private feedbackField;
  @Input() productId: string;

  public maxCharNum = 200;
  public charLeft: number;

  public userReview: {
    productId: string,
    message: string;
    date: Date,
    name: string
  };

  public ngOnInit(): void {
    // console.log(this.productId);
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
  }

  private setUserData(): void {
    this.userReview.productId = this.productId;
    this.userReview.message = this.feedbackField.value;
    this.userReview.date = new Date();
    this.userReview.name = '';
  }
}

import { Component } from '@angular/core';
import './styles/_styles.scss';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui-internship-lwo3-angular-team';

  func() {
    console.log('Click');
  }
}

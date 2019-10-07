import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.scss']
})
export class MainLogoComponent implements OnInit {
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}

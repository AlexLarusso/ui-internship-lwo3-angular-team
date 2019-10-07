import { Component, OnInit } from '@angular/core';
import { faSearch, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  faSearch = faSearch;
  faCartArrowDown = faCartArrowDown;

  constructor() { }

  ngOnInit() {
  }

}

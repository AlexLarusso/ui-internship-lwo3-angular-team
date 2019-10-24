import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.html',
  styleUrls: ['./select-size.scss']
})
export class SelectSizeComponent implements OnInit {
  public sizes: Array<string>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    // this.store.select(getProd)
  }
}
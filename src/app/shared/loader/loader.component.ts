import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { getLoadingStatus } from '../../store/selectors/loader.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent implements OnInit {
  public bulletsArray = new Array(12).fill('');
  public loader$: Observable<boolean>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit() {
    this.loader$ = this.store.select(getLoadingStatus);
  }
}

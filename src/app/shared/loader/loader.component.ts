import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class LoaderComponent implements OnInit {
  public bulletsArray = new Array(12).fill('');
  public loader$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  public ngOnInit() {
    this.loader$ = this.store.select('loader').pipe(map(loader => loader.isLoading));
  }
}

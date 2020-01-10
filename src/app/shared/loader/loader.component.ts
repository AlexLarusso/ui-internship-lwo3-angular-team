import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { LoaderFacade } from 'src/app/store/loader/loader.facade';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  public bulletsArray = new Array(12).fill('');
  public loader$: Observable<boolean>;

  constructor(public loaderFacade: LoaderFacade) { }

  public ngOnInit() {
    this.loader$ = this.loaderFacade.loader$;
  }
}

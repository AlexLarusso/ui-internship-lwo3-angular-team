import { Component, OnInit } from '@angular/core';
import {
  faFacebookF, faTwitter, faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import { ModalService } from '../../../shared/services/modal-service';
import { IAppState, selectAuthState } from 'src/app/store/app.store';
import { LogOut } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-bar',
  templateUrl: './line-bar.html',
  styleUrls: ['./line-bar.scss']
})
export class LineBarComponent implements OnInit {
  public getState: Observable<any>;
  public isAuthenticated: false;
  public user = null;
  public errorMessage = null;

  constructor(
    private modalService: ModalService,
    private store: Store<IAppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faGoogle = faGoogle;

  public telephone = '+12 345-678-90';
  public email = 'gaboo@gmail.com';

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }
}

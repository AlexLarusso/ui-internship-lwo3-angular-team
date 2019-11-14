import { Component, OnInit, AfterViewInit, DoCheck, OnChanges } from '@angular/core';
import {
  faFacebookF, faTwitter, faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ModalService } from '../../../shared/services/modal-service';
import { IAppState, selectAuthState } from 'src/app/store/app.store';
import { LogOut, IsLoggedIn } from 'src/app/store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { getUserFirstName } from 'src/app/store/selectors/auth.selector';

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
    public modalService: ModalService,
    private store: Store<IAppState>,
    private authService: AuthService,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  public faFacebookF = faFacebookF;
  public faTwitter = faTwitter;
  public faGoogle = faGoogle;
  public userName$: Observable<string>;


  public telephone = '+12 345-678-90';
  public email = 'gaboo@gmail.com';

  public ngOnInit(): void {
    this.userName$ = this.store.select(getUserFirstName);

    if (this.authService.getToken()) {
      this.store.dispatch(new IsLoggedIn());
    }
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.errorMessage = state.errorMessage;
    });
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }
}

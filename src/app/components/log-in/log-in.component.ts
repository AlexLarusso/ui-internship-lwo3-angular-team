import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../interfaces/user';
import { ModalService } from '../../shared/services/modal-service';
import { IAppState, selectAuthState } from '../../store/app.store';
import { LogIn } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.html',
  styleUrls: ['./log-in.scss']
})

export class LogInComponent implements OnInit {
  public user = new User();
  public getState: Observable<any>;
  public errorMessage: string | null;

  constructor(
    private modalService: ModalService,
    private store: Store<IAppState>
  ) {
      this.getState = this.store.select(selectAuthState);
  }

  public ngOnInit(): void {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  public onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
 }

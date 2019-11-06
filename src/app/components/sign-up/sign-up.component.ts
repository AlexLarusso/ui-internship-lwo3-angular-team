import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../interfaces/user';
import { ModalService } from '../../shared/services/modal-service';
import { IAppState, selectAuthState } from 'src/app/store/app.store';
import { SignUp } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss']
})

export class SignUpComponent implements OnInit {
  public user = new User();
  public getState: Observable<any>;
  public errorMessage: string | null;

  constructor(
    private modalService: ModalService,
    private store: Store<IAppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));
  }
 }

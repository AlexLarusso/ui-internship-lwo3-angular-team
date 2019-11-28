import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { User } from '../../interfaces/user';
import { URLs } from '../../app.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) { }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public logIn(email: string, password: string): Observable<any> {
    const url = `${URLs.authorization}/login`;

    return this.http.post<User>(url, {email, password});
  }

  public signUp(email: string, password: string): Observable<User> {
    const url = `${URLs.authorization}/signup`;

    return this.http.post<User>(url, {email, password});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';

import { User } from '../../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:1337';

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) { }

  public getToken(): string {
    return this.cookieService.get('token');
  }

  public logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;

    return this.http.post<User>(url, {email, password});
  }

  public signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;

    return this.http.post<User>(url, {email, password});
  }
}

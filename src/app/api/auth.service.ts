import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;
  private loggedIn = new BehaviorSubject<boolean>(this.token.validateAuth());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean){
    this.loggedIn.next(value);
  }

  constructor(
    private http: HttpClient,
    private token: TokenService
    ) { }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  refresh(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/refresh`, {});
  }

  me(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/me`, {});
  }
}
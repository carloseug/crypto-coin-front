import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setAccessToken(accessToken: string){
    return localStorage.setItem('access_token', accessToken);
  }

  getAccessToken(){
    return localStorage.getItem('access_token');
  }

  removeLocalToken(){
    return localStorage.removeItem('access_token');
  }

  validateAuth(){
    const token = this.getAccessToken();
    if(token){
        const payload = this.payload(token);
        if(payload){
            return ( payload.iss === "http://localhost:8000/api/login" ) ? true : false;
        }else{
            return false;
        }
    } else {
        return false;
    }
  }

  payload(token: string){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string){
    return JSON.parse(atob(payload));
  }
}
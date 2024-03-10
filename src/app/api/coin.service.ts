import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin } from '../models/coin.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private baseUrl = `${environment.apiUrl}/coins`;

  constructor(private http: HttpClient) {}

  fetchCoins(): Observable<Coin[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Coin[]>(url);
  }

  getCoins(sortBy: string, sortOrder: string): Observable<Coin[]> {
    const url = `${this.baseUrl}?sort_by=${sortBy}&sort_direction=${sortOrder}`;
    return this.http.get<Coin[]>(url);
  }

  getCoinById(coinId: number): Observable<Coin> {
    const url = `${this.baseUrl}/${coinId}`;
    return this.http.get<Coin>(url);
  }
}

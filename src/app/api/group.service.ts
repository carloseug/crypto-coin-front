import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = `${environment.apiUrl}/groups`;
  private apiURL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  createGroup(data: Group): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  updateGroup(id: number, data: Group): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCoinsByGroupId(groupId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/coin-group/${groupId}`);
  }

  createCoinGroup(coinId: number, groupId: number): Observable<any> {
    const body = { coin_id: coinId, group_id: groupId };
    return this.http.post<any>(`${this.apiURL}/coin-groups`, body);
  }

  deleteCoinGroup(groupId: number, coinId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/coin-groups/${groupId}/${coinId}`);
  }
}

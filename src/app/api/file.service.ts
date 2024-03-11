// file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) {}

  getFiles(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  uploadFile(file: File, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('filename', file);
    formData.append('description', description);
    return this.http.post<any>(this.baseUrl, formData);
  }

  updateFile(id: number, file: File, description: string): Observable<any> {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('description', description);
    return this.http.put<any>(`${this.baseUrl}/${id}`, formData);
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}

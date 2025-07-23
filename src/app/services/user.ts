import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private cache = new Map<string, any>();
  private readonly API_KEY = 'reqres-free-v1';

  constructor(private http: HttpClient) {}

  private getRequestOptions() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'x-api-key': this.API_KEY 
      })
    };
  }

  getUsers(page: number): Observable<any> {
    const key = `page-${page}`;
    if (this.cache.has(key)) return of(this.cache.get(key));

    return this.http.get(`${this.baseUrl}?page=${page}`, this.getRequestOptions()).pipe(
      tap(data => this.cache.set(key, data)),
      catchError(error => {
        console.error('API Error:', error);
        return of(null); 
      })
    );
  }

  getUser(id: number): Observable<any> {
    const key = `user-${id}`;
    if (this.cache.has(key)) return of(this.cache.get(key));

    return this.http.get(`${this.baseUrl}/${id}`, this.getRequestOptions()).pipe(
      tap(data => this.cache.set(key, data)),
      catchError(error => {
        console.error('API Error:', error);
        return of(null);
      })
    );
  }
}
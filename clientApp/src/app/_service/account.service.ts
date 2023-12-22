import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public baseURL: string = "http://localhost:5225/api/";

  constructor(private http: HttpClient) { }
  login(model: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'accounts/login', model)
  }

} 

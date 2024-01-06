import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public baseURL: string = environment.baseURL;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSource.asObservable()

  constructor(private http: HttpClient) { }
  login(model: any): Observable<any> {
    return this.http.post<any>(this.baseURL + 'accounts/login', model).pipe(map((res: User) => {
      const user = res;
      if (user)
        localStorage.setItem("user", JSON.stringify(user))
      this.currentUserSource.next(user)
    }))
  }

  register(model: any): Observable<any> {
    return this.http.post<any>(this.baseURL + "accounts/register", model).pipe(map((user: User) => {
      localStorage.setItem("user", JSON.stringify(user))
      this.currentUserSource.next(user)
    }
    ))
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }
  logout() {
    this.currentUserSource.next(null)
    localStorage.removeItem("user")
  }

} 

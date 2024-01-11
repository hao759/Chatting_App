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
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));

    this.currentUserSource.next(user)
  }
  logout() {
    this.currentUserSource.next(null)
    localStorage.removeItem("user")
  }
  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

} 

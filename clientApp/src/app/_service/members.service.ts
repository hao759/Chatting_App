import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseURL + "users", this.getHttpOption())
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseURL + "users/" + username, this.getHttpOption())
  }

  getHttpOption() {
    const userString = localStorage.getItem("user");
    if (!userString)
      return;
    const user = JSON.parse(userString)
    return {
      headers: new HttpHeaders({
        authorization: "Bearer " + user.token
      })
    }
  }
}

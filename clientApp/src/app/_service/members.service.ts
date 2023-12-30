import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseURL: string = environment.baseURL;
  members: Member[] = []
  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0)
      return of(this.members)
    return this.http.get<Member[]>(this.baseURL + "users").pipe(map(data => {
      this.members = data;
      return data
    }))
  }

  getMember(username: string) {
    var member = this.members.find(x => x.name == username);
    if (member)
      return of(member)
    return this.http.get<Member>(this.baseURL + "users/" + username)
  }

  updateMember(member: Member) {
    return this.http.put(this.baseURL + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }

  // getHttpOption() {
  //   const userString = localStorage.getItem("user");
  //   if (!userString)
  //     return;
  //   const user = JSON.parse(userString)
  //   return {
  //     headers: new HttpHeaders({
  //       authorization: "Bearer " + user.token
  //     })
  //   }
  // }
}

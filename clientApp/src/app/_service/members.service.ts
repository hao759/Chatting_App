import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/UserParams';
import { AccountService } from './account.service';
import { User } from '../_models/User';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseURL: string = environment.baseURL;
  members: Member[] = []
  memberCache = new Map();
  user!: User
  userParams: UserParams | undefined

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser.subscribe({
      next: data => {
        if (data) {
          this.user = data
          this.userParams = new UserParams(data)
        }
      }
    })
  }

  getUserParams() {
    return this.userParams
  }
  setUserParams(userParams?: UserParams) {
    this.userParams = userParams
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user)
      return this.userParams
    }
    return
  }


  getMembers(userParams: UserParams) {
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) return of(response);
    // if (this.members.length > 0)
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    return getPaginatedResult<Member[]>(this.baseURL + "users", params, this.http).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    )
  }


  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.name === username);
    if (member) return of(member);
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
  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Member[]>(this.baseURL + 'likes', params, this.http);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseURL + 'users/set_main_photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseURL + "users/delete_photo/" + photoId)
  }

  addLike(username: string) {
    return this.http.post(this.baseURL + 'likes/' + username, {})
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

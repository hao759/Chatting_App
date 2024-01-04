import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/UserParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseURL: string = environment.baseURL;
  members: Member[] = []
  constructor(private http: HttpClient) { }



  getMembers(userParams: UserParams) {
    // if (this.members.length > 0)
    let params = this.getPaginationHeader(userParams);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    return this.getPaginateResult<Member[]>(this.baseURL + "users", params)
  }

  private getPaginateResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(map(response => {
      if (response.body)
        paginatedResult.result = response.body;
      const pagination = response.headers.get("Pagination");
      if (pagination)
        paginatedResult.pagination = JSON.parse(pagination);
      return paginatedResult;
    }));
  }

  private getPaginationHeader(userParams: UserParams) {
    let params = new HttpParams();
    params = params.append('pageNumber', userParams.pageNumber);
    params = params.append('pageSize', userParams.pageSize);
    return params;
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

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseURL + 'users/set_main_photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseURL + "users/delete_photo/" + photoId)
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

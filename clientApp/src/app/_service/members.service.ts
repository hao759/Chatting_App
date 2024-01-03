import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseURL: string = environment.baseURL;
  members: Member[] = []
  constructor(private http: HttpClient) { }
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>



  getMembers(page?: number, itemsPerPage?: number) {
    // if (this.members.length > 0)
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page)
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Member[]>(this.baseURL + "users", { observe: 'response', params }).pipe(map(response => {
      if (response.body)
        this.paginatedResult.result = response.body
      const pagination = response.headers.get("Pagination")
      if (pagination)
        this.paginatedResult.pagination = JSON.parse(pagination)
      return this.paginatedResult
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

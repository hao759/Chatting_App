import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/UserParams';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { AccountService } from 'src/app/_service/account.service';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  // styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = []
  // members$: Observable<Member[]> | undefined
  pagination: Pagination | undefined
  userParams: UserParams | undefined
  user: User | undefined
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser.subscribe({
      next: data => {
        if (data) {
          this.user = data
          this.userParams = new UserParams(data)
        }
      }
    })
  }
  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers() {
    if (this.userParams)
      this.memberService.getMembers(this.userParams).subscribe({
        next: (res) => {
          if (res.result && res.pagination) {
            this.members = res.result
            this.pagination = res.pagination
          }
        }
      })
  }
  pageChange(event: any) {
    if (this.userParams && this.userParams?.pageNumber != event.page) {
      this.userParams.pageNumber = event.page
      this.loadMembers()
    }
  }
  resetFilters() {
    if (this.user)
      this.userParams = new UserParams(this.user)
    this.loadMembers();
  }
}

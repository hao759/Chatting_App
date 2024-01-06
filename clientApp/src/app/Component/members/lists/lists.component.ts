import { Component } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  // styleUrls: ['./lists.component.css']
})
export class ListsComponent {
  members: Member[] | undefined
  predicate = "liked"
  pageNumber = 1
  pageSize = 5
  pagination: Pagination | undefined

  constructor(private memberService: MembersService) {
    // this.userParams = this.memberService.getUserParams();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: res => {
        this.members = res.result;
        this.pagination = res.pagination
      }
    })
  }
  pageChange(event: any) {
    if (this.pageNumber != event.page) {
      this.loadLikes()
    }
  }
}

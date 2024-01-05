import { Component } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  // styleUrls: ['./lists.component.css']
})
export class ListsComponent {
  members: Member[] | undefined
  predicate = "liked"

  constructor(private memberService: MembersService) {
    // this.userParams = this.memberService.getUserParams();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate).subscribe({
      next: res => {
        this.members = res;
      }
    })
  }
}

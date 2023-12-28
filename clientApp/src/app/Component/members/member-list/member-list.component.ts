import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  // styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = []

  constructor(private memberService: MembersService) {
  }
  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    this.memberService.getMembers().subscribe(data => {
      this.members = data
    },
      err => console.error
    )
  }
}

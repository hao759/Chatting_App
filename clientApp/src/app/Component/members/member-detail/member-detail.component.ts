import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!: Member
  constructor(private memberService: MembersService, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    this.memberService.getMember(this._ActivatedRoute.snapshot.params['username']).subscribe(data => {
      this.member = data;
    })
  }

}

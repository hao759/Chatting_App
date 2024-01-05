import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member

  constructor(private memberService: MembersService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    // console.log(this.member.photoUrl)
  }

  addLike(member: Member) {
    this.memberService.addLike(member.name).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs)
    })
  }
}

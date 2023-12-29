import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_service/account.service';
import { MembersService } from 'src/app/_service/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member!: Member
  @ViewChild('editForm') editForm: NgForm | undefined
  user: User | null = null
  constructor(private accountService: AccountService, private memberService: MembersService
    , private toastr: ToastrService) {
    this.accountService.currentUser.subscribe(data => {
      this.user = data
    })
  }
  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    if (!this.user)
      return;
    this.memberService.getMember(this.user.userName).subscribe(data => {
      this.member = data
    })
  }
  editMember() {
    this.toastr.success("Update success full")
    this.editForm?.reset(this.member)
  }
}

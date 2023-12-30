import { Component, Host, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
  @HostListener("window:beforeunload", ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty)
      $event.returnValue = true
  }
  user: User | null = null
  constructor(private accountService: AccountService, private memberService: MembersService
    , private toastr: ToastrService, private spinner: NgxSpinnerService) {
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
    this.memberService.updateMember(this.editForm?.value).subscribe(data => {
      this.toastr.success("Update success full")
      this.editForm?.reset(this.member)
    },
      err => console.error(err)
    )




  }
}

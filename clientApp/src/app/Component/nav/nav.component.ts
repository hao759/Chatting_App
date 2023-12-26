import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  // styleUrls: ['./nav.component.css']
})
export class NavComponent {
  Model: any = {};
  // public LoggedIn = false
  currentUser: Observable<User | null> = of(null)


  constructor(public accountService: AccountService, public route: Router, private toastr: ToastrService) {
    // this.currentUser = this.accountService.currentUser
  }

  onSubmit() {
    this.accountService.login(this.Model).subscribe(data => {
      console.log(this.accountService.currentUser)
      this.toastr.error('Dang nhap thanh cong', 'Error', {
        timeOut: 3000,
      });
      this.route.navigateByUrl('/member')
    });

  }
  logout() {
    this.accountService.logout()
    this.route.navigateByUrl('/')
  }
  // getCurrentUser() {
  //   this.accountService.currentUser.subscribe({
  //     next: User => this.LoggedIn = !!User,
  //     error: error => console.log(error)
  //   })
  // }
}
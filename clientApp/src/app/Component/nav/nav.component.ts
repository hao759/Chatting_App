import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  Model: any = {
    name: "Paula",
    password: "Pa$$w0rd"
  };
  currentUser: Observable<User | null> = of(null)


  constructor(public accountService: AccountService, public route: Router, private toastr: ToastrService) {
    // this.currentUser = this.accountService.currentUser
  }

  onSubmit() {
    this.accountService.login(this.Model).subscribe(data => {
      console.log(this.accountService.currentUser)
      this.toastr.success('Đăng nhập thành công', 'Thông báo', {
        timeOut: 3000,
      });
      this.route.navigateByUrl('/member')
    }, err => {
      this.toastr.error('Mật khẩu sai', 'Thông báo', {
        timeOut: 3000,
      });
    });

  }
  logout() {
    this.accountService.logout()
    this.route.navigateByUrl('/')
  }
}
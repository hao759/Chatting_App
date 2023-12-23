import { Component } from '@angular/core';
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


  constructor(public accountService: AccountService) {
    // this.currentUser = this.accountService.currentUser
  }

  onSubmit() {
    console.log(this.Model)
    this.accountService.login(this.Model).subscribe(data => {
      console.log(data)
    });

  }
  logout() {
    this.accountService.logout()
  }
  // getCurrentUser() {
  //   this.accountService.currentUser.subscribe({
  //     next: User => this.LoggedIn = !!User,
  //     error: error => console.log(error)
  //   })
  // }
}
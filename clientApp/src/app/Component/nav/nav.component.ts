import { Component } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  Model: any = {};
  public LoggedIn = false
  constructor(private accountService: AccountService) {
    this.getCurrentUser()
  }

  onSubmit() {
    console.log(this.Model)
    this.accountService.login(this.Model).subscribe(data => {
      console.log(data)
      this.LoggedIn = true
    });

  }
  logout() {
    this.LoggedIn = false
    this.accountService.logout()
  }
  getCurrentUser() {
    this.accountService.currentUser.subscribe({
      next: User => this.LoggedIn = !!User,
      error: error => console.log(error)
    })
  }
}
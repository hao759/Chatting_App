import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_service/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  public listUser: any[] = [];

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.setCurrentUser()
  }
  ngOnInit(): void {

  }
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!)
    if (user)
      this.accountService.setCurrentUser(user)
  }
}

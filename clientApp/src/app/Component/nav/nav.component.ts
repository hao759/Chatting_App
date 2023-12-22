import { Component } from '@angular/core';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  Model: any = {};
  constructor(private accountService: AccountService) { }

  onSubmit() {
    console.log(this.Model)
    this.accountService.login(this.Model).subscribe(data => {
      console.log(data)
    });


  }
}
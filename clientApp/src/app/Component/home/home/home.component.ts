import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css']
})
export class HomeComponent {

  registerMode = false
  listuser: any = []



  constructor(private http: HttpClient) {
    this.getUser()
  }

  getUser() {
    this.http.get('http://localhost:5225/api/users').subscribe(data => {
      console.log(data)
      this.listuser = data;
    }, error => console.log("123"))
  }

  registerToggle() {
    this.registerMode = !this.registerMode
  }
  cancelRegis($event: boolean) {
    this.registerMode = $event
  }



}

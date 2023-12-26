import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  // styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseurl: string = "http://localhost:5225/api/"
  constructor(private http: HttpClient) { }


  get404Error() {
    this.http.get(this.baseurl + "buggy/not_found").subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log("Error:", error);
      }
    );
  }
}

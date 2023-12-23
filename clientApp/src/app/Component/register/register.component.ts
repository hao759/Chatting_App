import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: any = {};
  @Input() userFromParent: any
  @Output() cancelRegis = new EventEmitter()

  register() {
    console.log(this.model)
  }
  cancel() {
    this.cancelRegis.emit(false)
  }

}

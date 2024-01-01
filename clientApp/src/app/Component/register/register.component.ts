import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup = new FormGroup({})
  @Input() userFromParent: any
  @Output() cancelRegis = new EventEmitter()

  ngOnInit(): void {
    this.inittialForm()

  }

  inittialForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl("hello", Validators.required),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', this.matchValues('password')),
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }
  register() {
    console.log(this.registerForm?.value)
  }
  cancel() {
    this.cancelRegis.emit(false)
  }

}

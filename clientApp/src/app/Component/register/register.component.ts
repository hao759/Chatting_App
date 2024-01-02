import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
  maxDate: Date = new Date();


  ngOnInit(): void {
    this.inittialForm()
  }
  constructor(private fb: FormBuilder) {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  inittialForm() {
    this.registerForm = this.fb.group({
      // gender: ['male'],
      username: ["hello", Validators.required],
      knownAs: ["", Validators.required],
      city: ["", Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required]],
      country: ["", Validators.required],
      confirmPassword: ['', this.matchValues('password')],
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }
  register() {
    console.log(this.registerForm?.value)
  }
  cancel() {
    this.cancelRegis.emit(false)
  }

}

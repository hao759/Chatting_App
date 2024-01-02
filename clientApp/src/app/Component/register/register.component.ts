import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_service/account.service';

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
  validationErrors: string[] | undefined


  ngOnInit(): void {
    this.inittialForm()
  }
  constructor(private accountService: AccountService, private toast: ToastrService,
    private fb: FormBuilder, private route: Router) {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  inittialForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
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
    const dob = this.GetDateOnly(this.registerForm.controls['dateOfBirth'].value)
    const values = { ...this.registerForm.value, dateOfBirth: this.GetDateOnly(dob) }
    console.log(this.registerForm.value)
    this.accountService.register(values).subscribe({
      next: data => {
        this.route.navigateByUrl("member")
      }, error: error => {
        this.validationErrors = error;
        // console.log(this.validationErrors)
      }
    }
    )
  }
  cancel() {
    this.cancelRegis.emit(false)
  }
  private GetDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0, 10);
  }

}

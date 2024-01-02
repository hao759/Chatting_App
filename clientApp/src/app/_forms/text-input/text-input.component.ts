import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = ''
  @Input() type = 'text'

  constructor(@Self() public ngControl: NgControl) {//self tại nó check xem có dùng gần đây ko xài lại
    this.ngControl.valueAccessor = this;
  }


  writeValue(obj: any): void {
    // throw new Error('Method not implemented.'); //control by form controll xoa nay di
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  get control(): FormControl {
    return this.ngControl.control as FormControl
  }

}

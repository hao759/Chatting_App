import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ToastrModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
  ]
})
export class ModuleShareModule { }

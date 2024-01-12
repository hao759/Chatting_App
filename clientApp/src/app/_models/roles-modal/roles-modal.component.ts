import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent {
  title: string = 'Day la modal'
  list: any
  closeBtnname = ''
  constructor(public bsModelRef: BsModalRef) { }
}

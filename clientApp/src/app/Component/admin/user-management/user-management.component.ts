import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/User';
import { RolesModalComponent } from 'src/app/_models/roles-modal/roles-modal.component';
import { AdminService } from 'src/app/_service/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: User[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ]


  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {
        this.users = users
        console.log(users)
      }
    })
  }
  openRolesModal() {
    const initialState: ModalOptions = {
      initialState: {
        list: ["abc", "cdf"],
        title: "Ok"
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, initialState)
    this.bsModalRef.content!.closeBtnname = 'Close';
    // const config = {
    //   class: 'modal-dialog-centered',
    //   initialState: {
    //     username: user.userName,
    //     availableRoles: this.availableRoles,
    //     selectedRoles: [...user.roles ?]
    //   }
    // }
    // this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    // this.bsModalRef.onHide?.subscribe({
    //   next: () => {
    //     const selectedRoles = this.bsModalRef.content?.selectedRoles;
    //     if (!this.arrayEqual(selectedRoles, user.roles)) {
    //       this.adminService.updateUserRoles(user.userName, selectedRoles!).subscribe({
    //         next: roles => user.roles = roles
    //       })
    //     }
    //   }
    // })
  }
}

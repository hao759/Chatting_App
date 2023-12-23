import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_service/account.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService) { }
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser.pipe(
      map(user => {
        if (user)
          return true
        else {
          this.toastr.error('you sai')
          return false
        }
      })
    );
  }
}



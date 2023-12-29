import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../Component/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsaveGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent): boolean | UrlTree {
    if (component.editForm?.dirty)
      return confirm("Are you sure ? do you want");
    return true;
  }


}

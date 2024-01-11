import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home/home.component';
import { MemberListComponent } from './Component/members/member-list/member-list.component';
import { MemberDetailComponent } from './Component/members/member-detail/member-detail.component';
import { MessagesComponent } from './Component/members/messages/messages.component';
import { ListsComponent } from './Component/members/lists/lists.component';
import { GuardGuard } from './_guard/-guard.guard';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { MemberEditComponent } from './Component/members/member-edit/member-edit.component';
import { PreventUnsaveGuard } from './_guard/prevent-unsave.guard';
import { MemberDetailedResolver } from './_resolves/member-detailed.resolver';
import { AdminPannelComponent } from './Component/admin/admin-pannel/admin-pannel.component';
import { AdminGuard } from './_guard/admin.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "member",
    component: MemberListComponent,
    canActivate: [GuardGuard]
  },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [GuardGuard],
    children: [
      {
        path: "member/:username",
        component: MemberDetailComponent,
        canActivate: [GuardGuard],
        resolve: { member: MemberDetailedResolver }
      },
      {
        path: "members/edit",
        component: MemberEditComponent,
        canDeactivate: [PreventUnsaveGuard]
      },
      {
        path: "list",
        component: ListsComponent
      },
      {
        path: "message",
        component: MessagesComponent
      },
      {
        path: "error",
        component: TestErrorComponent
      },
      {
        path: "admin",
        component: AdminPannelComponent,
        canActivate: [AdminGuard],
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
